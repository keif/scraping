const puppeteer = require('puppeteer');

(async () => {
	// it opens like a browser and then screenshots
	const browser = await puppeteer.launch({
		headless: false,
		// devtools: true
	});
	// const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://google.com');
	await page.type('.gLFyf.gsfi', 'Udemy Tutorials', { delay: 100 }); // Types slower, like a user
	await page.keyboard.press(`Enter`);
	await page.waitForNavigation();

	await page.screenshot({ path: 'example.png' });

	await browser.close();

	// debugger
})();
