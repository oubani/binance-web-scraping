const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

// initial app with expres
const app = express();

app.get('/', (req, res) => {
	request('https://www.binance.com/en/news', (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);

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

app.post('/login', (req, res) => {
	res.send('login from express');
});

app.post('/register', (req, res) => {
	res.send('res from express');
});

app.post('/logout', (req, res) => {
	res.send('hello from express');
});

app.listen(3000, () => {
	console.log(`server running in 5000`);
});
