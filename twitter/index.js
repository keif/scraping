const puppeteer = require('puppeteer');
const twitter = require('./twitter');

(async () => {
	const USERNAME = 'ikeif';
	const PASSWORD = 'l05J5OXE&1Ew';

	const twitterUser = `udemy`
	const numOfTweets = 50

	await twitter.init()

	// await twitter.login(USERNAME, PASSWORD)

	// const details = await twitter.getUser(`udemy`)

	await twitter.getTweets(twitterUser, numOfTweets);
	// await twitter.tweet(`Hello world, this is a test message`)

	debugger;

	// twitter.end();
})();