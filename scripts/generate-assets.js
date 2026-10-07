const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const escapeXml = (unsafe) => {
  return String(unsafe || '').replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
};

const publicDir = path.join(__dirname, '..', 'public');
const bannersDir = path.join(publicDir, 'images', 'banners');
const mobileBannersDir = path.join(publicDir, 'images', 'banners', 'mobile');
const categoriesDir = path.join(publicDir, 'images', 'categories');
const productsDir = path.join(publicDir, 'images', 'products');
const promoDir = path.join(publicDir, 'images', 'promo');

[bannersDir, mobileBannersDir, categoriesDir, productsDir, promoDir].forEach(ensureDir);

// Generate SVG helper
const createBannerDesktopSvg = (title, subtitle, items = []) => {
  return `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDFDFD"/>
      <stop offset="60%" stop-color="#F7F7F5"/>
      <stop offset="100%" stop-color="#ECECE8"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="30" flood-color="#111111" flood-opacity="0.08"/>
    </filter>
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#111111" flood-opacity="0.06"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1920" height="1080" fill="url(#bgGrad)"/>
  
  <!-- Subtle architectural background lines -->
  <line x1="0" y1="820" x2="1920" y2="820" stroke="#E8E8E8" stroke-width="2"/>
  <rect x="0" y="820" width="1920" height="260" fill="#EFEFEA" opacity="0.6"/>

  <!-- Right side: 60% product showcase platform -->
  <g transform="translate(1000, 200)" filter="url(#softShadow)">
    <!-- Showcase Podiums -->
    <ellipse cx="440" cy="620" rx="380" ry="45" fill="#111111" opacity="0.07"/>

    <!-- Product Card / Illustration Box 1 -->
    <rect x="60" y="80" width="460" height="520" rx="16" fill="#FFFFFF" stroke="#E8E8E8" stroke-width="2" filter="url(#cardShadow)"/>
    <rect x="80" y="100" width="420" height="380" rx="12" fill="#F7F7F5"/>
    <text x="290" y="270" font-family="Inter, sans-serif" font-size="28" font-weight="700" fill="#111111" text-anchor="middle">${escapeXml(items[0] || 'Super Safety Cover')}</text>
    <text x="290" y="310" font-family="Inter, sans-serif" font-size="16" font-weight="500" fill="#66743A" text-anchor="middle">Heavy-Duty Protection</text>
    <circle cx="290" cy="200" r="44" fill="#66743A" fill-opacity="0.12"/>
    <path d="M290 180 L308 190 L308 206 C308 217 300 225 290 229 C280 225 272 217 272 206 L272 190 Z" fill="#66743A"/>
    <rect x="180" y="520" width="220" height="40" rx="6" fill="#66743A"/>
    <text x="290" y="546" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF" text-anchor="middle">100% Water Repellent</text>

    <!-- Product Card / Illustration Box 2 (overlapping right) -->
    <g transform="translate(360, 140)">
      <rect x="0" y="0" width="380" height="440" rx="16" fill="#FFFFFF" stroke="#E8E8E8" stroke-width="2" filter="url(#cardShadow)"/>
      <rect x="20" y="20" width="340" height="300" rx="12" fill="#F7F7F5"/>
      <text x="190" y="150" font-family="Inter, sans-serif" font-size="22" font-weight="700" fill="#111111" text-anchor="middle">${escapeXml(items[1] || 'Rain Dress & Covers')}</text>
      <text x="190" y="185" font-family="Inter, sans-serif" font-size="15" font-weight="500" fill="#6B6B6B" text-anchor="middle">Precision Fit</text>
      <circle cx="190" cy="100" r="32" fill="#111111" fill-opacity="0.06"/>
      <rect x="175" y="90" width="30" height="20" rx="4" fill="#66743A"/>
      <rect x="100" y="340" width="180" height="34" rx="6" fill="#111111"/>
      <text x="190" y="362" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#FFFFFF" text-anchor="middle">Cash on Delivery</text>
    </g>

    <!-- Olive Green Accent Badge -->
    <g transform="translate(680, 80)">
      <circle cx="50" cy="50" r="50" fill="#66743A"/>
      <text x="50" y="44" font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">PREMIUM</text>
      <text x="50" y="62" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#FFFFFF" text-anchor="middle">QUALITY</text>
    </g>
  </g>
</svg>`;
};

