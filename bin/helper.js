const moment = require('moment');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

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
				criticalError(e);
			});
		}
	});
	return arr.reduce((p, f) => p.then(f), Promise.resolve())
		.then(() => {
			cfg = _.merge.apply(null, cfgArr);
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
				let url = `mongodb://${r.mongo.host}:${r.mongo.port}/${r.mongo.db}`;
				MongoClient.connect(url, (e, _db) => {
					if (e) return reject(e);
					
					db = _db;
					resolve(db);
				});
			});
		})
		.catch((e) => {
			criticalError(e);
		});;

		
		let url = `mongodb://${r.mongo.host}:${r.mongo.port}/${r.mongo.db}`;
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

// exports
module.exports.getConfig = getConfig;
module.exports.getMongo = getMongo;
module.exports.criticalError = criticalError;
module.exports.getApi = getApi;