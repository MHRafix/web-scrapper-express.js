const PORT = 8080;
const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');

const app = express();

const url = 'https://www.theguardian.com/uk';

axios(url)
	.then((res) => {
		const html = res.data;
		const $ = cheerio.load(html);
		const articles = [];

		$('.fc-item__title', html).each(function () {
			const title = $(this).text();
			const url = $(this).find('a').attr('href');
			articles.push(title, url);
		});

		console.log(articles);
	})
	.catch((err) => console.log(err));

app.listen(PORT, () => console.log('Server is running on port', PORT));
