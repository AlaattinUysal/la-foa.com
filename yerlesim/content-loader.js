/**
 * Fetches a settlement's text content (title, location, description, sources)
 * from Cloudflare R2 and renders it into the page. Content lives entirely in
 * R2 (metin.txt) so it can be updated without touching this site's code.
 *
 * metin.txt format:
 *   BAŞLIK: <title>
 *   KONUM: <location>
 *
 *   ---METİN---
 *   <paragraph>
 *
 *   <paragraph>
 *
 *   ---KAYNAKLAR---
 *   <source line>
 *   <source line>
 *
 * `*word*` renders as italic (<em>). Blank lines separate paragraphs/sources.
 */
(function () {
    const CDN = 'https://cdn.la-foa.com';

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function renderInline(str) {
        return escapeHtml(str).replace(/\*(.+?)\*/g, '<em>$1</em>');
    }

    function parseContent(text) {
        text = text.replace(/\r\n/g, '\n');
        const baslik = (text.match(/^BAŞLIK:\s*(.+)$/m) || [, ''])[1].trim();
        const konum = (text.match(/^KONUM:\s*(.+)$/m) || [, ''])[1].trim();
        const metinBlock = (text.match(/---METİN---\s*([\s\S]*?)(?=\n---KAYNAKLAR---|$)/) || [, ''])[1];
        const kaynaklarBlock = (text.match(/---KAYNAKLAR---\s*([\s\S]*)$/) || [, ''])[1];
        const paragraphs = metinBlock.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
        const kaynaklar = kaynaklarBlock.split(/\n+/).map(l => l.trim()).filter(Boolean);
        return { baslik, konum, paragraphs, kaynaklar };
    }

    window.loadSettlementContent = async function (slug) {
        const mainText = document.getElementById('mainText');
        try {
            const res = await fetch(`${CDN}/${slug}/metin.txt`, { cache: 'no-cache' });
            if (!res.ok) throw new Error('fetch failed: ' + res.status);
            const text = await res.text();
            const data = parseContent(text);

            if (data.baslik) {
                document.title = data.baslik + ' — La Foa';
                document.querySelectorAll('[data-field="baslik"]').forEach(el => { el.textContent = data.baslik; });
            }
            if (data.konum) {
                document.querySelectorAll('[data-field="konum"]').forEach(el => { el.textContent = data.konum; });
            }
            if (mainText && data.paragraphs.length) {
                mainText.innerHTML = data.paragraphs.map(p => `<p>${renderInline(p)}</p>`).join('');
            }

            const kaynaklarSection = document.getElementById('kaynaklarSection');
            const kaynaklarList = document.getElementById('kaynaklarList');
            if (kaynaklarSection && kaynaklarList) {
                if (data.kaynaklar.length) {
                    kaynaklarList.innerHTML = data.kaynaklar.map(k => `<p>${renderInline(k)}</p>`).join('');
                    kaynaklarSection.style.display = '';
                } else {
                    kaynaklarSection.style.display = 'none';
                }
            }
        } catch (err) {
            console.error('İçerik yüklenemedi:', err);
            if (mainText) {
                mainText.innerHTML = '<p>İçerik şu anda yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>';
            }
        }
    };
})();
