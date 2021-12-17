const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
const { resolve } = require('path');
const { rejects } = require('assert');

const URLS = [
    'https://www.imdb.com/title/tt0102926/?ref_=nv_sr_1',
    'https://www.imdb.com/title/tt2267998/?ref_=nv_sr_1'
];

(async () => {
    let moviesData = [];

    for(const movie of URLS) {
        const response = await request({
                uri: movie,
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
                    'Cache-Control': 'max-age=0',
                    'Connection': 'keep-alive',
                    'Host': 'www.imdb.com',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
                },
                gzip: true
            }
        );

        const $ = cheerio.load(response);

		const title = $('div[class^="TitleBlock__Container"] h1').text().trim();
		const rating = $('span[class^="AggregateRatingButton__RatingScore"]').text();
		const poster = $('.ipc-image').attr('src')
        const totalRatings = $('div[class^="AggregateRatingButton__TotalRatingAmount"]').text();
        const releaseDate = $('a[title="See more release dates"]').text().trim();
        const popularity = $('[class^="TrendingButton__TrendingScore"]').text().trim();
		let genres = []

        $('[class*="GenresAndPlot__GenresChipList"] a').each((idx, elem) => {
			genres = [...genres, $(elem).text()]
		});

        moviesData.push({
            title,
            rating,
            poster,
            totalRatings,
            releaseDate,
            genres
        });

		let file = fs.createWriteStream(`${response.id}.jpg`)
		let stream = request({
			uri: poster,
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
				'Cache-Control': 'max-age=0',
				'Connection': 'keep-alive',
				'Upgrade-Insecure-Requests': '1',
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
			},
			gzip: true
		})
		.pipe(file)
		.on(`finish`, () => {
			console.log(`finished downloading image`)
			resolve()
		})
		.on(`error`, (err) => {
			reject(err)
		})
    }

    const json2csvParser = new Json2csvParser();
    const csv = json2csvParser.parse(moviesData);

    fs.writeFileSync('./data.csv', csv, 'utf-8');
    console.log(csv);

})()