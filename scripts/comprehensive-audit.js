const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3005';

const BREAKPOINTS = [
  { name: 'Mobile 320px', width: 320, height: 640 },
  { name: 'Mobile 360px', width: 360, height: 740 },
  { name: 'Mobile 375px', width: 375, height: 667 },
  { name: 'Mobile 390px', width: 390, height: 844 },
  { name: 'Mobile 414px', width: 414, height: 896 },
  { name: 'Tablet 768px', width: 768, height: 1024 },
  { name: 'Tablet 1024px', width: 1024, height: 768 },
  { name: 'Desktop 1280px', width: 1280, height: 800 },
  { name: 'Desktop 1440px', width: 1440, height: 900 },
  { name: 'Desktop 1920px', width: 1920, height: 1080 }
];

const PAGES = [
  '/',
  '/shop',
  '/product/bike-cover',
  '/product/car-cover',
  '/product/ac-cover',
  '/product/washing-machine-cover',
  '/product/rain-dress',
  '/product/mattress-cover',
  '/product/fan-cover',
  '/product/air-cooler-cover',
  '/bike-covers',
  '/car-covers',
  '/ac-covers',
  '/washing-machine-covers',
  '/rain-dress',
  '/mattress-covers',
  '/fan-covers',
  '/air-cooler-covers',
  '/bike-covers/honda-cd-70',
  '/about',
  '/contact',
  '/blog',
  '/checkout',
  '/best-sellers',
  '/new-arrivals',
  '/track-order',
  '/returns-exchanges',
  '/shipping-information',
  '/privacy-policy',
  '/terms-and-conditions'
];

async function runComprehensiveAudit() {
  console.log('Starting Comprehensive Website Audit with Headless Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const brokenImagesList = [];
  const consoleErrorsList = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrorsList.push({ text: msg.text(), location: msg.location() });
    }
  });

  page.on('response', response => {
    if (response.status() >= 400 && response.request().resourceType() === 'image') {
      brokenImagesList.push({ url: response.url(), status: response.status() });
    }
  });

  const overflowResults = [];

  for (const bp of BREAKPOINTS) {
    console.log(`\n==================================================`);
    console.log(`Testing Breakpoint: ${bp.name} (${bp.width}x${bp.height})`);
    console.log(`==================================================`);

    await page.setViewport({ width: bp.width, height: bp.height });

    for (const urlPath of PAGES) {
      const fullUrl = `${BASE_URL}${urlPath}`;
      try {
        await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await new Promise(r => setTimeout(r, 400));

        const auditData = await page.evaluate((bpWidth) => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const hasHorizontalScroll = scrollWidth > bpWidth;

          const overflowing = [];
          if (hasHorizontalScroll) {
            const allElements = document.querySelectorAll('*');
            for (const el of allElements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > bpWidth + 1 && rect.width > 0 && rect.height > 0) {
                let sel = el.tagName.toLowerCase();
                if (el.id) sel += '#' + el.id;
                else if (el.className && typeof el.className === 'string') {
                  const firstClass = el.className.trim().split(/\s+/)[0];
                  if (firstClass) sel += '.' + firstClass;
                }
                overflowing.push({
                  tag: el.tagName.toLowerCase(),
                  selector: sel,
                  className: typeof el.className === 'string' ? el.className.slice(0, 100) : '',
                  right: Math.round(rect.right),
                  width: Math.round(rect.width),
                  overflowBy: Math.round(rect.right - bpWidth),
                  snippet: (el.innerText || el.textContent || '').trim().slice(0, 50).replace(/\n/g, ' ')
                });
              }
            }
          }

          // Check broken img tags in DOM
          const images = Array.from(document.querySelectorAll('img'));
          const domBrokenImages = images
            .filter(img => img.naturalWidth === 0 && img.src && !img.src.startsWith('data:'))
            .map(img => img.src);

          return {
            scrollWidth,
            hasHorizontalScroll,
            overflowCount: overflowing.length,
            overflowing: overflowing.slice(0, 5),
            domBrokenImages
          };
        }, bp.width);

        if (auditData.hasHorizontalScroll) {
          console.error(`❌ [OVERFLOW] ${urlPath} | scrollWidth: ${auditData.scrollWidth}px vs ${bp.width}px (+${auditData.scrollWidth - bp.width}px)`);
          auditData.overflowing.forEach(el => {
            console.error(`   -> ${el.selector} w:${el.width}px right:${el.right}px (+${el.overflowBy}px) | snippet: "${el.snippet}"`);
          });
          overflowResults.push({ bp: bp.name, width: bp.width, path: urlPath, data: auditData });
        } else {
          process.stdout.write(`✔ ${urlPath} `);
        }

        if (auditData.domBrokenImages.length > 0) {
          console.error(`\n❌ [BROKEN IMG] ${urlPath}: ${auditData.domBrokenImages.join(', ')}`);
        }
      } catch (err) {
        console.error(`\n⚠️ Error loading ${fullUrl}: ${err.message}`);
      }
    }
    console.log('');
  }

  await browser.close();

  console.log('\n==================================================');
  console.log('AUDIT SUMMARY');
  console.log('==================================================');
  console.log(`Total Breakpoints Tested: ${BREAKPOINTS.length}`);
  console.log(`Total Pages Tested per Breakpoint: ${PAGES.length}`);
  console.log(`Total Overflow Instances: ${overflowResults.length}`);
  console.log(`Total Broken Image Requests: ${brokenImagesList.length}`);
  console.log(`Total Console Errors: ${consoleErrorsList.length}`);

  if (overflowResults.length > 0) {
    console.log('\nOVERFLOW DETAILS:');
    overflowResults.forEach(r => {
      console.log(`- [${r.bp}] ${r.path} (scrollWidth: ${r.data.scrollWidth}px vs ${r.width}px)`);
    });
  }

  if (brokenImagesList.length > 0) {
    console.log('\nBROKEN IMAGES:');
    brokenImagesList.forEach(img => console.log(`- ${img.url} (status: ${img.status})`));
  }

  if (consoleErrorsList.length > 0) {
    console.log('\nCONSOLE ERRORS:');
    consoleErrorsList.forEach(e => console.log(`- ${e.text}`));
  }
}

runComprehensiveAudit();