const createBannerMobileSvg = (title, items = []) => {
  return `
<svg width="800" height="900" viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F7F7F5"/>
      <stop offset="100%" stop-color="#ECECE8"/>
    </linearGradient>
    <filter id="mShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#111111" flood-opacity="0.08"/>
    </filter>
  </defs>
  <rect width="800" height="900" fill="url(#mBgGrad)"/>
  <ellipse cx="400" cy="540" rx="300" ry="35" fill="#111111" opacity="0.06"/>
  <g transform="translate(160, 100)" filter="url(#mShadow)">
    <rect x="0" y="0" width="480" height="480" rx="18" fill="#FFFFFF" stroke="#E8E8E8" stroke-width="2"/>
    <rect x="24" y="24" width="432" height="340" rx="14" fill="#F7F7F5"/>
    <circle cx="240" cy="160" r="50" fill="#66743A" fill-opacity="0.12"/>
    <path d="M240 135 L260 147 L260 166 C260 180 252 190 240 195 C228 190 220 180 220 166 L220 147 Z" fill="#66743A"/>
    <text x="240" y="245" font-family="Inter, sans-serif" font-size="28" font-weight="700" fill="#111111" text-anchor="middle">${escapeXml(items[0] || 'Super Safety Cover')}</text>
    <text x="240" y="280" font-family="Inter, sans-serif" font-size="16" font-weight="500" fill="#66743A" text-anchor="middle">${escapeXml(items[1] || 'Protection Made Simple')}</text>
    <rect x="140" y="390" width="200" height="44" rx="8" fill="#66743A"/>
    <text x="240" y="418" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF" text-anchor="middle">Cash on Delivery</text>
  </g>
</svg>`;
};

