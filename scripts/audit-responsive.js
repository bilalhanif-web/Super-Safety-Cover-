const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3005';

const BREAKPOINTS = [
  { name: '320px (Small Mobile)', width: 320, height: 600 },
  { name: '360px (Standard Mobile)', width: 360, height: 740 },
  { name: '375px (iPhone SE)', width: 375, height: 667 },
  { name: '390px (iPhone 12/13/14)', width: 390, height: 844 },
  { name: '414px (Large Mobile)', width: 414, height: 896 },
  { name: '768px (Tablet)', width: 768, height: 1024 },
  { name: '1024px (Small Desktop)', width: 1024, height: 768 },
  { name: '1440px (Desktop HD)', width: 1440, height: 900 }
];

const PAGES = [
  '/',
  '/shop',
  '/bike-covers',
  '/car-covers',
  '/ac-covers',
  '/washing-machine-covers',
  '/bike-covers/honda-cd-70',
  '/product/bike-cover',
  '/product/car-cover',
  '/product/ac-cover',
  '/best-sellers',
  '/new-arrivals',
  '/about',
  '/contact',
  '/blog',
  '/checkout',
  '/track-order',
  '/returns-exchanges',
  '/shipping-information',
  '/privacy-policy',
  '/terms-and-conditions'
];

async function runAudit() {
  console.log('Launching Headless Chrome for Responsive Audit...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const allIssues = [];

  for (const bp of BREAKPOINTS) {
    console.log(`\n========================================`);
    console.log(`Testing Breakpoint: ${bp.name} (${bp.width}x${bp.height})`);
    console.log(`========================================`);

    await page.setViewport({ width: bp.width, height: bp.height });

    for (const urlPath of PAGES) {
      const fullUrl = `${BASE_URL}${urlPath}`;
      try {
        await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
        // wait short delay for layout to settle
        await new Promise(r => setTimeout(r, 600));

        const result = await page.evaluate((bpWidth) => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const hasHorizontalScroll = scrollWidth > bpWidth;

          const overflowingElements = [];
          if (hasHorizontalScroll) {
            const all = document.querySelectorAll('*');
            for (const el of all) {
              const rect = el.getBoundingClientRect();
              // Check if right edge exceeds screen by more than 1px
              if (rect.right > bpWidth + 1 && rect.width > 0 && rect.height > 0) {
                // compute a readable CSS selector
                let sel = el.tagName.toLowerCase();
                if (el.id) sel += '#' + el.id;
                else if (el.className && typeof el.className === 'string') {
                  const firstClass = el.className.trim().split(/\s+/)[0];
                  if (firstClass) sel += '.' + firstClass;
                }

                overflowingElements.push({
                  tag: el.tagName.toLowerCase(),
                  selector: sel,
                  className: typeof el.className === 'string' ? el.className.slice(0, 100) : '',
                  right: Math.round(rect.right),
                  width: Math.round(rect.width),
                  overflowBy: Math.round(rect.right - bpWidth),
                  snippet: (el.innerText || el.textContent || '').trim().slice(0, 60).replace(/\n/g, ' ')
                });
              }
            }
          }

          // Check if any text touches screen edge (left < 0 or right > bpWidth)
          const textTouchingEdges = [];
          const headingsAndP = document.querySelectorAll('h1, h2, h3, p, a, span, button');
          for (const el of headingsAndP) {
            if (el.offsetParent === null) continue; // hidden
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              if (rect.left < 2 && el.closest('header, footer, nav') === null) {
                textTouchingEdges.push({
                  tag: el.tagName.toLowerCase(),
                  text: el.innerText ? el.innerText.slice(0, 40) : '',
                  left: Math.round(rect.left)
                });
              }
            }
          }

          return {
            scrollWidth,
            innerWidth: window.innerWidth,
            hasHorizontalScroll,
            overflowCount: overflowingElements.length,
            overflowingElements: overflowingElements.slice(0, 8),
            textTouchingEdges: textTouchingEdges.slice(0, 3)
          };
        }, bp.width);

        if (result.hasHorizontalScroll) {
          console.error(`❌ [OVERFLOW] ${urlPath} | scrollWidth: ${result.scrollWidth}px vs ${bp.width}px (Overflow: +${result.scrollWidth - bp.width}px)`);
          for (const el of result.overflowingElements) {
            console.error(`   -> ${el.tag} (${el.selector}) w:${el.width}px right:${el.right}px (+${el.overflowBy}px) | class: "${el.className}" | text: "${el.snippet}"`);
          }
          allIssues.push({ bp: bp.name, path: urlPath, result });
        } else {
          process.stdout.write(`✔ ${urlPath} `);
        }
      } catch (err) {
        console.error(`\n⚠️ Error loading ${fullUrl}: ${err.message}`);
      }
    }
    console.log('');
  }

  await browser.close();

  console.log('\n========================================');
  console.log(`AUDIT COMPLETE. Total overflow instances found: ${allIssues.length}`);
  console.log('========================================');
}

runAudit();
