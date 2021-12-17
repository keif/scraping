const puppeteer = require('puppeteer');

const BASE_URL = 'https://twitter.com';
const HOME_URL = `${BASE_URL}/home`;
const LOGIN_URL = `${BASE_URL}/login`;
const getUserUrl = (username) => `${BASE_URL}/${username}`;

let browser = null
let page = null

const delay = () => Math.random() * 1000 || 501
const KEYBOARD_DELAY = 50

const SELECTOR = {
    loginInput: '[autocomplete="username"]',
    nextBtn: '#layers > div:nth-child(2) > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div > div.css-1dbjc4n.r-kemksi.r-6koalj.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1dqxon3 > div > div:nth-child(6)',
    passwordInput: '[autocomplete="current-password"]',
    loginBtn: '#layers > div:nth-child(2) > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div > div.css-1dbjc4n.r-kemksi.r-6koalj.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div.css-1dbjc4n.r-hhvx09.r-1dye5f7.r-ttdzmv > div > div',
    tweetBox: '.public-DraftStyleDefault-block',
    tweetAction: '#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-kemksi.r-1kqtdi0.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div.css-1dbjc4n.r-kemksi.r-184en5c > div > div.css-1dbjc4n.r-kemksi.r-oyd9sg > div:nth-child(1) > div > div > div > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-1h8ys4a.r-1bylmt5.r-13tjlyg.r-7qyjyx.r-1ftll1t > div:nth-child(3) > div > div > div:nth-child(2) > div.css-18t94o4.css-1dbjc4n.r-l5o3uw.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-19u6a5r.r-2yi16.r-1qi8awa.r-1ny4l3l.r-ymttw5.r-o7ynqc.r-6416eg.r-lrvibr',
    userName: '[data-testid="UserName"] span',
    userDesc: '[data-testid="UserDescription"]',
    userFollowers: '[href="/udemy/followers"]',
    userFollowing: '[href="/udemy/following"]',
    userLocation: '[data-testid="UserLocation"]',
    userUrl: '[data-testid="UserUrl"]',
    joinDate: '[data-testid="UserUrl"] + span',
    verified: '[data-testid="UserName"] [aria-label="Verified account"]',
    timeline: '[aria-label^="Timeline"]',
    timelineTweets: '[aria-label^="Timeline"] [data-testid="tweet"]',
    tweet: '[lang]',
    tweetDate: '[datetime]',
    tweetReplies: '[data-testid="reply"]',
    tweetRetweets: '[data-testid="retweet"]',
    tweetLikes: '[data-testid="like"]',
}

const XPATH = {
    nextBtn: '//span[text()="Next"]',
    loginBtn: '//span[text()="Log in"]',
}

const twitter = {
    init: async () => {
        browser = await puppeteer.launch({
            headless: false
        });
        page = await browser.newPage();

        await page.goto(BASE_URL);
    },

    login: async (username, password) => {
        if (page === null) {
            return
        }

        await page.goto(LOGIN_URL);

        await page.waitForNavigation({waitUntil: "domcontentloaded"});
        // await page.waitForSelector(SELECTOR.loginInput)
        await page.waitForXPath(XPATH.nextBtn)
        await page.type(SELECTOR.loginInput, username, {delay: KEYBOARD_DELAY})

        const nextBtn = await page.$x(XPATH.nextBtn)
        nextBtn[0].click()
        // await page.click(SELECTOR.nextBtn)

        await page.waitForSelector(SELECTOR.passwordInput)
        await page.type(SELECTOR.passwordInput, password, {delay: KEYBOARD_DELAY});

        const loginBtn = await page.$x(XPATH.loginBtn)
        loginBtn[0].click()
        // await page.click(SELECTOR.loginBtn);

        await page.waitForNavigation({waitUntil: "domcontentloaded"});
        await page.waitForSelector(SELECTOR.tweetBox)
        await page.waitForTimeout(delay())
    },

    end: async () => {
        await browser.close()
    },

    verifyUrl: async (desiredUrl) => {
        const currUrl = await page.url()

        if (currUrl !== desiredUrl) {
            await page.goto(desiredUrl);
        }
    },

    tweet: async (message) => {
        await twitter.verifyUrl(HOME_URL)

        await page.waitForNavigation({waitUntil: "domcontentloaded"});
        await page.waitForSelector(SELECTOR.tweetBox)
        await page.click(SELECTOR.tweetBox)
        // human delay
        await page.waitForTimeout(delay())
        await page.keyboard.type(message, { delay: KEYBOARD_DELAY })

        await page.click(SELECTOR.tweetAction)
    },

    getUser: async (username) => {
        const userUrl = getUserUrl(username)
        await twitter.verifyUrl(userUrl)

        await page.waitForSelector(SELECTOR.userName)

        return await page.evaluate((SELECTOR) => {
            const userName = document.querySelector(SELECTOR.userName)
            const userDesc = document.querySelector(SELECTOR.userDesc)
            const followerCount = document.querySelector(SELECTOR.userFollowers)
            const followingCount = document.querySelector(SELECTOR.userFollowing)
            const location = document.querySelector(SELECTOR.userLocation)
            const url = document.querySelector(SELECTOR.userUrl)
            const joinDate = document.querySelector(SELECTOR.joinDate)
            const verified = document.querySelector(SELECTOR.verified)

            return {
                name: userName ? userName.innerText : null,
                description: userDesc ? userDesc.innerText : null,
                followerCount: followerCount ? followerCount.innerText : null,
                followingsCount: followingCount ? followingCount.innerText : null,
                location: location ? location.innerText.trim() : null,
                url: url ? url.getAttribute('href') : null,
                joinDate: joinDate ? joinDate.innerText : null,
                isVerified: !!verified
            }
        }, SELECTOR)
    },

    getTweets: async (username, count = 10) => {
        const userUrl = getUserUrl(username)
        await twitter.verifyUrl(userUrl)

        await page.waitForSelector(SELECTOR.timelineTweets);

        let tweets = []
        let tweetsArray = await page.$$(SELECTOR.timelineTweets);
        let lastTweetsArrayLength = 0;

        while(tweetsArray.length < count) {
            await page.evaluate(`window.scrollTo(0, document.body.scrollHeight)`)
            await page.waitForTimeout(3000)

            tweetsArray = await page.$$(SELECTOR.timelineTweets)

            if (lastTweetsArrayLength >= tweetsArray.length) break;

            lastTweetsArrayLength = tweetsArray.length;
        }

        for(let tweetElement of tweetsArray) {

            const tweet = await tweetElement.$eval(SELECTOR.tweet, elem => elem.innerText);
            const postedDate = await tweetElement.$eval(SELECTOR.tweetDate, elem => elem.getAttribute('datetime'));
            const repliesCount = await tweetElement.$eval(SELECTOR.tweetReplies, element => element.innerText);
            const retweetsCount = await tweetElement.$eval(SELECTOR.tweetRetweets, element => element.innerText);
            const likesCount = await tweetElement.$eval(SELECTOR.tweetLikes, element => element.innerText);

            tweets.push({ tweet, postedDate, repliesCount, retweetsCount, likesCount });
        }

        tweets = tweets.slice(0, count);
        console.log(tweets)
        debugger;
    },
}

module.exports = twitter