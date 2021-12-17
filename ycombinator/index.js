const ycombinator = require('./ycombinator');

(async () => {
  await ycombinator.initialize();

  let articles = await ycombinator.getArticles(65);

  console.log(articles);

  debugger;


})();

