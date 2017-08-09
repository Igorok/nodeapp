const helper = require(__dirname + '/../bin/helper.js');
const _ = require('lodash');
const moment = require('moment');

let cfg = null,
	db = null,
	apiBlog = {},
	api = {};

apiBlog.getBlogList = (opts) => {
	let blogArr = [],
		userArr = [];
	return new Promise((resolve, reject) => {
		db.collection('blogs').find({public: true}).toArray((e, r) => {
			if (e) return reject(e);
			blogArr = r;
			resolve();
		});
	})
	.then(() => {
		if (! blogArr.length) return Promise.resolve();

		let userIds = blogArr.map((val) => {
			return val.uId;
		});

		return new Promise((resolve, reject) => {
			db.collection('users').find({_id: {$in: userIds}}, {login: 1}).toArray((e, r) => {
				if (e) return reject(e);
				userArr = r;
				resolve();
			});
		});
	})
	.then(() => {
		if (! blogArr.length) return Promise.resolve(blogArr);

		let loginById = userArr.reduce((obj, val) => {
			obj[val._id.toString()] = val.login;
			return obj;
		}, {});

		blogArr = blogArr.map((val) => {
			val.user = loginById[val.uId.toString()] || null;
			val.created = moment(val.created).format('YYYY-MM-DD HH:mm');
			delete val.uId;
			delete val.public;

			return val;
		});

		return blogArr;
	});
}

apiBlog.getBlogDetail = (opts) => {
	let blog = null;
	if (! opts._id) {
		return Promise.reject('The blog not found');
	}
	opts._id = helper.mongoId(opts._id.toString());

	return new Promise((resolve, reject) => {
		db.collection('blogs').findOne({_id: opts._id}, (e, r) => {
			if (e) return reject(e);
			if (! r) return reject('The blog not found');
			blog = r;
			resolve();
		});
	})
	.then(() => {
		return new Promise((resolve, reject) => {
			db.collection('users').findOne({_id: blog.uId}, {login: 1}, (e, r) => {
				if (e) return reject(e);
				blog.user = r ?  r.login : 'unknown';
				blog.created = moment(blog.created).format('YYYY-MM-DD HH:mm');
				delete blog.uId;
				delete blog.public;
				resolve();
			});
		});
	})
	.then(() => {
		return blog;
	});
};

apiBlog.getBlogPosts = (opts) => {
	let posts = [],
		users = [];
	if (! opts._id) {
		return Promise.reject('The blog not found');
	}
	opts._id = helper.mongoId(opts._id.toString());

	return new Promise((resolve, reject) => {
		let q = {
			_bId: opts._id,
			approved: 1,
			status: "publish",
		};
		let rows = {
			_id: 1,
			name: 1,
			description: 1,
			uId: 1,
			created: 1,
		};
		db.collection('posts').find(q, rows).toArray((e, r) => {
			if (e) return reject(e);
			if (r && r.length) {
				posts = r;
			}
			resolve();
		});
	})
	.then(() => {
		if (! posts.length) return;
		let userIds = posts.map((val) => {
			return val.uId;
		});
		return new Promise((resolve, reject) => {
			db.collection('users').find({_id: {$in: userIds}}, {login: 1}).toArray((e, r) => {
				if (e) return reject(e);
				users = r;
				resolve();
			});
		});
	})
	.then(() => {
		if (! posts.length) return posts;

		let loginById = users.reduce((obj, user) => {
			obj[user._id] = user.login;
			return obj;
		}, {});
		posts = posts.map((val) => {
			val.user = loginById[val.uId];
			val.created = moment(val.created).format('YYYY-MM-DD HH:mm');
			val.description = val.description.substring(0, 140) + '...';
			delete val.uId;
			return val;
		});
		return posts;
	});
}

let init = () => {
	return helper.getConfig()
		.then((r) => {
			cfg = r;
			return helper.getMongo();
		})
		.then((r) => {
			db = r;
			return helper.getApi(['user']);
		}).then((r) => {
			api = r;
			return apiBlog;
		})
}










module.exports.init = init;