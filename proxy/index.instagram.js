const request = require('request-promise');
const cheerio = require('cheerio');

(async () => {
    const USERNAME = `ikeif`
    const BASE_URL = `https://www.instagram.com/${USERNAME}/`

    const response = await request(BASE_URL)

    const $ = cheerio.load(response)

    // get the CSRF JSON
    const script = $('script[type="text/javascript"]').eq(3).html()
    const scriptRegex = /window._sharedData = (.+);/g.exec(script)
    const { entry_data } = JSON.parse(scriptRegex[1])

    console.log(JSON.parse(scriptRegex[1]));
    console.log(entry_data)

    // object.entry_data.ProfilePage[0].graphql.user
    debugger;

})();