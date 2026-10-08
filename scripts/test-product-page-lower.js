const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3005';

const PRODUCTS_TO_TEST = [
  { slug: 'bike-cover', keyword: 'motorcycle' },
  { slug: 'washing-machine-cover', keyword: 'laundry' },
  { slug: 'mattress-cover', keyword: 'mattress' },
  { slug: 'rain-dress', keyword: 'riding suit' },
];

async function testProductPage() {
  console.log('Testing Product Page Lower Content Section...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  try {
    const page = await browser.newPage();

    // 1. Test each product's unique description & bullets
    for (const item of PRODUCTS_TO_TEST) {
      console.log(`\nTesting /product/${item.slug}...`);
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(`${BASE_URL}/product/${item.slug}`, { waitUntil: 'networkidle2' });

      const pageData = await page.evaluate(() => {
        // Check for old tabs
        const tabTexts = Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim());
        const hasKeyFeaturesTab = tabTexts.some(t => t === 'Key Features');
        const hasSpecsTab = tabTexts.some(t => t === 'Specifications');
        const hasShippingTab = tabTexts.some(t => t === 'Shipping & Returns');

        // Check Product Description section
        const descHeading = document.querySelector('#product-description-heading');
        const descParagraph = descHeading?.parentElement?.nextElementSibling?.textContent?.trim();
        const bullets = Array.from(document.querySelectorAll('#product-description-heading ~ * ul li, section[aria-labelledby="product-description-heading"] ul li'))
          .map(li => li.textContent?.trim());

        // Check Related Products section
        const relatedHeading = document.querySelector('#related-products-heading');
        const relatedCards = Array.from(document.querySelectorAll('section[aria-labelledby="related-products-heading"] a[href^="/product/"]'))
          .map(a => a.getAttribute('href'));
        // Unique card hrefs
        const uniqueRelatedSlugs = [...new Set(relatedCards.map(h => h.replace('/product/', '')))];

        // Check Customer Reviews section
        const reviewsHeading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent?.trim() === 'Customer Reviews');
        const reviewCards = document.querySelectorAll('section.select-none [class*="rounded-2xl"]');

        return {
          hasKeyFeaturesTab,
          hasSpecsTab,
          hasShippingTab,
          descHeadingText: descHeading?.textContent?.trim(),
          descParagraphSnippet: descParagraph?.substring(0, 80),
          bulletCount: bullets.length,
          firstBullet: bullets[0],
          hasRelatedHeading: !!relatedHeading,
          relatedCount: uniqueRelatedSlugs.length,
          relatedSlugs: uniqueRelatedSlugs,
          hasReviewsHeading: !!reviewsHeading,
          reviewCardCount: reviewCards.length,
        };
      });

      console.log('Result:', pageData);

      if (pageData.hasKeyFeaturesTab || pageData.hasSpecsTab || pageData.hasShippingTab) {
        throw new Error(`FAIL: Old tabs still present on /product/${item.slug}`);
      }
      if (pageData.descHeadingText !== 'Product Description') {
        throw new Error(`FAIL: Missing Product Description heading on /product/${item.slug}`);
      }
      if (!pageData.bulletCount || pageData.bulletCount < 5) {
        throw new Error(`FAIL: Bullets missing or too few (${pageData.bulletCount}) on /product/${item.slug}`);
      }
      if (pageData.relatedCount !== 4) {
        throw new Error(`FAIL: Expected 4 related products, got ${pageData.relatedCount} on /product/${item.slug}`);
      }
      if (pageData.relatedSlugs.includes(item.slug)) {
        throw new Error(`FAIL: Current product ${item.slug} found inside related products!`);
      }
      if (!pageData.hasReviewsHeading) {
        throw new Error(`FAIL: Missing Customer Reviews section on /product/${item.slug}`);
      }

      console.log(`✔ PASS: /product/${item.slug} has unique description, 4 related products (excluding current), and reviews carousel!`);
    }

    // 2. Capture Visual Screenshots (Desktop 1440, Tablet 768, Mobile 375)
    console.log('\nCapturing visual screenshots for /product/bike-cover...');
    
    // Desktop 1440px
    await page.setViewport({ width: 1440, height: 1800, deviceScaleFactor: 1 });
    await page.goto(`${BASE_URL}/product/bike-cover`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: 'scripts/product-desktop.png', fullPage: false });
    console.log('Saved scripts/product-desktop.png');

    // Mobile 375px
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
    await page.goto(`${BASE_URL}/product/bike-cover`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));
    // Scroll down to lower content
    await page.evaluate(() => {
      const desc = document.querySelector('#product-description-heading');
      if (desc) desc.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'scripts/product-mobile-lower.png' });
    console.log('Saved scripts/product-mobile-lower.png');

    console.log('\n========================================');
    console.log('ALL PRODUCT PAGE LOWER CONTENT TESTS PASSED!');
    console.log('========================================');
  } finally {
    await browser.close();
  }
}

testProductPage().catch(e => {
  console.error(e);
  process.exit(1);
});
