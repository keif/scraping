const puppeteer = require('puppeteer');

(async () => {
	// it opens like a browser and then screenshots
	const browser = await puppeteer.launch({
		headless: false,
		// devtools: true
	});
	const page = await browser.newPage();

    // intercept the requests
    await page.setRequestInterception(true)

    page.on('request', (request) => {
        const abortResources = ['image', 'stylesheet', 'font']
        if (abortResources.indexOf(request.resourceType()) > -1) {
            request.abort()
        } else {
            request.continue()
        }
    })
    // await page.goto('https://learnscraping.com');
    await page.goto('https://learnscraping.com/building-a-live-subscribers-counter-with-nodejs-scraping/')

	debugger
	// await browser.close();

})();
