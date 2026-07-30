/**
 * La Foa — Interactive Historical Map
 * Settlement data and map interaction
 * PERFORMANCE-OPTIMIZED VERSION
 */

// ── Map Boundaries (decimal degrees) ──
// QGIS "Harita 1" öğe özellikleri > Dış sınırlar (KRS: EPSG:4326 - WGS 84) değerleriyle eşleşmeli.
// En küçük X/Y = sol-alt köşe, En büyük X/Y = sağ-üst köşe.
const MAP_BOUNDS = {
    topLeftLat: 43.002,
    topLeftLng: 36.487,
    bottomRightLat: 35.998,
    bottomRightLng: 46.387
};

// ── Settlement Data (88 settlements) ──
const settlements = [
    { id: 3, name: "Kızkalesi", lat: 38.0266, lng: 43.8366 },
    { id: 4, name: "Zivistan (Aşağı) Kalesi", lat: 38.0091, lng: 43.9523 },
    { id: 5, name: "Zivistan (Yukarı) Kalesi", lat: 37.9974, lng: 43.9465 },
    { id: 6, name: "Ayanis Kalesi", lat: 38.428, lng: 43.7903 },
    { id: 7, name: "Yukarı Kevenli Kalesi", lat: 38.0851, lng: 44.1201 },
    { id: 8, name: "Aşağı Kevenli Kalesi", lat: 38.1143, lng: 44.0911 },
    { id: 9, name: "Kavuncu (Çoravanis) Kalesi", lat: 38.1494, lng: 44.1721 },
    { id: 10, name: "Yukarı Anzaf Kalesi", lat: 38.1787, lng: 44.1663 },
    { id: 11, name: "Aşağı Anzaf Kalesi", lat: 38.2313, lng: 44.1316 },
    { id: 12, name: "Hoşap Kalesi", lat: 37.9155, lng: 44.5828 },
    { id: 13, name: "Çavuştepe Kalesi", lat: 37.9506, lng: 44.1258 },
    { id: 14, name: "Hışet Kalesi", lat: 37.8746, lng: 43.6631 },
    { id: 15, name: "Hışet Kalesi", lat: 37.8395, lng: 43.0383 },
    { id: 16, name: "Tağ Kalesi", lat: 37.6406, lng: 42.9631 },
    { id: 17, name: "Rabat Kalesi", lat: 38.1736, lng: 41.8524 },
    { id: 18, name: "Bitlis Kalesi", lat: 38.0054, lng: 42.3159 },
    { id: 19, name: "Mongok (Haspet) Kalesi", lat: 38.4513, lng: 41.5089 },
    { id: 20, name: "Şahmiran Kalesi", lat: 38.9426, lng: 42.0202 },
    { id: 21, name: "Sebeterias Kalesi", lat: 38.4894, lng: 40.2189 },
    { id: 22, name: "Kral Kızı Kalesi", lat: 38.4908, lng: 40.3115 },
    { id: 23, name: "Zağ Mağarası", lat: 38.6239, lng: 40.5834 },
    { id: 24, name: "Eski Ahlat Kalesi", lat: 38.474, lng: 42.7838 },
    { id: 25, name: "Kef Kalesi", lat: 38.591, lng: 43.154 },
    { id: 26, name: "Tıkızlı Kalesi", lat: 39.4163, lng: 42.7433 },
    { id: 27, name: "Erciş Kalesi", lat: 38.967686, lng: 43.334984 },
    { id: 28, name: "Erciş Urartu Yazıtları", lat: 38.9017, lng: 44.0622 },
    { id: 29, name: "Dağalan Köyü Kalesi ve Nekropolü", lat: 38.8307, lng: 43.4085 },
    { id: 30, name: "Liç Kalesi ve Nekropolü", lat: 39.0713, lng: 43.316 },
    { id: 31, name: "Hamur Kalesi", lat: 39.6502, lng: 43.4953 },
    { id: 32, name: "Kocadağ Kalesi", lat: 39.6619, lng: 43.9928 },
    { id: 33, name: "Bagavan Yerleşmesi", lat: 39.6327, lng: 44.1895 },
    { id: 34, name: "Avnik Kalesi", lat: 39.5157, lng: 44.2358 },
    { id: 35, name: "Belle Burç- Eski Doğubayazıt Kalesi", lat: 39.5157, lng: 45.0167 },
    { id: 36, name: "Ahura Manastırı-Harabeleri- Ermeni Mezarlığı", lat: 38.967686, lng: 43.334984 },
    { id: 37, name: "Sosgert Kalesi", lat: 41.3038, lng: 44.2994 },
    { id: 38, name: "Keçivan Kalesi", lat: 40.5333, lng: 43.3507 },
    { id: 39, name: "Kars Kalesi", lat: 40.988, lng: 43.6341 },
    { id: 40, name: "Zivin Kalesi", lat: 40.4573, lng: 42.5119 },
    { id: 41, name: "Micingert Kalesi", lat: 40.4105, lng: 42.6854 },
    { id: 42, name: "Kemah Kalesi", lat: 39.6086, lng: 38.2384 },
    { id: 43, name: "Endiçi Kalesi", lat: 38.9565, lng: 37.6469 },
    { id: 44, name: "Harput Kalesi", lat: 38.4192, lng: 38.5471 },
    { id: 45, name: "Pertek Kalesi", lat: 38.6063, lng: 38.5529 },
    { id: 46, name: "Palu Kalesi", lat: 38.4192, lng: 39.4727 },
    { id: 47, name: "Bağın Kalesi", lat: 38.8169, lng: 39.3801 },
    { id: 48, name: "Kale Köyü Kalesi", lat: 38.8695, lng: 39.0851 },
    { id: 49, name: "Kitharizon Kalesi", lat: 38.6297, lng: 40.3636 },
    { id: 50, name: "Mercimek Kale", lat: 38.7701, lng: 41.5487 },
    { id: 51, name: "Kazancı (Kurt) Kalesi", lat: 39.4448, lng: 41.6709 },
    { id: 52, name: "Avnik Kalesi", lat: 39.9309, lng: 42.159 },
    { id: 53, name: "Pasinler (Hasan) Kalesi", lat: 40.1239, lng: 41.7656 },
    { id: 54, name: "Boğakale Kalesi", lat: 40.4229, lng: 41.8004 },
    { id: 55, name: "Oltu Kalesi", lat: 40.8959, lng: 42.1764 },
    { id: 56, name: "Kapıkaya Kalesi", lat: 40.5918, lng: 41.326 },
    { id: 57, name: "Tortum Kalesi", lat: 40.621, lng: 41.4764 },
    { id: 58, name: "Pekeriç (Çadırkaya) Kalesi", lat: 39.8863, lng: 39.8126 },
    { id: 59, name: "Kalecik Kalesi", lat: 39.583, lng: 39.1661 },
    { id: 60, name: "Altıntepe Kalesi ve Höyüğü", lat: 39.7204, lng: 39.054 },
    { id: 61, name: "Şeytan Kalesi", lat: 41.7073, lng: 43.6862 },
    { id: 62, name: "Kol Kalesi", lat: 42.0933, lng: 43.0152 },
    { id: 63, name: "Altaş (Ur) Kalesi", lat: 41.719, lng: 43.3449 },
    { id: 64, name: "Ardahan Kalesi", lat: 41.6547, lng: 43.1135 },
    { id: 65, name: "Kvatetrisi Kalesi", lat: 41.7556, lng: 42.6218 },
    { id: 66, name: "Satleli Kalesi", lat: 41.8652, lng: 42.6044 },
    { id: 67, name: "Ardanuç (Gevhernik) Kalesi", lat: 41.6532, lng: 42.266 },
    { id: 68, name: "Ferhatlı Kalesi", lat: 41.6737, lng: 42.1995 },
    { id: 69, name: "Şatberdi Kalesi", lat: 41.5977, lng: 42.0665 },
    { id: 70, name: "Melo Kalesi", lat: 41.6123, lng: 41.8727 },
    { id: 71, name: "Surp Vardan Kilisesi", lat: 38.1319, lng: 43.9697 },
    { id: 72, name: "Yanal Kilisesi (Soreder Kilisesi)", lat: 37.8395, lng: 45.1845 },
    { id: 73, name: "St. Bartholomeus Kilisesi", lat: 37.664, lng: 45.1382 },
    { id: 74, name: "Altınsaç Kilisesi", lat: 38.0383, lng: 43.3622 },
    { id: 75, name: "Değirmenaltı Köyiçi Kilisesi", lat: 38.0668, lng: 42.4699 },
    { id: 76, name: "Değirmenaltı Yukarı Kilisesi", lat: 38.08, lng: 42.4237 },
    { id: 77, name: "Arak Manastırı Kilisesi ve Şapeli", lat: 38.3834, lng: 41.5581 },
    { id: 78, name: "Çanlı Kilise (Surb Garabet Kilisesi)", lat: 38.7525, lng: 41.1098 },
    { id: 79, name: "Surp Stephanos Manastırı", lat: 38.750000, lng: 43.740107 },
    { id: 80, name: "Karagöz Kilisesi", lat: 39.4514, lng: 42.9457 },
    { id: 81, name: "Tzkarostavi Kilisesi", lat: 41.8243, lng: 43.7383 },
    { id: 82, name: "Eruşeti Kilisesi", lat: 41.855, lng: 43.4664 },
    { id: 83, name: "Tibeti Kilisesi", lat: 41.9354, lng: 42.7144 },
    { id: 84, name: "Opiza Manastırı", lat: 41.8024, lng: 42.2198 },
    { id: 85, name: "Porta Manastırı Kilisesi", lat: 41.8345, lng: 42.3123 },
    { id: 86, name: "Dolishane/Hamamlı Kilisesi", lat: 41.7263, lng: 42.1214 },
    { id: 87, name: "Şatberdi Kalesi", lat: 41.5977, lng: 42.0665 },
    // NOT: 88-90 gerçek GPS değil — bu bölgede haritanın çizimi gerçek koordinattan saptığı için
    // ikonların tam üstüne denk gelecek şekilde piksel bazlı geri hesaplanmış (kalibre edilmiş) değerler.
    { id: 88, name: "Barhal Kilisesi", lat: 41.4851, lng: 41.3723 },
    { id: 89, name: "Dört Kilise Manastırı", lat: 41.2629, lng: 41.488 },
    { id: 90, name: "İşhan Manastırı", lat: 41.2044, lng: 41.864 }
];

