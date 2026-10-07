const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'menu');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. CAR COVER
const createCarCoverSvg = () => `
<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="carStudio" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="75%" stop-color="#FAFAF9"/>
      <stop offset="100%" stop-color="#F4F4F2"/>
    </radialGradient>
    <linearGradient id="carBodyGrad" x1="10%" y1="10%" x2="90%" y2="90%">
      <stop offset="0%" stop-color="#383C45"/>
      <stop offset="30%" stop-color="#24272E"/>
      <stop offset="65%" stop-color="#16181D"/>
      <stop offset="100%" stop-color="#0A0B0E"/>
    </linearGradient>
    <linearGradient id="carRoofHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#555B66" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#2E323A" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#16181D" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="carGroundShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0B0C0E" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#0B0C0E" stop-opacity="0.14"/>
      <stop offset="85%" stop-color="#0B0C0E" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#0B0C0E" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="carTireShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.6"/>
      <stop offset="65%" stop-color="#000000" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <filter id="carBlurSoft"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="carBlurBroad"><feGaussianBlur stdDeviation="18"/></filter>
  </defs>

  <rect width="1200" height="900" fill="url(#carStudio)"/>

  <!-- Ground Shadows -->
  <g transform="translate(600, 715)">
    <ellipse cx="0" cy="0" rx="510" ry="40" fill="url(#carGroundShadow)" filter="url(#carBlurBroad)"/>
    <ellipse cx="0" cy="-6" rx="440" ry="24" fill="#0A0B0E" opacity="0.25" filter="url(#carBlurSoft)"/>
    <ellipse cx="-330" cy="2" rx="90" ry="14" fill="url(#carTireShadow)"/>
    <ellipse cx="320" cy="2" rx="90" ry="14" fill="url(#carTireShadow)"/>
  </g>

  <!-- Tires peeking under hem -->
  <path d="M 235 665 Q 270 715 315 715 Q 360 715 385 665" fill="none" stroke="#141517" stroke-width="26" stroke-linecap="round"/>
  <path d="M 815 665 Q 860 715 905 715 Q 950 715 975 665" fill="none" stroke="#141517" stroke-width="26" stroke-linecap="round"/>

  <!-- Covered Sedan Car Body -->
  <g id="carBody">
    <path d="
      M 130 660
      C 120 620, 125 560, 160 520
      C 190 485, 260 470, 380 460
      C 440 455, 480 370, 550 310
      C 600 270, 700 265, 800 290
      C 860 305, 910 375, 960 450
      C 1020 465, 1060 490, 1080 535
      C 1095 570, 1090 625, 1075 660
      C 1040 665, 980 655, 910 655
      C 840 655, 740 658, 600 658
      C 460 658, 360 655, 290 655
      C 220 655, 160 665, 130 660
      Z
    " fill="url(#carBodyGrad)"/>

    <!-- Roof and Windshield Highlights -->
    <path d="
      M 530 320
      C 590 275, 690 270, 790 295
      C 770 340, 680 345, 580 340
      Z
    " fill="url(#carRoofHighlight)" opacity="0.75"/>

    <path d="
      M 400 460
      C 460 455, 500 375, 560 320
      C 580 345, 520 435, 440 470
      Z
    " fill="#2E313A" opacity="0.4"/>

    <!-- Side Mirror Pockets Bulges -->
    <path d="M 490 420 C 475 395, 490 380, 520 390 C 535 410, 515 430, 490 420 Z" fill="#3B3F49"/>

    <!-- Contoured Character Lines & Double-stitched Hem -->
    <path d="M 170 525 C 300 480, 600 480, 1050 535" fill="none" stroke="#2B2D35" stroke-width="2.5" opacity="0.6"/>
    <path d="M 130 660 C 290 655, 600 658, 1075 660" fill="none" stroke="#0A0B0E" stroke-width="12" stroke-linecap="round"/>
    <path d="M 130 658 C 290 653, 600 656, 1075 658" fill="none" stroke="#33363F" stroke-width="2.5" stroke-linecap="round"/>
  </g>
</svg>`;