const createProductSvg = (title, categoryText, iconType = 'shield', badge = '') => {
  return `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F7F7F5"/>
    </linearGradient>
    <filter id="pSoft" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#111111" flood-opacity="0.05"/>
    </filter>
  </defs>

  <rect width="800" height="800" fill="url(#pGrad)"/>
  
  <!-- Subtle floor shadow ellipse -->
  <ellipse cx="400" cy="620" rx="260" ry="30" fill="#111111" opacity="0.06"/>

  <!-- Product visual box -->
  <g transform="translate(140, 100)" filter="url(#pSoft)">
    <rect x="0" y="0" width="520" height="520" rx="20" fill="#FFFFFF" stroke="#E8E8E8" stroke-width="1.5"/>
    <rect x="20" y="20" width="480" height="480" rx="14" fill="#FAFAF8"/>
    
    <!-- Outer decorative minimalist concentric ring -->
    <circle cx="260" cy="240" r="140" fill="none" stroke="#E8E8E8" stroke-width="1.5" stroke-dasharray="6 6"/>
    <circle cx="260" cy="240" r="90" fill="#66743A" fill-opacity="0.08"/>
    
    <!-- Central Icon/Product Representation -->
    <g transform="translate(260, 240)">
      ${
        iconType === 'bike'
          ? `
          <!-- Minimalist Bike Silhouette Graphic -->
          <circle cx="-60" cy="30" r="34" fill="none" stroke="#111111" stroke-width="6"/>
          <circle cx="60" cy="30" r="34" fill="none" stroke="#111111" stroke-width="6"/>
          <circle cx="-60" cy="30" r="8" fill="#66743A"/>
          <circle cx="60" cy="30" r="8" fill="#66743A"/>
          <path d="M-60 30 L-20 30 L10 -20 L-30 -20 Z" fill="none" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
          <path d="M10 -20 L35 -40 L50 -40" fill="none" stroke="#66743A" stroke-width="6" stroke-linecap="round"/>
          <path d="M-20 30 L10 30 L60 30" fill="none" stroke="#111111" stroke-width="4"/>
          <!-- Protective Cover Contour Overlay -->
          <path d="M-85 30 C-85 -40, -10 -60, 75 -45 C95 -10, 85 45, 80 45 L-80 45 Z" fill="#66743A" fill-opacity="0.25" stroke="#66743A" stroke-width="3" stroke-dasharray="4 3"/>
          `
          : iconType === 'car'
          ? `
          <!-- Minimalist Car Silhouette Graphic -->
          <path d="M-90 20 L-80 -5 L-40 -35 L40 -35 L75 -5 L90 20 Z" fill="none" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
          <circle cx="-55" cy="25" r="22" fill="#111111"/>
          <circle cx="55" cy="25" r="22" fill="#111111"/>
          <!-- Cover Outline Overlay -->
          <path d="M-105 25 C-105 -25, -45 -55, 0 -55 C55 -55, 105 -25, 105 25 Z" fill="#66743A" fill-opacity="0.25" stroke="#66743A" stroke-width="3" stroke-dasharray="4 3"/>
          `
          : iconType === 'raindress'
          ? `
          <!-- Two-Piece Rain Dress Graphic (Upper + Trousers) -->
          <!-- Hooded Upper -->
          <path d="M-40 -40 C-30 -60, 30 -60, 40 -40 L55 -10 L40 0 L30 -10 L30 20 L-30 20 L-30 -10 L-40 0 L-55 -10 Z" fill="#66743A" stroke="#111111" stroke-width="3"/>
          <circle cx="0" cy="-45" r="10" fill="#66743A"/>
          <!-- Trousers -->
          <path d="M-28 25 L28 25 L25 75 L5 75 L0 40 L-5 75 L-25 75 Z" fill="#66743A" stroke="#111111" stroke-width="3"/>
          `
          : iconType === 'machine'
          ? `
          <!-- Washing Machine Graphic -->
          <rect x="-55" y="-65" width="110" height="130" rx="8" fill="none" stroke="#111111" stroke-width="5"/>
          <circle cx="0" cy="10" r="32" fill="none" stroke="#66743A" stroke-width="5"/>
          <circle cx="0" cy="10" r="14" fill="#66743A" fill-opacity="0.3"/>
          <line x1="-35" y1="-45" x2="35" y2="-45" stroke="#111111" stroke-width="3"/>
          <circle cx="30" cy="-45" r="4" fill="#66743A"/>
          `
          : iconType === 'ac'
          ? `
          <!-- AC Unit Graphic -->
          <rect x="-80" y="-40" width="160" height="80" rx="6" fill="none" stroke="#111111" stroke-width="5"/>
          <line x1="-70" y1="20" x2="70" y2="20" stroke="#66743A" stroke-width="4"/>
          <line x1="-70" y1="5" x2="70" y2="5" stroke="#E8E8E8" stroke-width="2"/>
          <circle cx="60" cy="-15" r="5" fill="#66743A"/>
          `
          : iconType === 'mattress'
          ? `
          <!-- Mattress Cover Graphic -->
          <path d="M-70 -20 L0 -55 L70 -20 L0 15 Z" fill="none" stroke="#111111" stroke-width="5" stroke-linejoin="round"/>
          <path d="M-70 -20 L-70 15 L0 50 L70 15 L70 -20" fill="none" stroke="#111111" stroke-width="5" stroke-linejoin="round"/>
          <line x1="0" y1="15" x2="0" y2="50" stroke="#66743A" stroke-width="4"/>
          `
          : iconType === 'fan'
          ? `
          <!-- Fan Cover Graphic -->
          <circle cx="0" cy="0" r="22" fill="#66743A" stroke="#111111" stroke-width="4"/>
          <path d="M0 -22 L0 -75 L20 -70 L15 -22 Z" fill="#66743A" fill-opacity="0.3" stroke="#111111" stroke-width="3"/>
          <path d="M19 11 L65 40 L50 55 L11 19 Z" fill="#66743A" fill-opacity="0.3" stroke="#111111" stroke-width="3"/>
          <path d="M-19 11 L-65 40 L-50 55 L-11 19 Z" fill="#66743A" fill-opacity="0.3" stroke="#111111" stroke-width="3"/>
          `
          : `
          <!-- Cooler Graphic -->
          <rect x="-60" y="-60" width="120" height="120" rx="8" fill="none" stroke="#111111" stroke-width="5"/>
          <circle cx="0" cy="-5" r="35" fill="none" stroke="#66743A" stroke-width="4"/>
          <line x1="-40" y1="42" x2="40" y2="42" stroke="#111111" stroke-width="3"/>
          `
      }
    </g>

    <!-- Product Text in Box -->
    <text x="260" y="420" font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="#111111" text-anchor="middle">${escapeXml(title)}</text>
    <text x="260" y="450" font-family="Inter, sans-serif" font-size="14" font-weight="500" fill="#66743A" text-anchor="middle">${escapeXml(categoryText)}</text>
  </g>

  ${
    badge
      ? `
  <g transform="translate(160, 120)">
    <rect x="0" y="0" width="120" height="30" rx="4" fill="#66743A"/>
    <text x="60" y="20" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF" text-anchor="middle">${escapeXml(badge)}</text>
  </g>
  `
      : ''
  }
</svg>`;
};

