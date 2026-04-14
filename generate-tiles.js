/**
 * Generate multi-resolution WebP images from source
 * Run: node generate-tiles.js
 */
const sharp = require('sharp');
const path = require('path');

const SOURCE = path.join(__dirname, 'assets', 'etkileşimli.webp');
const OUT_DIR = path.join(__dirname, 'assets');

const levels = [
    { name: 'map-low.webp',  width: 2000,  quality: 75 },
    { name: 'map-mid.webp',  width: 5000,  quality: 80 },
    { name: 'map-high.webp', width: 10000, quality: 82 },
];

(async () => {
    const meta = await sharp(SOURCE).metadata();
    console.log(`Source: ${meta.width}x${meta.height} (${meta.format})`);

    for (const lvl of levels) {
        const outPath = path.join(OUT_DIR, lvl.name);
        const height = Math.round((lvl.width / meta.width) * meta.height);

        console.log(`Generating ${lvl.name} (${lvl.width}x${height})...`);

        await sharp(SOURCE)
            .resize(lvl.width, height, { fit: 'fill' })
            .webp({ quality: lvl.quality, effort: 4 })
            .toFile(outPath);

        const info = await sharp(outPath).metadata();
        const fs = require('fs');
        const size = fs.statSync(outPath).size;
        console.log(`  → ${lvl.name}: ${info.width}x${info.height}, ${(size / 1024).toFixed(0)} KB`);
    }

    console.log('\nDone! All levels generated.');
})();
