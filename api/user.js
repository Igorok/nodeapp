const helper = require(__dirname + '/../bin/helper.js');
const crypto = require('crypto');
const _ = require('lodash');
const moment = require('moment');

let cfg = null,
	db = null,
	api = {};

api.getUserList = (opts) => {
	return api.checkAuth(opts)
		.then((user) => {
			return new Promise((resolve, reject) => {
				db.collection('users').find({status: 1}, {login: 1, email: 1}).toArray((e, r) => {
					if (e) return reject(e);

					resolve(r)
				});
			});
		});
};

api.getAuth = (opts) => {
	if (! opts.login || ! opts.password) {
		return Promise.reject('Wrong data');
	}
	let user = null;
	let hash = crypto.createHash('sha1');
	hash = hash.update(opts.password).digest('hex');
	let device = opts.dev ? opts.dev.toString().trim() : 'web';

	return new Promise((resolve, reject) => {
		let q = {
			login: opts.login.trim(),
			password: hash,
			status: 1,
		};
		db.collection('users').findOne(q, (e, r) => {
			if (e) return reject(e);
			if (! r) return reject(new Error('User not found'));
			user = r;
			resolve();
		});
	})
	.then((r) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (e, buf) => {
				if (e) return reject(e);
				user.token = buf.toString('hex');
				resolve();
			});
		});
	})
	.then((r) => {
		return new Promise((resolve, reject) => {
			let tokens = {};
			if (user.tokens) {
				tokens = _.keyBy(user.tokens, 'dev');
			}
			tokens[device] = {
				token: user.token,
				dev: device,
				dtExpire: moment().add(cfg.app.expireTokenDay, 'days').toDate(),
			};

			let q = {
				_id: user._id,
			};
			let s = {
				$set: {
					tokens: _.toArray(tokens),
					dtActive: new Date(),
				},
			};
			db.collection('users').update(q, s, (e) => {
				if (e) return reject(e);
				resolve();
			});
		});
	})
	.then(() => {
		return {
			_id: user._id.toString(),
			login: user.login,
			token: user.token,
		};
	});
};

api.checkAuth = (opts) => {
	if (! opts.token) {
		return Promise.reject('Wrong data');
	}
	let user = null,
		device = opts.dev ? opts.dev.toString() : 'web';
	opts.token = opts.token.toString();

	return new Promise((resolve, reject) => {
		let q = {
			"tokens.token": opts.token,
		};
		db.collection('users').findOne(q, (e, u) => {
			if (e) return reject(e);
			if (! u) return reject(403);

			user = u;
			resolve();
		});
	})
	.then(() => {
		return new Promise((resolve, reject) => {
			let devToken = _.find(user.tokens, function (val) {
				return device == val.dev;
			});

			if (Date.now() > devToken.dtExpire.valueOf()) {
				return resolve(403);
			}

			let q = {_id: user._id};
			let s = {$set: {
				dtActive: new Date(),
			}};
			db.collection('users').update(q, s, (e) => {
				if (e) return reject(e);
				resolve(user);
			});
		});
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
			return api;
		})
}

module.exports.init = init;