const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3005';

async function testCropping() {
  console.log('Testing Mobile Hero Slider Cropping & Fit...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  try {
    const page = await browser.newPage();

    // 1. Capture Slide 1 and Slide 2 screenshots at 375px
    await page.setViewport({ width: 375, height: 750, deviceScaleFactor: 2 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // Capture Slide 1
    await page.screenshot({ path: 'scripts/mobile-hero-slide1.png' });
    console.log('Saved scripts/mobile-hero-slide1.png');

    // Click next slide button to capture Slide 2
    const nextBtn = await page.$('button[aria-label="Next slide"]');
    if (nextBtn) {
      await nextBtn.click();
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: 'scripts/mobile-hero-slide2.png' });
      console.log('Saved scripts/mobile-hero-slide2.png');
    }

    // 2. Test breakpoints 320, 360, 375, 390, 414
    for (const width of [320, 360, 375, 390, 414]) {
      await page.setViewport({ width, height: 750 });
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 500));

      const data = await page.evaluate(() => {
        const hero = document.querySelector('section[aria-label="Hero Carousel"]');
        const container = hero.querySelector('div.relative.w-full');
        const rect = container.getBoundingClientRect();
        const activeSlide = container.querySelector('.opacity-100');
        const img = activeSlide ? activeSlide.querySelector('.block.md\\:hidden img') : null;
        const imgRect = img ? img.getBoundingClientRect() : null;
        const computedStyle = img ? window.getComputedStyle(img) : null;
        const overflow = document.documentElement.scrollWidth > window.innerWidth;

        return {
          containerWidth: rect.width,
          containerHeight: rect.height,
          ratio: (rect.width / rect.height).toFixed(2),
          imgWidth: imgRect ? imgRect.width : 0,
          imgHeight: imgRect ? imgRect.height : 0,
          imgTop: imgRect ? imgRect.top - rect.top : null,
          objectFit: computedStyle ? computedStyle.objectFit : null,
          objectPosition: computedStyle ? computedStyle.objectPosition : null,
          overflow
        };
      });

      console.log(`Viewport ${width}px:`, data);

      if (data.containerWidth !== width) {
        throw new Error(`FAIL: Expected container width ${width}px, got ${data.containerWidth}`);
      }
      if (data.ratio !== '0.80') {
        throw new Error(`FAIL: Expected aspect ratio 0.80 (4:5), got ${data.ratio}`);
      }
      if (data.objectFit !== 'contain') {
        throw new Error(`FAIL: Expected object-fit: contain, got ${data.objectFit}`);
      }
      if (data.overflow) {
        throw new Error(`FAIL: Horizontal overflow detected at ${width}px`);
      }
      console.log(`✔ PASS ${width}px: object-fit: contain, top position: ${data.imgTop}px, no overflow!`);
    }

    // 3. Test Desktop
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 500));
    const desktopData = await page.evaluate(() => {
      const hero = document.querySelector('section[aria-label="Hero Carousel"]');
      const container = hero.querySelector('div.relative.w-full');
      const rect = container.getBoundingClientRect();
      const desktopImg = container.querySelector('.hidden.md\\:block img');
      const computedStyle = desktopImg ? window.getComputedStyle(desktopImg) : null;
      return {
        containerWidth: rect.width,
        ratio: (rect.width / rect.height).toFixed(2),
        desktopSrc: desktopImg ? decodeURIComponent(desktopImg.src) : null,
        objectFit: computedStyle ? computedStyle.objectFit : null
      };
    });
    console.log('Desktop 1440px:', desktopData);
    if (!desktopData.desktopSrc.includes('/banners/desktop/image-banner-1.webp')) {
      throw new Error('FAIL: Desktop banner altered!');
    }
    console.log('✔ PASS: Desktop banner unchanged!');

    console.log('\n========================================');
    console.log('ALL HERO CROPPING TESTS PASSED!');
    console.log('========================================');
  } finally {
    await browser.close();
  }
}

testCropping().catch(e => {
  console.error(e);
  process.exit(1);
});
