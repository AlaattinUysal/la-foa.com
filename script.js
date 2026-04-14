/**
 * La Foa — Interactive Historical Map
 * Settlement data and map interaction
 * PERFORMANCE-OPTIMIZED VERSION
 */

// ── Map Boundaries (decimal degrees) ──
const MAP_BOUNDS = {
    topLeftLat: 42.178,
    topLeftLng: 38.539,
    bottomRightLat: 36.779,
    bottomRightLng: 46.168
};

// ── Settlement Data (88 settlements) ──
const settlements = [
    { id: 3, name: "Kızkalesi", lat: 38.420099, lng: 43.265522 },
    { id: 4, name: "Zivistan (Aşağı) Kalesi", lat: 38.399357, lng: 43.310757 },
    { id: 5, name: "Zivistan (Yukarı) Kalesi", lat: 38.401339, lng: 43.305029 },
    { id: 6, name: "Ayanis Kalesi", lat: 38.708159, lng: 43.210460 },
    { id: 7, name: "Yukarı Kevenli Kalesi", lat: 38.474386, lng: 43.448061 },
    { id: 8, name: "Aşağı Kevenli Kalesi", lat: 38.483528, lng: 43.444162 },
    { id: 9, name: "Kavuncu (Çoravanis) Kalesi", lat: 38.513316, lng: 43.476367 },
    { id: 10, name: "Yukarı Anzaf Kalesi", lat: 38.559181, lng: 43.470874 },
    { id: 11, name: "Aşağı Anzaf Kalesi", lat: 38.568025, lng: 43.464168 },
    { id: 12, name: "Hoşap Kalesi", lat: 38.317376, lng: 43.801951 },
    { id: 13, name: "Çavuştepe Kalesi", lat: 38.352236, lng: 43.457496 },
    { id: 14, name: "Hışet Kalesi", lat: 38.313391, lng: 43.109951 },
    { id: 15, name: "Hışet Kalesi", lat: 38.270903, lng: 42.647756 },
    { id: 16, name: "Tağ Kalesi", lat: 38.124011, lng: 42.592316 },
    { id: 17, name: "Rabat Kalesi", lat: 38.520022, lng: 41.750413 },
    { id: 18, name: "Bitlis Kalesi", lat: 38.402499, lng: 42.107264 },
    { id: 19, name: "Mongok (Haspet) Kalesi", lat: 38.713169, lng: 41.514589 },
    { id: 20, name: "Şahmiran Kalesi", lat: 39.090158, lng: 41.872351 },
    { id: 21, name: "Sebeterias Kalesi", lat: 38.751757, lng: 40.528094 },
    { id: 22, name: "Kral Kızı Kalesi", lat: 38.752473, lng: 40.583338 },
    { id: 23, name: "Zağ Mağarası", lat: 38.865865, lng: 40.806992 },
    { id: 24, name: "Eski Ahlat Kalesi", lat: 38.749187, lng: 42.455535 },
    { id: 25, name: "Kef Kalesi", lat: 38.833463, lng: 42.719359 },
    { id: 26, name: "Tıkızlı Kalesi", lat: 39.453819, lng: 42.425867 },
    { id: 27, name: "Erciş Kalesi", lat: 38.967686, lng: 43.334984 },
    { id: 28, name: "Erciş Urartu Yazıtları", lat: 39.007812, lng: 43.402321 },
    { id: 29, name: "Dağalan Köyü Kalesi ve Nekropolü", lat: 39.005993, lng: 42.916744 },
    { id: 30, name: "Liç Kalesi ve Nekropolü", lat: 39.179327, lng: 42.847441 },
    { id: 31, name: "Hamur Kalesi", lat: 39.612404, lng: 42.987255 },
    { id: 32, name: "Kocadağ Kalesi", lat: 39.626305, lng: 43.369444 },
    { id: 33, name: "Bagavan Yerleşmesi", lat: 39.611347, lng: 43.517727 },
    { id: 34, name: "Avnik Kalesi", lat: 39.516345, lng: 43.532089 },
    { id: 35, name: "Belle Burç- Eski Doğubayazıt Kalesi", lat: 39.520642, lng: 44.133242 },
    { id: 36, name: "Ahura Manastırı-Harabeleri- Ermeni Mezarlığı", lat: 38.967686, lng: 43.334984 },
    { id: 37, name: "Sosgert Kalesi", lat: 40.863756, lng: 43.596203 },
    { id: 38, name: "Keçivan Kalesi", lat: 40.274368, lng: 42.872258 },
    { id: 39, name: "Kars Kalesi", lat: 40.613492, lng: 43.090342 },
    { id: 40, name: "Zivin Kalesi", lat: 40.214328, lng: 42.246760 },
    { id: 41, name: "Micingert Kalesi", lat: 40.193663, lng: 42.369327 },
    { id: 42, name: "Kemah Kalesi", lat: 39.604204, lng: 39.040195 },
    { id: 43, name: "Endiçi Kalesi", lat: 39.113880, lng: 38.583291 },
    { id: 44, name: "Harput Kalesi", lat: 38.704038, lng: 39.256626 },
    { id: 45, name: "Pertek Kalesi", lat: 38.844629, lng: 39.271372 },
    { id: 46, name: "Palu Kalesi", lat: 38.703153, lng: 39.953569 },
    { id: 47, name: "Bağın Kalesi", lat: 39.003551, lng: 39.898951 },
    { id: 48, name: "Kale Köyü Kalesi", lat: 39.026806, lng: 39.661442 },
    { id: 49, name: "Kitharizon Kalesi", lat: 38.863489, lng: 40.632481 },
    { id: 50, name: "Mercimek Kale", lat: 38.959281, lng: 41.522974 },
    { id: 51, name: "Kazancı (Kurt) Kalesi", lat: 39.462165, lng: 41.617845 },
    { id: 52, name: "Avnik Kalesi", lat: 39.830333, lng: 41.982864 },
    { id: 53, name: "Pasinler (Hasan) Kalesi", lat: 39.980007, lng: 41.680808 },
    { id: 54, name: "Boğakale Kalesi", lat: 40.193634, lng: 41.704552 },
    { id: 55, name: "Oltu Kalesi", lat: 40.543171, lng: 41.993250 },
    { id: 56, name: "Kapıkaya Kalesi", lat: 40.313396, lng: 41.359301 },
    { id: 57, name: "Tortum Kalesi", lat: 40.340877, lng: 41.469541 },
    { id: 58, name: "Pekeriç (Çadırkaya) Kalesi", lat: 39.844142, lng: 40.225286 },
    { id: 59, name: "Kalecik Kalesi", lat: 39.566504, lng: 39.736328 },
    { id: 60, name: "Altıntepe Kalesi ve Höyüğü", lat: 39.696432, lng: 39.646582 },
    { id: 61, name: "Şeytan Kalesi", lat: 41.154193, lng: 43.132596 },
    { id: 62, name: "Kol Kalesi", lat: 41.441655, lng: 42.630616 },
    { id: 63, name: "Altaş (Ur) Kalesi", lat: 41.162678, lng: 42.880750 },
    { id: 64, name: "Ardahan Kalesi", lat: 41.117778, lng: 42.702541 },
    { id: 65, name: "Kvatetrisi Kalesi", lat: 41.204447, lng: 42.329003 },
    { id: 66, name: "Satleli Kalesi", lat: 41.259005, lng: 42.326634 },
    { id: 67, name: "Ardanuç (Gevhernik) Kalesi", lat: 41.127013, lng: 42.054802 },
    { id: 68, name: "Ferhatlı Kalesi", lat: 41.143047, lng: 42.008760 },
    { id: 69, name: "Şatberdi Kalesi", lat: 41.095420, lng: 41.913382 },
    { id: 70, name: "Melo Kalesi", lat: 41.074164, lng: 41.766016 },
    { id: 71, name: "Surp Vardan Kilisesi", lat: 38.501036, lng: 43.344599 },
    { id: 72, name: "Yanal Kilisesi (Soreder Kilisesi)", lat: 38.263030, lng: 44.252248 },
    { id: 73, name: "St. Bartholomeus Kilisesi", lat: 38.145032, lng: 44.210160 },
    { id: 74, name: "Altınsaç Kilisesi", lat: 38.416891, lng: 42.874282 },
    { id: 75, name: "Değirmenaltı Köyiçi Kilisesi", lat: 38.430385, lng: 42.175580 },
    { id: 76, name: "Değirmenaltı Yukarı Kilisesi", lat: 38.431652, lng: 42.188836 },
    { id: 77, name: "Arak Manastırı Kilisesi ve Şapeli", lat: 38.696021, lng: 41.519994 },
    { id: 78, name: "Çanlı Kilise (Surb Garabet Kilisesi)", lat: 38.961300, lng: 41.191378 },
    { id: 79, name: "Surp Stephanos Manastırı", lat: 38.750000, lng: 43.740107 },
    { id: 80, name: "Karagöz Kilisesi", lat: 39.472766, lng: 42.562596 },
    { id: 81, name: "Tzkarostavi Kilisesi", lat: 41.241936, lng: 43.163045 },
    { id: 82, name: "Eruşeti Kilisesi", lat: 41.258069, lng: 42.965020 },
    { id: 83, name: "Tibeti Kilisesi", lat: 41.321179, lng: 42.389144 },
    { id: 84, name: "Opiza Manastırı", lat: 41.223333, lng: 42.036111 },
    { id: 85, name: "Porta Manastırı Kilisesi", lat: 41.236478, lng: 42.075308 },
    { id: 86, name: "Dolishane/Hamamlı Kilisesi", lat: 41.164824, lng: 41.952758 },
    { id: 87, name: "Şatberdi Kalesi", lat: 41.095420, lng: 41.913382 },
    { id: 88, name: "Barhal Kilisesi", lat: 40.970148, lng: 41.383511 },
    { id: 89, name: "Dört Kilise Manastırı", lat: 40.814207, lng: 41.471527 },
    { id: 90, name: "İşhan Manastırı", lat: 40.785669, lng: 41.747307 }
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
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let lastTranslateX = 0;
let lastTranslateY = 0;
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
const cardDescription = document.getElementById('cardDescription');
const cardDetailBtn = document.getElementById('cardDetailBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const totalCount = document.getElementById('totalCount');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const resetViewBtn = document.getElementById('resetView');

// ── Convert lat/lng to pixel position on the map image ──
function latLngToPixel(lat, lng) {
    const latRange = MAP_BOUNDS.topLeftLat - MAP_BOUNDS.bottomRightLat;
    const lngRange = MAP_BOUNDS.bottomRightLng - MAP_BOUNDS.topLeftLng;

    const x = ((lng - MAP_BOUNDS.topLeftLng) / lngRange) * imgWidth;
    const y = ((MAP_BOUNDS.topLeftLat - lat) / latRange) * imgHeight;

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

    const type = getType(settlement.name);
    if (type === 'kale') {
        cardDescription.textContent = `${settlement.name}, tarihî bir kale yapısıdır. Detaylı bilgi yakında eklenecektir.`;
    } else if (type === 'kilise') {
        cardDescription.textContent = `${settlement.name}, tarihî bir dinî yapıdır. Detaylı bilgi yakında eklenecektir.`;
    } else {
        cardDescription.textContent = `${settlement.name} hakkında detaylı bilgiler yakında eklenecektir.`;
    }

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
    scale = Math.max(scaleX, scaleY);

    translateX = (wrapperRect.width - imgWidth * scale) / 2;
    translateY = (wrapperRect.height - imgHeight * scale) / 2;

    applyTransform();
}

// ── Initialize Map ──
function initMap() {
    // Hide loading state if any
    mapWrapper.classList.add('loaded');

    // Use original dimensions, but fallback if SVG gives 0
    imgWidth = mapImage.naturalWidth || 4096;
    imgHeight = mapImage.naturalHeight || 2731;

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

// ── Mouse Drag (Pan) — add/remove 'dragging' class to disable CSS transitions ──
mapWrapper.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    lastTranslateX = translateX;
    lastTranslateY = translateY;
    mapWrapper.classList.add('is-dragging');
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    translateX = lastTranslateX + (e.clientX - dragStartX);
    translateY = lastTranslateY + (e.clientY - dragStartY);
    applyTransform();
});

window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    mapWrapper.classList.remove('is-dragging');
});

// ── Touch Drag (Pan) ──
let touchStartX = 0;
let touchStartY = 0;
let initialPinchDist = 0;
let initialPinchScale = 1;

mapWrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        isDragging = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        lastTranslateX = translateX;
        lastTranslateY = translateY;
        mapWrapper.classList.add('is-dragging');
    } else if (e.touches.length === 2) {
        // Pinch-to-zoom start
        isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDist = Math.sqrt(dx * dx + dy * dy);
        initialPinchScale = scale;
    }
}, { passive: true });

mapWrapper.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && isDragging) {
        translateX = lastTranslateX + (e.touches[0].clientX - touchStartX);
        translateY = lastTranslateY + (e.touches[0].clientY - touchStartY);
        applyTransform();
    } else if (e.touches.length === 2) {
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

mapWrapper.addEventListener('touchend', () => {
    isDragging = false;
    mapWrapper.classList.remove('is-dragging');
});

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
