let helper = require(__dirname + '/../bin/helper.js');
let express = require('express');
let router = express.Router();

let api = {};

let init = () => {
	return helper.getApi(['user', 'chat', 'blog'])
		.then((r) => {
			api = r;
		})
		.then(() => {
			router.get('*', function(req, res, next) {
				console.log('/');
				res.render('index', { title: 'Express' });
			});

			router.post('/fetch', (req, res, next) => {
				if (
					! req.body.fetch ||
					! req.body.fetch.length
				) {
					return res.status(404).send('Api not found');
				}

				let fetch = req.body.fetch.split('.');
				let a = fetch[0];
				let f = fetch[1];
				if (
					! a ||
					! f ||
					! api[a] ||
					! api[a][f]
				) {
					return res.status(404).send('Api not found');
				}

				delete req.body.fetch;
				api[a][f](req.body)
					.then((r) => {
						return res.json(r);
					})
					.catch(e => {
						let status = 500;
						if (e === 403) status = 403;
						console.trace('rout error', e);

						 res.status(status).send(e);
					});
			});
		})
		.then(() => {
			return router;
		})
		.catch((e) => {
			console.trace(e);
		});

	



};


module.exports = init;