// ── Categorize settlement type ──
function getType(name) {
    const n = name.toLowerCase();
    if (n.includes('kilise') || n.includes('manastır') || n.includes('şapel')) return 'kilise';
    if (n.includes('kalesi') || n.includes('kale') || n.includes('burç')) return 'kale';
    return 'diger';
}

// ── Map State ──
let scale = 1;
let translateX = 0;
let translateY = 0;
let activeMarker = null;
let imgWidth = 0;
let imgHeight = 0;
let rafPending = false;

// ── Multi-Resolution Image System ──
const MAP_LEVELS = [
    { src: 'assets/map-low.webp', maxScale: 1.5 },
    { src: 'assets/map-mid.webp', maxScale: 3.5 },
    { src: 'assets/map-high.webp', maxScale: Infinity }
];
let currentLevelIndex = 0;
let levelChangeTimeout = null;
const preloadedImages = {};

// ── DOM Elements (cached once) ──
const mapWrapper = document.getElementById('mapWrapper');
const mapContainer = document.getElementById('mapContainer');
const mapImage = document.getElementById('mapImage');
const markersLayer = document.getElementById('markersLayer');
const infoCard = document.getElementById('infoCard');
const cardClose = document.getElementById('cardClose');
const cardId = document.getElementById('cardId');
const cardTitle = document.getElementById('cardTitle');
const cardCoords = document.getElementById('cardCoords');
const cardQrCode = document.getElementById('cardQrCode');
const cardDetailBtn = document.getElementById('cardDetailBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const totalCount = document.getElementById('totalCount');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const resetViewBtn = document.getElementById('resetView');

// ── Map Calibration Offsets ──
// Yeni haritanın (Yeni-Harita/harita.webp) dört kenarında da eşit kalınlıkta (orijinal
// 14043px genişlikte ~176px, yani genişliğin ~%1.25'i) turuncu bir cetvel/çerçeve şeridi var.
// Bu şerit sabit piksel kalınlığında olduğu ve map-low/mid/high aynı oranda ölçeklendiği için
// burada oran (fraction of imgWidth) olarak tutuluyor — hangi çözünürlük yüklenirse yüklensin
// doğru ölçekleniyor. Piksel örneklemesiyle ölçüldü (harita.webp kenarlarından tarama).
const MAP_PADDING_FRACTION = 0.01253; // dört kenar için de aynı (kare piksel varsayımıyla)



// Projeksiyonu değiştirmek isterseniz bunu true yapın
const USE_MERCATOR = false;

function latToMercatorY(lat) {
    const latRad = lat * Math.PI / 180;
    return Math.log(Math.tan(Math.PI / 4 + latRad / 2));
}

// ── Convert lat/lng to pixel position on the map image ──
function latLngToPixel(lat, lng) {
    // Çerçeve şeridi sabit piksel kalınlığında olduğundan (bkz. MAP_PADDING_FRACTION),
    // dört kenar için de o anki görüntü genişliğine (imgWidth) göre ölçekleniyor.
    const pad = imgWidth * MAP_PADDING_FRACTION;
    const paddingLeft = pad;
    const paddingRight = pad;
    const paddingTop = pad;
    const paddingBottom = pad;

    const usableWidth = imgWidth - paddingLeft - paddingRight;
    const usableHeight = imgHeight - paddingTop - paddingBottom;

    const lngRange = MAP_BOUNDS.bottomRightLng - MAP_BOUNDS.topLeftLng;
    const x = paddingLeft + ((lng - MAP_BOUNDS.topLeftLng) / lngRange) * usableWidth;

    let y;
    if (USE_MERCATOR) {
        const topY = latToMercatorY(MAP_BOUNDS.topLeftLat);
        const bottomY = latToMercatorY(MAP_BOUNDS.bottomRightLat);
        const rangeY = topY - bottomY;
        const currentY = latToMercatorY(lat);
        y = paddingTop + ((topY - currentY) / rangeY) * usableHeight;
    } else {
        const latRange = MAP_BOUNDS.topLeftLat - MAP_BOUNDS.bottomRightLat;
        y = paddingTop + ((MAP_BOUNDS.topLeftLat - lat) / latRange) * usableHeight;
    }

    return { x, y };
}

// ── Create marker elements ──
// Uses DocumentFragment for a single DOM insertion (no reflows per marker)
function createMarkers() {
    markersLayer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    settlements.forEach(s => {
        const pos = latLngToPixel(s.lat, s.lng);
        const type = getType(s.name);

        const marker = document.createElement('div');
        marker.className = `marker type-${type}`;
        marker.style.cssText = `left:${pos.x}px;top:${pos.y}px;`;
        marker.dataset.id = s.id;

        // Simplified inner HTML — single dot div, label created on hover via CSS
        marker.innerHTML = `<div class="marker-dot"></div><div class="marker-label">${s.name}</div>`;

        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            openInfoCard(s, marker);
        });

        fragment.appendChild(marker);
    });

    markersLayer.appendChild(fragment);
}