async function generateAll() {
  console.log('Generating WebP images...');

  // 1. Desktop Banners
  const desktopBanners = [
    {
      file: 'banner-1.webp',
      items: ['Covered Bike & Car', '2-Piece Rain Dress'],
    },
    {
      file: 'banner-2.webp',
      items: ['Washing Machine Cover', 'AC & Cooler Shields'],
    },
    {
      file: 'banner-3.webp',
      items: ['Mattress Protector', 'Ceiling Fan Covers'],
    },
    {
      file: 'banner-4.webp',
      items: ['Complete Collection', 'All Protection Essentials'],
    },
  ];

  for (const b of desktopBanners) {
    const svg = createBannerDesktopSvg('Super Safety Cover', 'Protection Made Simple', b.items);
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(path.join(bannersDir, b.file));
    console.log(`Created banner ${b.file}`);
  }

  // 2. Mobile Banners
  const mobileBanners = [
    { file: 'banner-1.webp', items: ['Bike, Car & Rain Dress', 'Vehicle Protection'] },
    { file: 'banner-2.webp', items: ['Machine Covers', 'Dust & Rain Proof'] },
    { file: 'banner-3.webp', items: ['Home Protection', 'Mattress & Fan Covers'] },
    { file: 'banner-4.webp', items: ['All Products', 'Protection Made Simple'] },
  ];

  for (const mb of mobileBanners) {
    const svg = createBannerMobileSvg('Super Safety Cover', mb.items);
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(path.join(mobileBannersDir, mb.file));
    console.log(`Created mobile banner ${mb.file}`);
  }

  // 3. Category Cards
  const categories = [
    { file: 'bike-covers.webp', title: 'Bike Covers', cat: 'Motorcycle Protection', icon: 'bike' },
    { file: 'car-covers.webp', title: 'Car Covers', cat: 'Sedan & SUV All-Weather', icon: 'car' },
    { file: 'ac-covers.webp', title: 'AC Covers', cat: 'Indoor & Outdoor Units', icon: 'ac' },
    { file: 'washing-machine-covers.webp', title: 'Washing Machine', cat: 'Top & Front Load', icon: 'machine' },
    { file: 'rain-dress.webp', title: 'Rain Dress', cat: '2-Piece Waterproof Suit', icon: 'raindress' },
    { file: 'mattress-covers.webp', title: 'Mattress Covers', cat: '100% Waterproof Fitted', icon: 'mattress' },
    { file: 'fan-covers.webp', title: 'Fan Covers', cat: 'Ceiling Fan Dust Guards', icon: 'fan' },
    { file: 'air-cooler-covers.webp', title: 'Air Cooler Covers', cat: 'Room & Desert Coolers', icon: 'cooler' },
  ];

  for (const c of categories) {
    const svg = createProductSvg(c.title, c.cat, c.icon);
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(path.join(categoriesDir, c.file));
    console.log(`Created category ${c.file}`);
  }

  // 4. Products & Details
  const products = [
    { file: 'bike-cover-1.webp', title: 'Honda CD 70 Cover', cat: 'Waterproof Parachute', icon: 'bike', badge: 'BEST SELLER' },
    { file: 'bike-cover-2.webp', title: 'Honda CG 125 Cover', cat: 'Custom Tailored Fit', icon: 'bike', badge: 'BEST SELLER' },
    { file: 'bike-cover-3.webp', title: 'Yamaha YBR 125 Cover', cat: 'All-Weather Protection', icon: 'bike', badge: 'POPULAR' },
    { file: 'bike-cover-4.webp', title: 'Suzuki GS 150 Cover', cat: 'Heavy Duty Fit', icon: 'bike', badge: 'DURABLE' },
    { file: 'bike-cover-detail-1.webp', title: 'Double Stitch Detail', cat: 'Heat-Sealed Seams', icon: 'bike' },
    { file: 'bike-cover-detail-2.webp', title: 'Windproof Under-Buckle', cat: 'High Wind Stability', icon: 'bike' },

    { file: 'car-cover-1.webp', title: 'Premium Car Cover', cat: 'Sedan & Hatchback', icon: 'car', badge: 'UV RESISTANT' },
    { file: 'car-cover-detail-1.webp', title: 'Scratch-Proof Cotton Lining', cat: 'Paint Protection', icon: 'car' },
    { file: 'car-cover-detail-2.webp', title: 'Driver Door Zip Access', cat: 'Convenience Access', icon: 'car' },

    { file: 'ac-cover-1.webp', title: 'AC Dual Cover Set', cat: 'Indoor + Outdoor Unit', icon: 'ac', badge: 'RUST DEFENSE' },
    { file: 'ac-cover-detail-1.webp', title: 'Outdoor Compressor Shield', cat: 'Waterproof Parachute', icon: 'ac' },
    { file: 'ac-cover-detail-2.webp', title: 'Indoor Blower Cover', cat: 'Clean Aesthetics', icon: 'ac' },

    { file: 'washing-machine-cover-1.webp', title: 'Washing Machine Cover', cat: 'Zippered Top / Front', icon: 'machine', badge: 'ZIPPER FIT' },
    { file: 'washing-machine-detail-1.webp', title: 'Dual Zipper Opening', cat: 'Operate Without Removing', icon: 'machine' },
    { file: 'washing-machine-detail-2.webp', title: 'Rear Pipe & Cord Port', cat: 'Easy Installation', icon: 'machine' },

    { file: 'rain-dress-1.webp', title: 'Rain Dress (2-Piece)', cat: 'Hooded Upper + Trousers', icon: 'raindress', badge: '100% DRY' },
    { file: 'rain-dress-detail-1.webp', title: 'Seam Taped Waterproofing', cat: 'Zero Leakage', icon: 'raindress' },
    { file: 'rain-dress-detail-2.webp', title: 'Velcro Cuffs & Ankle Seal', cat: 'Splash Proof', icon: 'raindress' },

    { file: 'mattress-cover-1.webp', title: 'Waterproof Mattress Cover', cat: 'Breathable Cotton Terry', icon: 'mattress', badge: 'NOISELESS' },
    { file: 'mattress-cover-detail-1.webp', title: 'TPU Barrier Membrane', cat: 'Liquid Proof', icon: 'mattress' },
    { file: 'mattress-cover-detail-2.webp', title: '360° Elastic Fitted Skirt', cat: 'Deep Pocket Grip', icon: 'mattress' },

    { file: 'fan-cover-1.webp', title: 'Fan Cover (Pack of 4)', cat: 'Ceiling Fan Dust Guard', icon: 'fan', badge: 'SET OF 4' },
    { file: 'fan-cover-detail-1.webp', title: 'Blade Sleeve Slide-On', cat: 'Elastic Hem Grip', icon: 'fan' },
    { file: 'fan-cover-detail-2.webp', title: 'Motor Canopy Cover', cat: 'Full Off-Season Shield', icon: 'fan' },

    { file: 'air-cooler-cover-1.webp', title: 'Air Cooler Cover', cat: 'Desert & Room Cooler', icon: 'cooler', badge: 'WEATHER PROOF' },
    { file: 'air-cooler-detail-1.webp', title: 'Drawstring Bottom Cord', cat: 'Windproof Secure Fit', icon: 'cooler' },
    { file: 'air-cooler-detail-2.webp', title: 'Heavy Duty UV Parachute', cat: 'Anti-Cracking', icon: 'cooler' },
  ];

  for (const p of products) {
    const svg = createProductSvg(p.title, p.cat, p.icon, p.badge);
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(path.join(productsDir, p.file));
    console.log(`Created product image ${p.file}`);
  }

  // 5. Promo images
  const promoSvg1 = createProductSvg('Everyday Driveway Protection', 'Bikes, Cars & Rain Dress', 'bike');
  await sharp(Buffer.from(promoSvg1))
    .webp({ quality: 90 })
    .toFile(path.join(promoDir, 'lifestyle-driveway.webp'));

  const promoSvg2 = createProductSvg('Home & Appliance Care', 'Machines, ACs & Bedding', 'machine');
  await sharp(Buffer.from(promoSvg2))
    .webp({ quality: 90 })
    .toFile(path.join(promoDir, 'lifestyle-home.webp'));

  console.log('All image assets successfully generated!');
}

generateAll().catch(err => {
  console.error(err);
  process.exit(1);
});
