const request = require('request-promise').defaults({
    proxy: 'http://191.37.227.128:8080'
    // Format:  http://username:password@ip:port
});

(async () => {
    let response = await request('https://httpbin.org/ip');

    console.log(response);
})();