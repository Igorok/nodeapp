const _ = require('lodash');
const moment = require('moment');

const helper = require(__dirname + '/../bin/helper.js');

let cfg = null,
	db = null,
	api = {},
	apiChat = {};

apiChat.getChatList = (opts) => {
	let user = null,
		chatArr = [],
		userById = {};

	return api.user.checkAuth(opts)
	.then((u) => {
		user = u;
		
		return new Promise ((resolve, reject) => {
			db.collection('chatgroups').find({'users._id': user._id}).toArray((e, r) => {
				if (e) return reject(e);
				chatArr = r;
				resolve();
			});
		});
	})
	.then(() => {
		let userIds = [];
		_.forEach(chatArr, (val) => {
			_.forEach(val.users, (u) => {
				userIds.push(u._id);
			});
		});
		userIds = _.uniq(userIds);
		if (! chatArr.length) return;
		
		return new Promise ((resolve, reject) => {
			db.collection('users').find({_id: {$in: userIds}}, {login: 1, dtActive: 1}).toArray((e, r) => {
				if (e) return reject(e);
				userById = r.reduce((obj, val) => {
					obj[val._id] = {
						_id: val._id,
						login: val.login,
						online: api.user.checkOnline(val.dtActive),
					};
					return obj;
				}, {});
				resolve();
			});
		});
	})
	.then(() => {
		if (! chatArr.length) return;

		chatArr = chatArr.map((val) => {
			let item = {
				type: val.type,
				users: [],
			};

			if (val.type === 'personal') {
				_.forEach(val.users, (u) => {
					if (user._id.toString() != u._id.toString()) {
						item._id = u._id;
						return false;
					}
				});
			} else {
				item._id = val._id;
			}

			val.users.forEach((u) => {
				if (
					user._id.toString() !== u._id.toString() && 
					userById[u._id.toString()]
				) {
					item.users.push(userById[u._id.toString()]);
				}
			});

			return item;
		});

		return chatArr;
	});
};



apiChat.joinPersonal = (opts) => {
	if (! opts.userId) {
		return Promise.reject(new Error('The user not found'));
	}
	let user = null,
		chatGr = null,
		loginById = {},
		result = {
			users: [],
			messages: [],
		};

	return api.user.checkAuth(opts)
	// get chat group
	.then((u) => {
		user = u;
		let q = {
			type: 'personal',
			$and: [
				{'users._id': user._id},
				{'users._id': helper.mongoId(opts.userId)},
			],
		};
		return new Promise ((resolve, reject) => {
			db.collection('chatgroups').findOne(q, (e, r) => {
				if (e) return reject(e);
				if (r) chatGr = r;
				resolve();
			});
		});
	})
	// insert group if not exists
	.then(() => {
		if (chatGr) return;

		let gr = {
			users: [
				{_id: user._id},
				{_id: helper.mongoId(opts.userId)},
			],
			creator: user._id,
			date: new Date(),
			type: 'personal',
		};
		return new Promise ((resolve, reject) => {
			db.collection('chatgroups').insertOne(gr, (e, r) => {
				if (e) return reject(e);
				chatGr = r.ops[0];

				resolve();
			});
		});
	})
	// get users
	.then(() => {
		result.roomId = chatGr._id.toString();
		let uIds = chatGr.users.map((u) => {
			return u._id;
		});
		return new Promise ((resolve, reject) => {
			db.collection('users').find({_id: {$in: uIds}}, {login: 1, dtActive: 1}).toArray((e, r) => {
				if (e) return reject(e);

				_.forEach(r, (u) => {
					loginById[u._id] = u.login;
					result.users.push({
						_id: u._id,
						login: u.login,
						online: api.user.checkOnline(u.dtActive),
					});
				});

				resolve();
			});
		});
	})
	// get messages
	.then(() => {
		return new Promise ((resolve, reject) => {
			let q = {
				rId: chatGr._id
			};
			db.collection('chatmessages').find(q, {limit: 100}).toArray((e, r) => {
				if (e) return reject(e);

				result.messages = _.map(r, (msg) => {
					msg.login = loginById[msg.uId];
					msg.fDate = moment(msg.date).format('YYYY-MM-DD HH:mm');
					return msg
				});

				resolve(result);
			});
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
		return helper.getApi(['user']);
	}).then((r) => {
		api = r;
		return apiChat;
	})
}

module.exports.init = init;