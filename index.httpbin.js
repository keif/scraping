const request = require('request-promise');
request.debug = 1;

(async () => {

    console.log('Initial Request');

    try {
    let status = await request({
        uri: 'https://httpbin.org/status/350',
        resolveWithFullResponse: true
    });
    } catch(response) {
        if(response.statusCode == 300) {
            console.log('Everyhing is ok');
        } else {
            console.log(`Something happened: ${response}`);
            process.exit(1);
        }
    }

})();