// ── Open Info Card ──
function openInfoCard(settlement, markerEl) {
    if (activeMarker) {
        activeMarker.classList.remove('active');
    }

    markerEl.classList.add('active');
    activeMarker = markerEl;

    cardId.textContent = `#${settlement.id}`;
    cardTitle.textContent = settlement.name;
    cardCoords.textContent = `${settlement.lat.toFixed(4)}°N, ${settlement.lng.toFixed(4)}°E`;

    const safeName = settlement.name.replace(/[^a-z0-9]/gi, '_').replace(/_+/g, '_').toLowerCase();
    cardQrCode.src = `qrcodes/id-${settlement.id}-${safeName}.png`;

    cardDetailBtn.href = `yerlesim/${settlement.id}.html`;
    infoCard.classList.add('active');
}

// ── Close Info Card ──
function closeInfoCard() {
    infoCard.classList.remove('active');
    if (activeMarker) {
        activeMarker.classList.remove('active');
        activeMarker = null;
    }
}

cardClose.addEventListener('click', closeInfoCard);

// ── Apply Transform — GPU-accelerated via translate3d ──
// Uses a single rAF guard to batch all transform updates
function applyTransform() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
        mapContainer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
        rafPending = false;
    });
    scheduleResolutionCheck();
}

// ── Resolution Swap Logic ──
function getTargetLevel(currentScale) {
    for (let i = 0; i < MAP_LEVELS.length; i++) {
        if (currentScale <= MAP_LEVELS[i].maxScale) return i;
    }
    return MAP_LEVELS.length - 1;
}

