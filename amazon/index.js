const amazon = require('./amazon');

(async () => {
	const PROD_URL = 'https://www.amazon.com/Thule-Crossover-32L-Backpack-Black/dp/B004XANKVO'

	await amazon.init();

	const details = await amazon.getProductDetails(PROD_URL);

	console.log(details)
	debugger;
})();