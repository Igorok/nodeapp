const moment = require('moment');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const mongodb = require('mongodb');


const cfgFile = 'config.js';
let cfg = null,
	db = null
	api = {};

let getConfig = () => {
	if (cfg) return Promise.resolve(cfg);

	let arr = [cfgFile, 'local-' + cfgFile];
	let cfgArr = [];
	arr = arr.map((f) => {
		return () => {
			f = path.resolve(__dirname + '/../' + f);
			return new Promise((resolve, reject) => {
				fs.stat(f, (e, s) => {
					if (e) return reject(e);
					resolve();
				});
			})
			.then((s) => {
				let cfg = require(f);
				cfgArr.push(cfg);
			})
			.catch((e) => {
				console.trace(e);
			});
		}
	});
	return arr.reduce((p, f) => p.then(f), Promise.resolve())
		.then(() => {
			cfg = _.merge.apply(null, cfgArr);
			if (process.env.MONGOHOST) {
				cfg.mongo.auth = true;
				cfg.mongo.host = process.env.MONGOHOST.toString();
				cfg.mongo.port = parseInt(process.env.MONGOPORT);
				cfg.mongo.user = process.env.MONGOUSER.toString();
				cfg.mongo.password = process.env.MONGOPASSWORD.toString();
			}
			
			return cfg;
		}).catch((e) => {
			criticalError(e);
		});
};

let getMongo = () => {
	if (db) return Promise.resolve(db);

	return getConfig()
		.then((r) => {
			return new Promise((resolve, reject) => {
				let url = 'mongodb://';
				if (r.mongo.user) {
					url += r.mongo.user + ':' + r.mongo.password + '@';
				}
				url += r.mongo.host + ':' + r.mongo.port + '/' + r.mongo.db;

				mongodb.MongoClient.connect(url, (e, _db) => {
					if (e) return reject(e);
					console.log('mongo connected ', url);

					db = _db;
					resolve();
				});
			});
		})
		.catch((e) => {
			criticalError(e);
		});
};

let getApi = (arr) => {
	arr = arr.map((name) => {
		return () => {
			if (api[name]) return Promise.resolve();

			let apiPath = path.resolve(__dirname + '/../api/' + name + '.js');
			let apiCode = require(apiPath);
			return apiCode
				.init()
				.then((apiInitialized) => {
					api[name] = apiInitialized;
					return;
				});
		} 
	});
	return arr.reduce((p, f) => p.then(f), Promise.resolve())
		.then(() => {
			return api;
		}).catch((e) => {
			criticalError(e);
		});
}

let criticalError = (e) => {
	console.trace(e);
	process.exit(1);
}


let mongoId = (_id) => {
	if (! _id) return null;	
	return mongodb.ObjectID(_id);
}
let newMongoId = () => {
	return new mongodb.ObjectID();
}

// exports
module.exports.getConfig = getConfig;
module.exports.getMongo = getMongo;
module.exports.criticalError = criticalError;
module.exports.getApi = getApi;
module.exports.mongoId = mongoId;
module.exports.newMongoId = newMongoId;