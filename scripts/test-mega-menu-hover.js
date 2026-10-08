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
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  const shopCoversBtn = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll('header button')).find(b => b.textContent.includes('Shop Covers'));
  });
  await shopCoversBtn.asElement().hover();
  await new Promise(r => setTimeout(r, 400));

  // Hover Car Covers
  const carBtn = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll('header button')).find(b => b.textContent.trim().startsWith('Car Covers'));
  });
  await carBtn.asElement().hover();
  await new Promise(r => setTimeout(r, 500));

  const carState = await page.evaluate(() => {
    const text = document.querySelector('header').innerText;
    return {
      hasCarCoversTitle: text.includes('Car Covers by Body Type'),
      hasSedan: text.includes('Full Sedan'),
      hasImage: !!document.querySelector('header img[src*="car-cover.webp"]')
    };
  });
  console.log('State after hovering Car Covers:', carState);

  // Hover Bike Covers
  const bikeBtn = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll('header button')).find(b => b.textContent.trim().startsWith('Bike Covers'));
  });
  await bikeBtn.asElement().hover();
  await new Promise(r => setTimeout(r, 500));

  const bikeState = await page.evaluate(() => {
    const text = document.querySelector('header').innerText;
    return {
      hasBikeCoversTitle: text.includes('Bike Covers by Model'),
      hasHonda: text.includes('Honda CD 70'),
      hasImage: !!document.querySelector('header img[src*="bike-cover.webp"]')
    };
  });
  console.log('State after hovering Bike Covers:', bikeState);

  await browser.close();
})();
