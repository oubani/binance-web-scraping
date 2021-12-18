const http = require('http');
const request = require('request');
const cheerio = require('cheerio');

const hostName = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	request('https://www.binance.com/en/news', (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);
			const news = $('.css-1i9bvdl');

			var titles = [];

			$('.css-1i9bvdl a').each((i, el) => {
				const title = $(el).children().children().find('.css-yvdj0q').text();
				const date = $(el)
					.children()
					.children()
					.children()
					.find('.css-9cwl6c')
					.text();
				const description = $(el)
					.children()
					.children()
					.find('.css-15z93by')
					.text();
				const img = $(el).children().children().find('img').attr('src');
				const link = $(el).attr('href');
				titles = [...titles, { title, link, img, description, date }];
			});
			const newArr = titles.filter(
				(v, i, a) =>
					a.findIndex((t) => t.link === v.link && t.title === v.title) === i,
			);
			console.log(newArr.length);
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(
				JSON.stringify({
					success: true,
					news: newArr,
				}),
			);
		}
		// npm install --save-dev nodemon
		// 'start' :nodemon scrape
	});
});

server.listen(port, hostName, () => {
	console.log(`Server running at http://${hostName}:${port}/`);
});
