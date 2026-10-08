const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3005';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`${BASE_URL}/product/bike-cover`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  // Scroll to variants and click Custom Size
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Custom Size');
    if (btn) btn.scrollIntoView({ block: 'center' });
  });
  await new Promise(r => setTimeout(r, 300));

  const csHandle = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Custom Size');
  });
  await csHandle.asElement().click();
  await new Promise(r => setTimeout(r, 600));

  // Type in the required fields with puppeteer page.type
  const inputs = await page.$$('input[type="text"]');
  if (inputs.length >= 4) {
    await inputs[0].type('Honda CD 70 2024');
    await inputs[1].type('190');
    await inputs[2].type('85');
    await inputs[3].type('115');
    console.log('Filled in 4 required measurement inputs');
  }

  // Scroll Add to Cart into view and click
  await page.evaluate(() => {
    const atc = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Add to Cart'));
    if (atc) atc.scrollIntoView({ block: 'center' });
  });
  await new Promise(r => setTimeout(r, 300));

  const atcHandle = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Add to Cart'));
  });
  await atcHandle.asElement().click();
  await new Promise(r => setTimeout(r, 1200));

  const cartState = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasShoppingCartHeading: text.includes('Shopping Cart'),
      hasCustomSizeInCart: text.includes('Custom Size'),
      hasModelNameInCart: text.includes('Honda CD 70 2024'),
      hasDimensionsInCart: text.includes('190') && text.includes('85')
    };
  });
  console.log('Cart State after Add to Cart:', cartState);

  // Click Checkout button in Cart Drawer
  const checkoutBtn = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll('a, button')).find(el => el.textContent.includes('Proceed to Checkout'));
  });
  if (checkoutBtn && checkoutBtn.asElement()) {
    await checkoutBtn.asElement().click();
    await new Promise(r => setTimeout(r, 1500));

    const onCheckout = await page.evaluate(() => {
      return {
        url: window.location.pathname,
        hasItem: document.body.innerText.includes('Bike Cover'),
        hasCustomVariant: document.body.innerText.includes('Honda CD 70 2024')
      };
    });
    console.log('Checkout page state:', onCheckout);
  }

  await browser.close();
})();
