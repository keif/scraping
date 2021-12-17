const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.authenticate({ username: 'admin', password: '12345' })

    await page.goto('http://httpbin.org/basic-auth/admin/12345')

    debugger;

    // await browser.close()

})()