// 2. WASHING MACHINE COVER
const createWashingMachineCoverSvg = () => `
<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="wmStudio" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="75%" stop-color="#FAFAF9"/>
      <stop offset="100%" stop-color="#F4F4F2"/>
    </radialGradient>
    <linearGradient id="wmBodyGrad" x1="20%" y1="10%" x2="80%" y2="90%">
      <stop offset="0%" stop-color="#34373F"/>
      <stop offset="40%" stop-color="#22242B"/>
      <stop offset="100%" stop-color="#0E0F12"/>
    </linearGradient>
    <radialGradient id="wmGround" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0B0C0E" stop-opacity="0.32"/>
      <stop offset="60%" stop-color="#0B0C0E" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#0B0C0E" stop-opacity="0"/>
    </radialGradient>
    <filter id="wmBlur"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>

  <rect width="1200" height="900" fill="url(#wmStudio)"/>

  <!-- Ground Shadow -->
  <ellipse cx="600" cy="740" rx="360" ry="32" fill="url(#wmGround)" filter="url(#wmBlur)"/>

  <!-- Washing Machine 3D Cuboid in Protective Cover -->
  <g transform="translate(600, 460) translate(-260, -280)">
    <!-- Top Flap Panel (Zippered Access Top) -->
    <polygon points="40,100 240,30 480,100 280,170" fill="#3D414A" stroke="#25272E" stroke-width="2"/>
    <!-- Top Zipper Accent Line -->
    <path d="M 60 100 L 240 38 L 460 100" fill="none" stroke="#66743A" stroke-width="3" stroke-dasharray="8 4"/>

    <!-- Left Front Panel -->
    <polygon points="40,100 280,170 280,560 40,490" fill="url(#wmBodyGrad)" stroke="#16171B" stroke-width="2"/>
    <!-- Right Side Panel -->
    <polygon points="280,170 480,100 480,490 280,560" fill="#181A20" stroke="#121316" stroke-width="2"/>

    <!-- Front Circular Window / Porthole Zipper Contour (Front-load silhouette) -->
    <ellipse cx="160" cy="335" rx="85" ry="95" fill="#1C1E24" stroke="#2B2E36" stroke-width="6"/>
    <ellipse cx="160" cy="335" rx="65" ry="75" fill="#141518" stroke="#66743A" stroke-width="2" stroke-dasharray="6 3"/>

    <!-- Reinforced Bottom Edge Hem -->
    <polygon points="36,488 280,560 280,572 36,500" fill="#0C0D0E"/>
    <polygon points="280,560 484,488 484,500 280,572" fill="#090A0B"/>
  </g>
</svg>`;

// 3. SPLIT AC UNIT COVER
const createAcCoverSvg = () => `
<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="acStudio" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="75%" stop-color="#FAFAF9"/>
      <stop offset="100%" stop-color="#F4F4F2"/>
    </radialGradient>
    <linearGradient id="acBodyGrad" x1="10%" y1="10%" x2="90%" y2="90%">
      <stop offset="0%" stop-color="#3A3D46"/>
      <stop offset="40%" stop-color="#24262E"/>
      <stop offset="100%" stop-color="#121317"/>
    </linearGradient>
    <radialGradient id="acGround" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0B0C0E" stop-opacity="0.3"/>
      <stop offset="65%" stop-color="#0B0C0E" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#0B0C0E" stop-opacity="0"/>
    </radialGradient>
    <filter id="acBlur"><feGaussianBlur stdDeviation="15"/></filter>
  </defs>

  <rect width="1200" height="900" fill="url(#acStudio)"/>

  <!-- Soft Ambient Drop Shadow -->
  <ellipse cx="600" cy="650" rx="440" ry="34" fill="url(#acGround)" filter="url(#acBlur)"/>

  <!-- Sleek Split AC Blower in Fitted Waterproof Cover -->
  <g transform="translate(600, 440) translate(-420, -180)">
    <!-- Main AC Curved Body -->
    <rect x="0" y="0" width="840" height="340" rx="36" fill="url(#acBodyGrad)" stroke="#191B20" stroke-width="3"/>
    
    <!-- Top Bevel Curved Specular Highlight -->
    <path d="M 30 20 L 810 20 C 825 20, 830 35, 830 55 L 10 55 C 10 35, 15 20, 30 20 Z" fill="#4B4F5A" opacity="0.4"/>
    
    <!-- Louver Air Vent Contour Stitching along bottom curve -->
    <path d="M 40 280 C 250 310, 590 310, 800 280" fill="none" stroke="#16171B" stroke-width="8" stroke-linecap="round"/>
    <path d="M 40 278 C 250 308, 590 308, 800 278" fill="none" stroke="#66743A" stroke-width="2" stroke-dasharray="8 4"/>

    <!-- Side Piping Seam Cord -->
    <path d="M 36 0 C 0 0, 0 340, 36 340" fill="none" stroke="#262830" stroke-width="4"/>
    <path d="M 804 0 C 840 0, 840 340, 804 340" fill="none" stroke="#262830" stroke-width="4"/>
  </g>
</svg>`;

