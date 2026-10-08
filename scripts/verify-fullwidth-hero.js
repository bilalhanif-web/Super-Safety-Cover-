const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3005';

async function verify() {
  console.log('Verifying Full-Width Mobile Hero Slider...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Test across all mobile viewports
    for (const width of [320, 360, 375, 390, 414]) {
      await page.setViewport({ width, height: 700 });
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 800));

      const data = await page.evaluate(() => {
        const hero = document.querySelector('section[aria-label="Hero Carousel"]');
        const container = hero.querySelector('div.relative.w-full');
        const rect = container.getBoundingClientRect();
        const img = container.querySelector('.block.md\\:hidden img');
        const imgRect = img ? img.getBoundingClientRect() : null;
        const overflow = document.documentElement.scrollWidth > window.innerWidth;
        return {
          containerWidth: rect.width,
          containerHeight: rect.height,
          ratio: (rect.width / rect.height).toFixed(2),
          imgWidth: imgRect ? imgRect.width : 0,
          imgHeight: imgRect ? imgRect.height : 0,
          imgClass: img ? img.className : '',
          overflow
        };
      });

      console.log(`Viewport ${width}px:`, data);

      if (data.containerWidth !== width || data.imgWidth !== width) {
        throw new Error(`FAIL: Expected full viewport width (${width}px), got container: ${data.containerWidth}px, img: ${data.imgWidth}px`);
      }
      if (data.ratio !== '0.80') {
        throw new Error(`FAIL: Expected 4:5 ratio (0.80), got ${data.ratio}`);
      }
      if (!data.imgClass.includes('object-cover')) {
        throw new Error(`FAIL: Expected object-cover, got ${data.imgClass}`);
      }
      if (data.overflow) {
        throw new Error(`FAIL: Horizontal overflow detected at ${width}px`);
      }
      console.log(`✔ PASS: ${width}px is 100% full width, aspect 4:5, object-cover, zero side gaps, zero overflow!`);
    }

    // Test Desktop
    console.log('\nTesting Desktop 1440px...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 800));

    const desktopData = await page.evaluate(() => {
      const hero = document.querySelector('section[aria-label="Hero Carousel"]');
      const container = hero.querySelector('div.relative.w-full');
      const rect = container.getBoundingClientRect();
      const desktopImg = container.querySelector('.hidden.md\\:block img');
      return {
        containerWidth: rect.width,
        ratio: (rect.width / rect.height).toFixed(2),
        desktopSrc: desktopImg ? decodeURIComponent(desktopImg.src) : null,
        desktopClass: desktopImg ? desktopImg.className : null
      };
    });
    console.log('Desktop 1440px:', desktopData);
    if (!desktopData.desktopSrc.includes('/banners/desktop/image-banner-1.webp')) {
      throw new Error('FAIL: Desktop banner altered!');
    }
    console.log('✔ PASS: Desktop hero remains unchanged!');

    console.log('\n========================================');
    console.log('ALL FULL-WIDTH HERO CHECKS PASSED!');
    console.log('========================================');
  } finally {
    await browser.close();
  }
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