function scheduleResolutionCheck() {
    clearTimeout(levelChangeTimeout);
    levelChangeTimeout = setTimeout(() => {
        const targetLevel = getTargetLevel(scale);
        if (targetLevel !== currentLevelIndex) {
            swapMapImage(targetLevel);
        }
    }, 200); // Wait 200ms after zoom stops to avoid swaps during rapid scrolling
}

function swapMapImage(targetLevel) {
    const targetSrc = MAP_LEVELS[targetLevel].src;

    // If already preloaded, swap immediately
    if (preloadedImages[targetSrc]) {
        doSwap(targetSrc, targetLevel);
        return;
    }

    // Load in background, then swap
    const img = new Image();
    img.onload = () => {
        preloadedImages[targetSrc] = true;
        // Only swap if still needed (user might have zoomed again)
        if (getTargetLevel(scale) === targetLevel) {
            doSwap(targetSrc, targetLevel);
        }
    };
    img.src = targetSrc;
}

function doSwap(src, levelIndex) {
    mapImage.src = src;
    currentLevelIndex = levelIndex;

    // Preload the next level up if it exists
    if (levelIndex + 1 < MAP_LEVELS.length) {
        const nextSrc = MAP_LEVELS[levelIndex + 1].src;
        if (!preloadedImages[nextSrc]) {
            const preImg = new Image();
            preImg.onload = () => { preloadedImages[nextSrc] = true; };
            preImg.src = nextSrc;
        }
    }
}

