const puppeteer = require('puppeteer');

(async () => {
	// it opens like a browser and then screenshots
	const browser = await puppeteer.launch({
		headless: false,
		// devtools: true
	});
	// const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://instagram.com');
    // username
    const usernameSel = '#loginForm > div > div:nth-child(1) > div > label > input'
    const passwordSel = '#loginForm > div > div:nth-child(2) > div > label > input'
    const loginBtn = '#loginForm > div > div:nth-child(3) > button'
    await page.waitForSelector(loginBtn)
    await page.type(usernameSel, 'ikeif', { delay: 110 })
    await page.type(passwordSel, 'nazt33', { delay: 100 })
    await page.click(loginBtn)
	await page.waitForNavigation();
    // maybe there is a "save login info"?
    const saveLoginDecline = '#react-root > div > div > section > main > div > div > div > div > button'
    await page.waitForSelector()

	await page.screenshot({ path: 'instagram.png' });

	debugger
	// await browser.close();

})();
