const fs = require('fs');
const got = require('got');
const cheerio = require('cheerio');
const path = require('path');
const slugify = require('slugify');

(async () => {
	const treeList = [];
	let token = '';
	async function login() {
		const loginTxt = fs.readFileSync('./login.txt', 'utf8');
		const lines = loginTxt.split('\r\n');
		const {body} = await got.post('https://api.tuk.dev/api/user/login', {
			json: {"email": lines[0] ,"password": lines[1]},
			responseType: 'json'
		});

		token = body.token;

		fs.writeFileSync('./token.txt', body.token, 'utf8');
	}

	try {
		await login();
		console.log('Login successful!');
	} catch (e) {
		console.log('Login failed', e);
	}
})()