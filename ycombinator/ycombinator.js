const Nightmare = require('nightmare')

let nightmare = null;

const ycombinator = {

	initialize: async () => {
		nightmare = Nightmare({
			show: true
		});
	},

	getArticles: async (limit = 30) => {
		await nightmare.goto('https://news.ycombinator.com/news');

		let articles = [];
		let isPagination = null;

		do {
			const new_articles = await nightmare.evaluate(() => {
				const tableRows = document.querySelectorAll('table[class="itemlist"] > tbody > tr');
				let articles = [];

				for(let row of tableRows) {

					if(row.getAttribute('class') == 'spacer') continue;

					if(row.getAttribute('class') == 'athing') {
						const anchor = row.querySelector('td[class="title"] > a')
						const sourceAnchor = row.querySelector('span[class="sitebit comhead"] > a')

						const title = anchor.innerText;
						const url = anchor.getAttribute('href');
						const source = sourceAnchor ? sourceAnchor.innerText : false;

						const secondRow = row.nextSibling;
						const score = secondRow.querySelector('span[class="score"]')
						const hnUser = secondRow.querySelector('a[class="hnuser"]')
						const postAge = secondRow.querySelector('span[class="age"]')
						const commentsArr = secondRow.querySelectorAll('a')[3]

						const points = score ? score.innerText : false;
						const author = hnUser ? hnUser.innerText : false;
						const date = postAge ? postAge.innerText : false;
						const comments = commentsArr ? commentsArr.innerText : false;

						articles.push({ title, url, source, points, author, date, comments });

					}
				}

				return articles;

			});

			articles = [
				...articles,
				...new_articles
			];

			isPagination = await nightmare.exists('a[class="morelink"]');

			if (isPagination && articles.length < limit) {
				await nightmare.click('a[class="morelink"]');
				await nightmare.wait('table[class="itemlist"]')
			}
		} while(articles.length < limit && isPagination);

		return articles.splice(0, limit);
	}
}

module.exports = ycombinator;