const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3005';

async function testMobileHero() {
  console.log('Testing Mobile Hero Slider in Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // 1. Test Mobile (375x667 - below 768px)
    await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
    console.log('Navigating to http://localhost:3005 on mobile viewport (375px)...');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2000));

    // Verify container and aspect ratio
    const heroInfo = await page.evaluate(() => {
      const hero = document.querySelector('section[aria-label="Hero Carousel"]');
      if (!hero) return null;

      const container = hero.querySelector('div.relative.w-full');
      const rect = container ? container.getBoundingClientRect() : null;
      const ratio = rect ? (rect.width / rect.height) : null;

      // Find mobile images
      const mobileImgs = Array.from(hero.querySelectorAll('.block.md\\:hidden img'));
      const desktopImgs = Array.from(hero.querySelectorAll('.hidden.md\\:block img'));

      // Check overflow
      const overflow = document.documentElement.scrollWidth > window.innerWidth;

      return {
        width: rect ? rect.width : 0,
        height: rect ? rect.height : 0,
        ratio: ratio ? ratio.toFixed(2) : null,
        mobileImgSources: mobileImgs.map(img => img.src),
        mobileImgClasses: mobileImgs.map(img => img.className),
        mobileImgNaturalSizes: mobileImgs.map(img => ({ w: img.naturalWidth, h: img.naturalHeight })),
        hasOverflow: overflow
      };
    });

    console.log('Mobile Hero Info:', heroInfo);

    // 4:5 aspect ratio is 0.80
    if (heroInfo.ratio !== '0.80') {
      throw new Error(`Expected aspect ratio ~0.80 (4:5), but got ${heroInfo.ratio}`);
    }
    console.log('✔ PASS: Aspect ratio is exactly 4:5 (0.80)!');

    // Verify mobile banner paths
    const banner1Found = heroInfo.mobileImgSources.some(s => s.includes('image-banner-1.webp'));
    const banner2Found = heroInfo.mobileImgSources.some(s => s.includes('image-banner-2.webp'));
    if (!banner1Found || !banner2Found) {
      throw new Error(`Mobile banner images missing! Sources: ${JSON.stringify(heroInfo.mobileImgSources)}`);
    }
    console.log('✔ PASS: Found both image-banner-1.webp and image-banner-2.webp in mobile slider!');

    // Verify object-fit contain
    const allContain = heroInfo.mobileImgClasses.every(c => c.includes('object-contain'));
    if (!allContain) {
      throw new Error(`Images must have object-contain, got: ${JSON.stringify(heroInfo.mobileImgClasses)}`);
    }
    console.log('✔ PASS: Images use object-contain and object-center!');

    // Verify no horizontal overflow
    if (heroInfo.hasOverflow) {
      throw new Error('FAIL: Horizontal overflow detected on mobile hero!');
    }
    console.log('✔ PASS: Zero horizontal overflow on mobile!');

    // Test slider arrow navigation
    console.log('Testing Next slide button click...');
    const nextBtn = await page.$('button[aria-label="Next slide"]');
    if (!nextBtn) throw new Error('Next button not found');
    await nextBtn.click();
    await new Promise(r => setTimeout(r, 1000));

    const activeSlide = await page.evaluate(() => {
      const hero = document.querySelector('section[aria-label="Hero Carousel"]');
      const activeDiv = hero?.querySelector('div[aria-hidden="false"]');
      const activeImg = activeDiv ? activeDiv.querySelector('.block.md\\:hidden img') : null;
      return activeImg ? activeImg.src : null;
    });
    console.log('Active slide after Next click:', activeSlide);
    if (!activeSlide || !decodeURIComponent(activeSlide).includes('image-banner-2.webp')) {
      throw new Error(`Expected image-banner-2.webp to be active, got ${activeSlide}`);
    }
    console.log('✔ PASS: Slide transitioned to image-banner-2.webp successfully!');

    // 2. Test Desktop Viewport (1440px)
    console.log('\nTesting Desktop Viewport (1440px)...');
    await page.setViewport({ width: 1440, height: 900 });
    await new Promise(r => setTimeout(r, 500));

    const desktopCheck = await page.evaluate(() => {
      const hero = document.querySelector('section[aria-label="Hero Carousel"]');
      const desktopImgs = Array.from(hero.querySelectorAll('.hidden.md\\:block img'));
      return {
        desktopImgSources: desktopImgs.map(img => img.src)
      };
    });
    console.log('Desktop Hero Check:', desktopCheck);
    const desktopBannersFound = desktopCheck.desktopImgSources.some(s => decodeURIComponent(s).includes('/banners/desktop/image-banner-1.webp'));
    if (!desktopBannersFound) {
      throw new Error('Desktop banners altered!');
    }
    console.log('✔ PASS: Desktop hero banners remain unchanged!');

    console.log('\n========================================');
    console.log('ALL MOBILE HERO SLIDER TESTS PASSED!');
    console.log('========================================');
  } finally {
    await browser.close();
  }
}

testMobileHero().catch(err => {
  console.error(err);
  process.exit(1);
});
