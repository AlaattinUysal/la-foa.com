/**
 * Upload a local file to Cloudflare R2 via the S3-compatible API.
 * Uses multipart upload automatically (no size limit, unlike `wrangler r2 object put`).
 *
 * Usage: node scripts/upload-to-r2.js <local-file-path> <destination-key>
 * Example: node scripts/upload-to-r2.js "./video.mp4" "akhiza/drone.mp4"
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const [, , localPath, destKey] = process.argv;

if (!localPath || !destKey) {
    console.error('Usage: node scripts/upload-to-r2.js <local-file-path> <destination-key>');
    process.exit(1);
}

const CONTENT_TYPES = {
    '.mp4': 'video/mp4',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.txt': 'text/plain; charset=utf-8',
};

async function main() {
    const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT, R2_BUCKET } = process.env;
    if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_ENDPOINT || !R2_BUCKET) {
        console.error('Missing R2 credentials in .env (R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT, R2_BUCKET)');
        process.exit(1);
    }

    const stat = fs.statSync(localPath);
    const sizeMB = (stat.size / 1024 / 1024).toFixed(1);
    const ext = path.extname(localPath).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';

    console.log(`Uploading ${localPath} (${sizeMB} MB) -> r2://${R2_BUCKET}/${destKey}`);

    const client = new S3Client({
        region: 'auto',
        endpoint: R2_ENDPOINT,
        credentials: {
            accessKeyId: R2_ACCESS_KEY_ID,
            secretAccessKey: R2_SECRET_ACCESS_KEY,
        },
        maxAttempts: 8,
    });

    const MAX_RETRIES = 5;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        const upload = new Upload({
            client,
            params: {
                Bucket: R2_BUCKET,
                Key: destKey,
                Body: fs.createReadStream(localPath),
                ContentType: contentType,
            },
            queueSize: 2,
            partSize: 10 * 1024 * 1024, // 10MB parts — smaller chunks retry faster on flaky connections
        });

        upload.on('httpUploadProgress', (p) => {
            if (p.loaded && p.total) {
                const pct = ((p.loaded / p.total) * 100).toFixed(1);
                process.stdout.write(`\r  ${pct}% (${(p.loaded / 1024 / 1024).toFixed(1)} / ${sizeMB} MB)`);
            }
        });

        try {
            await upload.done();
            console.log('\nDone.');
            return;
        } catch (err) {
            console.error(`\nAttempt ${attempt}/${MAX_RETRIES} failed:`, err.message || err);
            if (attempt === MAX_RETRIES) throw err;
            console.log('Retrying...');
            await new Promise(r => setTimeout(r, 3000));
        }
    }
}

main().catch((err) => {
    console.error('\nUpload ultimately failed:', err.message || err);
    process.exit(1);
});
