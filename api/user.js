const helper = require(__dirname + '/../bin/helper.js');

let cfg = null,
	db = null;
let api = {};

api.getUserList = () => {
	return new Promise((resolve, reject) => {
		db.collection('users').find({}, {login: 1, password: 1}).toArray((e, r) => {
			if (e) return reject(e);

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