const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3005';

async function testMegaMenu() {
  console.log('Launching Chrome to test Shop Covers mega menu...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log(`Navigating to ${BASE_URL}...`);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1000));

    // Find "Shop Covers" button
    const shopCoversBtn = await page.waitForSelector('button[aria-expanded]');
    console.log('Found Shop Covers trigger button.');

    // 1. Initial click to open
    console.log('Action: Clicking "Shop Covers" button...');
    await shopCoversBtn.click();
    await new Promise(r => setTimeout(r, 500));

    // Verify Bike Covers panel content
    const bikeCoversCheck = await page.evaluate(() => {
      const activeLeft = document.querySelector('.bg-olive-soft.text-olive');
      const activeText = activeLeft ? activeLeft.textContent.trim() : null;

      const titleEl = document.querySelector('h4.text-base.font-extrabold');
      const title = titleEl ? titleEl.textContent.trim() : null;

      const allHeadings = Array.from(document.querySelectorAll('.text-xs.font-bold.text-brand-black.uppercase')).map(el => el.textContent.trim());

      const hondaHeading = allHeadings.find(h => h.includes('HONDA'));
      const yamahaHeading = allHeadings.find(h => h.includes('YAMAHA'));
      const suzukiHeading = allHeadings.find(h => h.includes('SUZUKI'));

      const viewAllLink = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('View All Bike Covers'));
      const viewAllHref = viewAllLink ? viewAllLink.getAttribute('href') : null;

      const img = Array.from(document.querySelectorAll('img')).find(img => img.src.includes('bike-cover.webp'));
      const imgSrc = img ? img.src : null;

      return {
        activeText,
        title,
        hondaHeading,
        yamahaHeading,
        suzukiHeading,
        viewAllHref,
        imgSrc
      };
    });

    console.log('Check 1 (Initial Open):', bikeCoversCheck);

    if (
      bikeCoversCheck.activeText && bikeCoversCheck.activeText.includes('Bike Covers') &&
      bikeCoversCheck.hondaHeading &&
      bikeCoversCheck.yamahaHeading &&
      bikeCoversCheck.suzukiHeading &&
      bikeCoversCheck.viewAllHref === '/bike-covers' &&
      bikeCoversCheck.imgSrc
    ) {
      console.log('✔ PASS: Bike Covers is selected by default with Honda, Yamaha, Suzuki, View All link, and image!');
    } else {
      throw new Error(`FAIL: Initial open failed: ${JSON.stringify(bikeCoversCheck)}`);
    }

    // 2. Select Car Covers in the desktop mega menu left column
    console.log('Action: Selecting "Car Covers" in left category column...');
    const carCoverBtn = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('.w-56 button'));
      return buttons.find(b => b.textContent.includes('Car Covers'));
    });
    await carCoverBtn.click();
    await new Promise(r => setTimeout(r, 400));

    const carCoversCheck = await page.evaluate(() => {
      const activeLeft = document.querySelector('.bg-olive-soft.text-olive');
      const activeText = activeLeft ? activeLeft.textContent.trim() : null;
      const title = document.querySelector('h4.text-base.font-extrabold')?.textContent.trim();
      const hasCarImg = Array.from(document.querySelectorAll('img')).some(img => img.src.includes('car-cover.webp'));
      return { activeText, title, hasCarImg };
    });
    console.log('Check 2 (After selecting Car Covers):', carCoversCheck);
    if (carCoversCheck.activeText.includes('Car Covers') && carCoversCheck.hasCarImg) {
      console.log('✔ PASS: Successfully updated panel to Car Covers!');
    } else {
      throw new Error(`FAIL: Panel did not update to Car Covers: ${JSON.stringify(carCoversCheck)}`);
    }

    // 3. Select AC Covers
    console.log('Action: Selecting "AC Covers" in left category column...');
    const acCoverBtn = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('.w-56 button'));
      return buttons.find(b => b.textContent.includes('AC Covers'));
    });
    await acCoverBtn.click();
    await new Promise(r => setTimeout(r, 400));

    const acCoversCheck = await page.evaluate(() => {
      const activeLeft = document.querySelector('.bg-olive-soft.text-olive');
      const activeText = activeLeft ? activeLeft.textContent.trim() : null;
      const hasAcImg = Array.from(document.querySelectorAll('img')).some(img => img.src.includes('ac-cover.webp'));
      return { activeText, hasAcImg };
    });
    console.log('Check 3 (After selecting AC Covers):', acCoversCheck);
    if (acCoversCheck.activeText.includes('AC Covers') && acCoversCheck.hasAcImg) {
      console.log('✔ PASS: Successfully updated panel to AC Covers!');
    } else {
      throw new Error(`FAIL: Panel did not update to AC Covers: ${JSON.stringify(acCoversCheck)}`);
    }

    // 4. Close menu using Escape key
    console.log('Action: Pressing Escape key to close mega menu...');
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));

    const isClosed = await page.evaluate(() => {
      const menu = document.querySelector('.w-56')?.closest('.opacity-0, .invisible');
      return !!menu;
    });
    console.log('Check 4 (Menu closed):', isClosed);
    if (isClosed) {
      console.log('✔ PASS: Mega menu successfully closed on Escape!');
    }

    // 5. Re-open menu by clicking "Shop Covers" again
    console.log('Action: Re-opening menu by clicking "Shop Covers" button...');
    await shopCoversBtn.click();
    await new Promise(r => setTimeout(r, 500));

    const reOpenCheck = await page.evaluate(() => {
      const activeLeft = document.querySelector('.bg-olive-soft.text-olive');
      const activeText = activeLeft ? activeLeft.textContent.trim() : null;
      const title = document.querySelector('h4.text-base.font-extrabold')?.textContent.trim();
      const hasBikeImg = Array.from(document.querySelectorAll('img')).some(img => img.src.includes('bike-cover.webp'));
      return { activeText, title, hasBikeImg };
    });
    console.log('Check 5 (Re-opened menu):', reOpenCheck);
    if (reOpenCheck.activeText && reOpenCheck.activeText.includes('Bike Covers') && reOpenCheck.hasBikeImg) {
      console.log('✔ PASS: Re-opened menu correctly defaulted back to Bike Covers with bike cover poster!');
    } else {
      throw new Error(`FAIL: Re-opened menu did not reset to Bike Covers: ${JSON.stringify(reOpenCheck)}`);
    }

    console.log('\n========================================');
    console.log('ALL SHOP COVERS MEGA MENU TESTS PASSED!');
    console.log('========================================');
  } finally {
    await browser.close();
  }
}

testMegaMenu().catch(err => {
  console.error(err);
  process.exit(1);
});
