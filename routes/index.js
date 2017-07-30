let user = require(__dirname + '/../api/user.js');
let express = require('express');
let router = express.Router();

let api = {};

let init = () => {
	return user.init()
		.then((r) => {
			api.user = r;
		})
		.then(() => {
			router.get('/', function(req, res, next) {
				console.log('get ');

				res.render('index', { title: 'Express' });
			});

			router.post('/fetch', (req, res, next) => {
				console.log('req.body ', req.body);
				api.user.getUserList()
					.then((r) => {
						return res.json(r);
					});
			});
		})
		.then(() => {
			console.log('api ', api);
			return router;
		})
		.catch((e) => {
			console.trace(e);
		});

	



};


module.exports = init;
