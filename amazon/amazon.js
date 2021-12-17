const puppeteer = require('puppeteer');

let browser = null;
let page = null;

const BASE_URL = 'https://amazon.com/';
const SELECTOR = {
	productTitle: '#productTitle',
	manufacturer: '#bylineInfo',
	currentPrice: '#corePrice_desktop .a-offscreen',
	rating: '#acrPopover',
	totalRatings: '#acrCustomerReviewText',
}

const amazon = {
    init: async () => {
        console.log('Starting the scraper...')

        browser = await puppeteer.launch({
            headless: false
        })

        page = await browser.newPage()
        page.on('console', message => {
            console.log(`Message from puppeteer: ${message.text()}`)
        })

        await page.goto(BASE_URL, { waitUntil: 'networkidle2' })

        console.log('Initialization completed..')
    },

    getProductDetails: async (link) => {
        console.log(`Going to the Product Page: ( ${link} )`);

        await page.goto(link, { waitUntil: 'networkidle2' });

		return await page.evaluate((SELECTOR) => {
			const titleEl = document.querySelector(SELECTOR.productTitle)
            const manufacturerEl = document.querySelector(SELECTOR.manufacturer)
            const currentPriceEl = document.querySelector(SELECTOR.currentPrice)
            const ratingEl = document.querySelector(SELECTOR.rating)
            const totalRatingsEl = document.querySelector(SELECTOR.totalRatings)

			const title = titleEl ? titleEl.innerText : null
            const manufacturer = manufacturerEl ? manufacturerEl.innerText : null
            const currentPrice = currentPriceEl ? currentPriceEl.innerText : null
            const rating = ratingEl ? ratingEl.getAttribute('title') : null
            const totalRatings = totalRatingsEl ? totalRatingsEl.innerText : null

            return {
                title,
                manufacturer,
                currentPrice,
                rating,
                totalRatings
            }

        }, SELECTOR);
    },

	end: async () => {
        console.log('Stopping the scraper..')

        await browser.close()
    }
}

module.exports = amazon;