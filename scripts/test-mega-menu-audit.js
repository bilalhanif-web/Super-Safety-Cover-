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

  // 1. Open Shop Covers
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('header button')).find(b => b.textContent.includes('Shop Covers'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Verify neutral state initially
  const initialNeutral = await page.evaluate(() => {
    return document.querySelector('header').innerText.includes('Select a Category to Explore');
  });
  console.log('1. Initial Neutral state when opened:', initialNeutral);

  // 2. Click Car Covers
  await page.evaluate(() => {
    const carBtn = Array.from(document.querySelectorAll('header button')).find(b => b.textContent.trim() === 'Car Covers');
    if (carBtn) carBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const carResult = await page.evaluate(() => {
    const header = document.querySelector('header');
    return {
      hasCarCoversTitle: header.innerText.includes('Car Covers by Body Type'),
      hasImage: !!header.querySelector('img[src*="car-cover.webp"]'),
      imageSrc: header.querySelector('img[src*="car-cover.webp"]')?.src
    };
  });
  console.log('2. Car Covers panel state:', carResult);

  // 3. Click Bike Covers
  await page.evaluate(() => {
    const bikeBtn = Array.from(document.querySelectorAll('header button')).find(b => b.textContent.trim() === 'Bike Covers');
    if (bikeBtn) bikeBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const bikeResult = await page.evaluate(() => {
    const header = document.querySelector('header');
    return {
      hasBikeCoversTitle: header.innerText.includes('Bike Covers by Model'),
      hasImage: !!header.querySelector('img[src*="bike-cover.webp"]'),
      imageSrc: header.querySelector('img[src*="bike-cover.webp"]')?.src
    };
  });
  console.log('3. Bike Covers panel state:', bikeResult);

  await browser.close();
})();
