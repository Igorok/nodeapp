const moment = require('moment');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const cfgFile = 'config.js';
let cfg = null,
	db = null;

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
				console.log(e);
			});
		}
	});
	return arr.reduce((p, f) => p.then(f), Promise.resolve())
		.then(() => {
			cfg = _.merge.apply(null, cfgArr);
			return cfg;
		}).catch((e) => {
			console.trace(e);
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
			console.trace(e);
		});;

		
		let url = `mongodb://${r.mongo.host}:${r.mongo.port}/${r.mongo.db}`;
};

module.exports.getConfig = getConfig;
module.exports.getMongo = getMongo;