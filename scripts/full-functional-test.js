const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3005';

async function runFunctionalTests() {
  console.log('Starting Full Functional Verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const errors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console Error: ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    errors.push(`Page Error: ${err.message}`);
  });

  try {
    // 1. TEST PRODUCT PAGE & CUSTOM SIZE & ADD TO CART
    console.log('\n--- 1. Testing Product Page (Bike Cover) Custom Size & Cart ---');
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(`${BASE_URL}/product/bike-cover`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    // Find and click "Custom Size" button
    const customSizeBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.innerText && b.innerText.includes('Custom Size'));
    });

    if (customSizeBtn && customSizeBtn.asElement()) {
      await customSizeBtn.click();
      await new Promise(r => setTimeout(r, 400));
      console.log('✔ Clicked "Custom Size" variant button');

      // Check if measurement form appeared
      const hasForm = await page.evaluate(() => {
        return !!document.querySelector('input[placeholder*="Honda CD 70"]');
      });
      console.log(hasForm ? '✔ Custom measurement form appeared' : '❌ Form NOT found');

      // Select color Maroon
      const selectedColor = await page.evaluate(() => {
        const swatches = Array.from(document.querySelectorAll('button[title="Maroon"], button[aria-label="Maroon"]'));
        if (swatches.length > 0) {
          swatches[0].click();
          return true;
        }
        return false;
      });
      console.log(selectedColor ? '✔ Selected color: Maroon' : '❌ Maroon color swatch not clicked');

      // Check WhatsApp button href
      const waHref = await page.evaluate(() => {
        const waLink = document.querySelector('a[href*="wa.me"]');
        return waLink ? waLink.href : null;
      });
      console.log('✔ WhatsApp Order Link generated:', waHref ? 'Valid' : 'None');

      // Click Add to Cart
      const addToCartBtn = await page.evaluateHandle(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        return btns.find(b => b.innerText && b.innerText.includes('Add to Cart'));
      });
      if (addToCartBtn && addToCartBtn.asElement()) {
        await addToCartBtn.click();
        await new Promise(r => setTimeout(r, 800));
        console.log('✔ Clicked Add to Cart');

        // Check if Cart Drawer opened
        const isDrawerOpen = await page.evaluate(() => {
          return document.body.innerText.includes('Shopping Cart') || document.body.innerText.includes('Your Cart');
        });
        console.log(isDrawerOpen ? '✔ Cart Drawer opened' : '❌ Cart Drawer did not open');
      }
    } else {
      console.log('❌ Custom Size button not found');
    }

    // 2. TEST MEGA MENU
    console.log('\n--- 2. Testing Desktop Shop Covers Mega Menu ---');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 500));

    // Click "Shop Covers"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const shopBtn = btns.find(b => b.innerText && b.innerText.includes('Shop Covers'));
      if (shopBtn) shopBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Verify mega menu state: no category selected by default
    const menuInitialState = await page.evaluate(() => {
      const promptText = document.body.innerText.includes('Select a Category to Explore');
      return { neutralPromptShown: promptText };
    });
    console.log(menuInitialState.neutralPromptShown ? '✔ Mega Menu opens with neutral state (No category auto-selected)' : '❌ Neutral prompt NOT found');

    // Hover on "Car Covers"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const carBtn = btns.find(b => b.innerText && b.innerText.trim() === 'Car Covers');
      if (carBtn) {
        carBtn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      }
    });
    await new Promise(r => setTimeout(r, 400));

    const carMenuState = await page.evaluate(() => {
      return document.body.innerText.includes('Car Covers by Body Type');
    });
    console.log(carMenuState ? '✔ Hovering Car Covers displays Car Covers panel' : '❌ Car Covers panel NOT displayed');

    // 3. TEST MOBILE DRAWER MENU
    console.log('\n--- 3. Testing Mobile Drawer Menu ---');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 500));

    // Click mobile menu button
    await page.evaluate(() => {
      const btn = document.querySelector('button[aria-label="Open navigation menu"]');
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const mobileMenuOpen = await page.evaluate(() => {
      const scrollW = document.documentElement.scrollWidth;
      const visible = document.body.innerText.includes('All Protective Covers') || document.body.innerText.includes('Bike Covers');
      return { visible, scrollW };
    });
    console.log(mobileMenuOpen.visible ? `✔ Mobile Menu opened cleanly (scrollWidth: ${mobileMenuOpen.scrollW}px)` : '❌ Mobile menu did not open');

    // Close menu
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close menu"], button[aria-label="Close navigation menu"]');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 4. TEST ALL 8 PRODUCT PAGES EXIST AND RENDER CORRECTLY
    console.log('\n--- 4. Testing All 8 Product Pages ---');
    const products = [
      { slug: 'bike-cover', name: 'Bike Cover' },
      { slug: 'car-cover', name: 'Car Cover' },
      { slug: 'ac-cover', name: 'AC Cover' },
      { slug: 'washing-machine-cover', name: 'Washing Machine Cover' },
      { slug: 'rain-dress', name: 'Rain Dress' },
      { slug: 'mattress-cover', name: 'Mattress Cover' },
      { slug: 'fan-cover', name: 'Fan Cover' },
      { slug: 'air-cooler-cover', name: 'Air Cooler Cover' }
    ];

    for (const prod of products) {
      await page.goto(`${BASE_URL}/product/${prod.slug}`, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 300));

      const details = await page.evaluate(() => {
        const titleEl = document.querySelector('h1');
        const descEl = document.body.innerText.includes('KEY POINTS');
        const relatedEl = document.body.innerText.includes('Related Products');
        const reviewsEl = document.body.innerText.includes('Customer Reviews');
        const swatchesCount = document.querySelectorAll('button[title]').length;
        const customSizeAvailable = document.body.innerText.includes('Custom Size');

        return {
          title: titleEl ? titleEl.innerText : null,
          hasKeyPoints: descEl,
          hasRelated: relatedEl,
          hasReviews: reviewsEl,
          swatchesCount,
          customSizeAvailable
        };
      });

      console.log(`✔ [${prod.slug}] Title: "${details.title}" | Key Points: ${details.hasKeyPoints} | Related: ${details.hasRelated} | Reviews: ${details.hasReviews} | Swatches: ${details.swatchesCount} | Custom Size: ${details.customSizeAvailable}`);
    }

    // 5. TEST CHECKOUT PAGE
    console.log('\n--- 5. Testing Checkout Page ---');
    await page.goto(`${BASE_URL}/checkout`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 400));

    const checkoutState = await page.evaluate(() => {
      const nameInput = !!document.querySelector('input[placeholder*="Name"], input[name*="name"], input[id*="name"]');
      const phoneInput = !!document.querySelector('input[placeholder*="03"], input[type="tel"]');
      const codOption = document.body.innerText.includes('Cash on Delivery');
      return { nameInput, phoneInput, codOption };
    });
    console.log(`✔ Checkout Fields: Name Input: ${checkoutState.nameInput} | Phone Input: ${checkoutState.phoneInput} | COD Option: ${checkoutState.codOption}`);

    // 6. TEST CONTACT US PAGE
    console.log('\n--- 6. Testing Contact Us Page ---');
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 400));

    const contactState = await page.evaluate(() => {
      const hasForm = !!document.querySelector('form');
      const cards = Array.from(document.querySelectorAll('a[target="_blank"]')).map(a => a.href);
      return { hasForm, cardsCount: cards.length, links: cards };
    });
    console.log(`✔ Contact Page: Has Form: ${contactState.hasForm} (Should be false) | External Cards: ${contactState.cardsCount}`);

  } catch (err) {
    console.error('Test execution error:', err);
    errors.push(err.message);
  } finally {
    await browser.close();
  }

  console.log('\n==================================================');
  console.log(`FUNCTIONAL TEST COMPLETED. Errors encountered: ${errors.length}`);
  console.log('==================================================');
  if (errors.length > 0) {
    errors.forEach(e => console.log(`- ${e}`));
  }
}

runFunctionalTests();