// 4. RAIN DRESS (2-Piece Suit)
const createRainDressSvg = () => `
<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="rdStudio" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="75%" stop-color="#FAFAF9"/>
      <stop offset="100%" stop-color="#F4F4F2"/>
    </radialGradient>
    <linearGradient id="rdJacketGrad" x1="10%" y1="10%" x2="90%" y2="90%">
      <stop offset="0%" stop-color="#343840"/>
      <stop offset="40%" stop-color="#202227"/>
      <stop offset="100%" stop-color="#0E0F12"/>
    </linearGradient>
    <radialGradient id="rdGround" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0B0C0E" stop-opacity="0.3"/>
      <stop offset="65%" stop-color="#0B0C0E" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#0B0C0E" stop-opacity="0"/>
    </radialGradient>
    <filter id="rdBlur"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>

  <rect width="1200" height="900" fill="url(#rdStudio)"/>
  <ellipse cx="600" cy="770" rx="340" ry="26" fill="url(#rdGround)" filter="url(#rdBlur)"/>

  <!-- 2-Piece Waterproof Suit Silhouette -->
  <g transform="translate(600, 440) scale(0.95) translate(-320, -380)">
    <!-- Hood -->
    <path d="M 240 180 C 230 110, 410 110, 400 180 Z" fill="#2A2D34" stroke="#16171B" stroke-width="2"/>
    <!-- Jacket Body -->
    <path d="
      M 240 180
      L 150 240 L 90 410 L 150 430 L 200 320
      L 200 520 L 440 520 L 440 320
      L 490 430 L 550 410 L 490 240
      L 400 180 Z
    " fill="url(#rdJacketGrad)" stroke="#16171B" stroke-width="2.5"/>

    <!-- High-vis Reflective Chest Strip -->
    <path d="M 200 310 L 440 310" stroke="#66743A" stroke-width="12" stroke-linecap="round"/>
    <path d="M 200 310 L 440 310" stroke="#FFFFFF" stroke-width="3" opacity="0.6"/>

    <!-- Center Storm Flap Zipper -->
    <line x1="320" y1="180" x2="320" y2="520" stroke="#0E0F12" stroke-width="6"/>

    <!-- Trousers beneath jacket -->
    <path d="
      M 220 520 L 420 520
      L 410 750 L 340 750
      L 320 600
      L 300 750 L 230 750 Z
    " fill="#1A1C21" stroke="#121316" stroke-width="2"/>
    
    <!-- Ankle Reflective Bands -->
    <line x1="230" y1="720" x2="300" y2="720" stroke="#66743A" stroke-width="6"/>
    <line x1="340" y1="720" x2="410" y2="720" stroke="#66743A" stroke-width="6"/>
  </g>
</svg>`;

// 5. MATTRESS COVER
const createMattressCoverSvg = () => `
<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="matStudio" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="75%" stop-color="#FAFAF9"/>
      <stop offset="100%" stop-color="#F4F4F2"/>
    </radialGradient>
    <radialGradient id="matGround" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0B0C0E" stop-opacity="0.25"/>
      <stop offset="65%" stop-color="#0B0C0E" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#0B0C0E" stop-opacity="0"/>
    </radialGradient>
    <filter id="matBlur"><feGaussianBlur stdDeviation="16"/></filter>
  </defs>

  <rect width="1200" height="900" fill="url(#matStudio)"/>
  <ellipse cx="600" cy="720" rx="460" ry="34" fill="url(#matGround)" filter="url(#matBlur)"/>

  <!-- 3D Perspective Fitted Mattress in Protective Sheet -->
  <g transform="translate(600, 470) translate(-420, -220)">
    <!-- Top Sleeping Surface -->
    <polygon points="420,40 820,170 420,300 20,170" fill="#F8F8F6" stroke="#DCDCDA" stroke-width="2"/>
    <!-- Quilted Diamond Pattern -->
    <path d="M 120 170 L 420 70 L 720 170 M 220 170 L 420 100 L 620 170 M 320 170 L 420 135 L 520 170" fill="none" stroke="#E6E6E3" stroke-width="2"/>
    <path d="M 120 170 L 420 270 L 720 170 M 220 170 L 420 235 L 620 170 M 320 170 L 420 205 L 520 170" fill="none" stroke="#E6E6E3" stroke-width="2"/>

    <!-- Left Fitted Drop Skirt -->
    <polygon points="20,170 420,300 420,440 20,310" fill="#2E3138" stroke="#1E2025" stroke-width="2"/>
    <!-- Right Fitted Drop Skirt -->
    <polygon points="420,300 820,170 820,310 420,440" fill="#1C1E23" stroke="#141518" stroke-width="2"/>

    <!-- Elasticated Deep Pocket Hem -->
    <path d="M 20 310 L 420 440 L 820 310" fill="none" stroke="#66743A" stroke-width="4"/>
  </g>
</svg>`;

