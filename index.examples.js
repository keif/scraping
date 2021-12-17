const puppeteer = require('puppeteer');

(async () => {

  /* 1. Creating a PDF from the website */
  let browser = await puppeteer.launch({ headless: true });
  let page = await browser.newPage();
  await page.goto('https://learnscraping.com/');
  await page.pdf({
    path: './page.pdf',
    format: 'A4'
  })
  await browser.close();


  /* 2. Getting the URL or the Title of the current page */
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://learnscraping.com/');

  let title = await page.title();
  console.log(`Title of the page is ${title}`);

  let url = await page.url();
  console.log(`URL of the page is ${url}`);

  await browser.close();


  /* 3. Emulate a phone */
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  const iPhone = puppeteer.devices['iPhone X'];
  await page.emulate(iPhone);

  await page.goto('https://learnscraping.com/');

  await browser.close();

})();