// ── Fit the map to the viewport ──
function fitMapToView() {
    const wrapperRect = mapWrapper.getBoundingClientRect();
    const scaleX = wrapperRect.width / imgWidth;
    const scaleY = wrapperRect.height / imgHeight;
    scale = Math.min(scaleX, scaleY);

    translateX = (wrapperRect.width - imgWidth * scale) / 2;
    translateY = (wrapperRect.height - imgHeight * scale) / 2;

    applyTransform();
}

// ── Initialize Map ──
function initMap() {
    // Hide loading state if any
    mapWrapper.classList.add('loaded');

    // Use original dimensions, but fallback if SVG gives 0
    imgWidth = mapImage.naturalWidth || 10000;
    imgHeight = mapImage.naturalHeight || 7073;

    // Apply explicit dimensions to container
    mapContainer.style.width = imgWidth + 'px';
    mapContainer.style.height = imgHeight + 'px';

    createMarkers();
    fitMapToView();

    totalCount.textContent = settlements.length;
}

// Wait for image to load
if (mapImage.complete && mapImage.naturalWidth > 0) {
    initMap();
} else {
    mapImage.addEventListener('load', initMap);
}

// ── Pinch-to-Zoom (touch) — panning is disabled, only zoom gestures are handled ──
let initialPinchDist = 0;
let initialPinchScale = 1;

mapWrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDist = Math.sqrt(dx * dx + dy * dy);
        initialPinchScale = scale;
    }
}, { passive: true });

