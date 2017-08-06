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