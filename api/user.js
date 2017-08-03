const helper = require(__dirname + '/../bin/helper.js');

let cfg = null,
	db = null;
let api = {};

api.getUserList = () => {
	return new Promise((resolve, reject) => {
		db.collection('users').find({}, {login: 1, email: 1}).toArray((e, r) => {
			if (e) return reject(e);

			resolve(r)
		});
	});
};

api.getAuth = (opts) => {
	return new Promise((resolve, reject) => {
		if (! opts.login) return reject('Wrong data');

		db.collection('users').findOne({login: opts.login.trim()}, (e, r) => {
			if (e) return reject(e);
			if (! r) return reject(new Error('User not found'));
			resolve(r)
		});
	});
};

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