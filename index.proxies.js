const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [`--proxy-server=46.198.132.228:21231`]
    });
    const page = await browser.newPage();

    await page.goto(`https://httpbin.org/ip`)

    debugger;

    // await browser.close()

})()