// 6. FAN COVER
const createFanCoverSvg = () => `
<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="fanStudio" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="75%" stop-color="#FAFAF9"/>
      <stop offset="100%" stop-color="#F4F4F2"/>
    </radialGradient>
    <radialGradient id="fanGround" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0B0C0E" stop-opacity="0.28"/>
      <stop offset="65%" stop-color="#0B0C0E" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#0B0C0E" stop-opacity="0"/>
    </radialGradient>
    <filter id="fanBlur"><feGaussianBlur stdDeviation="12"/></filter>
  </defs>

  <rect width="1200" height="900" fill="url(#fanStudio)"/>
  <ellipse cx="600" cy="740" rx="300" ry="24" fill="url(#fanGround)" filter="url(#fanBlur)"/>

  <!-- Pedestal Fan with Round Fitted Zippered Cover -->
  <g transform="translate(600, 430) translate(-220, -320)">
    <!-- Stand Pipe & Base -->
    <line x1="220" y1="400" x2="220" y2="620" stroke="#1B1C20" stroke-width="20"/>
    <ellipse cx="220" cy="620" rx="140" ry="20" fill="#24262C" stroke="#121316" stroke-width="3"/>

    <!-- Large Circular Protective Fan Head Cover -->
    <circle cx="220" cy="220" r="190" fill="#2D3037" stroke="#191B20" stroke-width="4"/>
    <circle cx="220" cy="220" r="160" fill="#23252B" stroke="#3A3D46" stroke-width="2"/>
    <circle cx="220" cy="220" r="45" fill="#18191D"/>

    <!-- Circumference Zipper -->
    <circle cx="220" cy="220" r="185" fill="none" stroke="#66743A" stroke-width="3" stroke-dasharray="8 4"/>
  </g>
</svg>`;

// 7. AIR COOLER COVER
const createAirCoolerCoverSvg = () => `
<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="clStudio" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="75%" stop-color="#FAFAF9"/>
      <stop offset="100%" stop-color="#F4F4F2"/>
    </radialGradient>
    <radialGradient id="clGround" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0B0C0E" stop-opacity="0.32"/>
      <stop offset="65%" stop-color="#0B0C0E" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#0B0C0E" stop-opacity="0"/>
    </radialGradient>
    <filter id="clBlur"><feGaussianBlur stdDeviation="15"/></filter>
  </defs>

  <rect width="1200" height="900" fill="url(#clStudio)"/>
  <ellipse cx="600" cy="735" rx="380" ry="32" fill="url(#clGround)" filter="url(#clBlur)"/>

  <!-- Desert Air Cooler Box Silhouette -->
  <g transform="translate(600, 450) translate(-270, -280)">
    <polygon points="50,110 270,30 490,110 270,190" fill="#3D4049" stroke="#22242A" stroke-width="2"/>
    <polygon points="50,110 270,190 270,550 50,470" fill="#25272F" stroke="#15161A" stroke-width="2"/>
    <polygon points="270,190 490,110 490,470 270,550" fill="#191B21" stroke="#121316" stroke-width="2"/>

    <!-- Front Grill Shading & Vent Outlines -->
    <rect x="90" y="240" width="140" height="180" rx="8" fill="#1B1C22" stroke="#2D3039" stroke-width="2"/>
    <line x1="90" y1="280" x2="230" y2="280" stroke="#121317" stroke-width="4"/>
    <line x1="90" y1="320" x2="230" y2="320" stroke="#121317" stroke-width="4"/>
    <line x1="90" y1="360" x2="230" y2="360" stroke="#121317" stroke-width="4"/>
    <line x1="90" y1="400" x2="230" y2="400" stroke="#121317" stroke-width="4"/>

    <!-- Bottom Hem Casing -->
    <polygon points="46,468 270,550 270,562 46,480" fill="#0C0D0E"/>
    <polygon points="270,550 494,468 494,480 270,562" fill="#090A0B"/>
  </g>
</svg>`;

async function buildAll() {
  const assets = [
    { file: 'car-cover.webp', svg: createCarCoverSvg() },
    { file: 'washing-machine-cover.webp', svg: createWashingMachineCoverSvg() },
    { file: 'ac-cover.webp', svg: createAcCoverSvg() },
    { file: 'rain-dress.webp', svg: createRainDressSvg() },
    { file: 'mattress-cover.webp', svg: createMattressCoverSvg() },
    { file: 'fan-cover.webp', svg: createFanCoverSvg() },
    { file: 'air-cooler-cover.webp', svg: createAirCoolerCoverSvg() },
  ];

  for (const item of assets) {
    const dest = path.join(targetDir, item.file);
    await sharp(Buffer.from(item.svg))
      .webp({ quality: 95 })
      .toFile(dest);
    console.log('Created:', dest);
  }
}

buildAll().catch(err => {
  console.error(err);
  process.exit(1);
});
