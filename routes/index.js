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
			router.get('/', function(req, res, next) {
				let opts = {
					javascript: ['about'],
					title: 'Express'
				};
				res.render('simple_view', opts);
			});
			router.get('/login', function(req, res, next) {
				let opts = {
					javascript: ['login'],
					title: 'Express'
				};
				res.render('simple_view', opts);
			});
			router.get('/profile', function(req, res, next) {
				let opts = {
					javascript: ['profile'],
					title: 'Express'
				};
				res.render('simple_view', opts);
			});
			router.get('/blog-list', function(req, res, next) {
				let opts = {
					javascript: ['blog_list'],
					title: 'Express'
				};
				res.render('simple_view', opts);
			});
			router.get('/blog-detail/:blogId', function(req, res, next) {
				let opts = {
					javascript: ['blog_detail'],
					variables: {blogId: req.params.blogId ? req.params.blogId.toString() : null},
					title: 'Express Blog'
				};
				res.render('simple_view', opts);
			});
			router.get('/post-detail/:postId', function(req, res, next) {
				let opts = {
					javascript: ['post_detail'],
					variables: {postId: req.params.postId ? req.params.postId.toString() : null},
					title: 'Express Post'
				};
				res.render('simple_view', opts);
			});

			router.get('/my-blog-list', function(req, res, next) {
				let opts = {
					javascript: ['my_blog_list'],
					title: 'Express'
				};
				res.render('simple_view', opts);
			});
			router.get('/my-blog-detail/:blogId', function(req, res, next) {
				let opts = {
					javascript: ['my_blog_detail'],
					variables: {blogId: req.params.blogId ? req.params.blogId.toString() : null},
					title: 'Express Post'
				};
				res.render('simple_view', opts);
			});
			router.get('/my-post-detail/:postId', function(req, res, next) {
				let opts = {
					javascript: ['my_post_detail'],
					variables: {postId: req.params.postId ? req.params.postId.toString() : null},
					title: 'Express Post'
				};
				res.render('simple_view', opts);
			});
			router.get('/user-list', function(req, res, next) {
				let opts = {
					javascript: ['user_list'],
					title: 'Express'
				};
				res.render('simple_view', opts);
			});
			router.get('/chat-list', function(req, res, next) {
				let opts = {
					javascript: ['chat_list'],
					title: 'Express'
				};
				res.render('simple_view', opts);
			});
			router.get('/chat-personal/:userId', function(req, res, next) {
				let opts = {
					javascript: ['chat_personal'],
					variables: {userId: req.params.userId ? req.params.userId.toString() : null},
					title: 'Express'
				};
				res.render('simple_view', opts);
			});




			router.post('/fetch', (req, res, next) => {
				if (
					! req.body.fetch ||
					! req.body.fetch.length
				) {
					return res.status(404).json('Api not found');
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
					return res.status(404).json('Api not found');
				}

				delete req.body.fetch;
				api[a][f](req.body)
					.then((r) => {
						return res.json(r || null);
					})
					.catch(e => {
						if (e.message) e = e.message;
						let status = 500;
						if (e === 403) status = 403;
						console.trace('error', a, f, e);

						 res.status(status).json(e);
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