mapWrapper.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        // Pinch-to-zoom move
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const newScale = Math.min(Math.max(initialPinchScale * (dist / initialPinchDist), 0.3), 8);

        // Zoom towards pinch center
        const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const rect = mapWrapper.getBoundingClientRect();
        const mx = centerX - rect.left;
        const my = centerY - rect.top;

        const scaleChange = newScale / scale;
        translateX = mx - (mx - translateX) * scaleChange;
        translateY = my - (my - translateY) * scaleChange;
        scale = newScale;
        applyTransform();
    }
}, { passive: true });

// ── Zoom (Scroll) ──
mapWrapper.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = mapWrapper.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
    const newScale = Math.min(Math.max(scale * zoomFactor, 0.3), 8);

    const scaleChange = newScale / scale;
    translateX = mouseX - (mouseX - translateX) * scaleChange;
    translateY = mouseY - (mouseY - translateY) * scaleChange;
    scale = newScale;

    applyTransform();
}, { passive: false });

// ── Zoom Buttons ──
zoomInBtn.addEventListener('click', () => {
    const rect = mapWrapper.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const newScale = Math.min(scale * 1.3, 8);
    const scaleChange = newScale / scale;
    translateX = cx - (cx - translateX) * scaleChange;
    translateY = cy - (cy - translateY) * scaleChange;
    scale = newScale;
    applyTransform();
});

zoomOutBtn.addEventListener('click', () => {
    const rect = mapWrapper.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const newScale = Math.max(scale * 0.77, 0.3);
    const scaleChange = newScale / scale;
    translateX = cx - (cx - translateX) * scaleChange;
    translateY = cy - (cy - translateY) * scaleChange;
    scale = newScale;
    applyTransform();
});

resetViewBtn.addEventListener('click', () => {
    fitMapToView();
    closeInfoCard();
});

// ── Search (debounced) ──
let searchDebounce = null;

searchInput.addEventListener('input', () => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length < 2) {
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
            return;
        }

        const results = settlements.filter(s =>
            s.name.toLowerCase().includes(query) || s.id.toString() === query
        );

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item"><span class="result-name" style="color:var(--color-text-muted)">Sonuç bulunamadı</span></div>';
            searchResults.classList.add('active');
            return;
        }

        searchResults.innerHTML = results.slice(0, 15).map(s => `
            <div class="search-result-item" data-id="${s.id}">
                <span class="result-id">${s.id}</span>
                <span class="result-name">${s.name}</span>
            </div>
        `).join('');

        searchResults.querySelectorAll('.search-result-item[data-id]').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                const settlement = settlements.find(s => s.id === id);
                if (!settlement) return;

                const markerEl = markersLayer.querySelector(`[data-id="${id}"]`);
                if (!markerEl) return;

                panToSettlement(settlement);
                openInfoCard(settlement, markerEl);

                searchResults.classList.remove('active');
                searchInput.value = '';
            });
        });

        searchResults.classList.add('active');
    }, 120); // 120ms debounce
});

// ── Pan to Settlement ──
function panToSettlement(settlement) {
    const wrapperRect = mapWrapper.getBoundingClientRect();
    const pos = latLngToPixel(settlement.lat, settlement.lng);

    const targetScale = Math.max(scale, 2);
    translateX = wrapperRect.width / 2 - pos.x * targetScale;
    translateY = wrapperRect.height / 2 - pos.y * targetScale;
    scale = targetScale;

    // Smooth transition
    mapContainer.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    applyTransform();

    setTimeout(() => {
        mapContainer.style.transition = 'none';
    }, 650);
}

// Close search on click outside
document.addEventListener('click', (e) => {
    if (!searchResults.contains(e.target) && e.target !== searchInput) {
        searchResults.classList.remove('active');
    }
});

// Close info card on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeInfoCard();
        searchResults.classList.remove('active');
    }
});

// ── Handle window resize (debounced) ──
let resizeDebounce = null;
window.addEventListener('resize', () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(() => {
        if (imgWidth && imgHeight) {
            fitMapToView();
        }
    }, 150);
});
