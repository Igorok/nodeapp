const _ = require('lodash');
const moment = require('moment');

const helper = require(__dirname + '/helper.js');

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
		var r = [];
		_.forEach(chatArr, (val) => {
			let item = {
				type: val.type,
				users: [],
			};

			if (val.type === 'personal') {
				_.forEach(val.users, (u) => {
					if (! u || ! u._id) {
						return;
					}
					if (user._id.toString() != u._id.toString()) {
						item._id = u._id;
						return false;
					}
				});
			} else {
				item._id = val._id;
				item.creator = (user._id.toString() === val.creator.toString())
			}
			if (! item._id) return;

			val.users.forEach((u) => {
				if (
					user._id.toString() !== u._id.toString() &&
					userById[u._id.toString()]
				) {
					item.users.push(userById[u._id.toString()]);
				}
			});

			r.push(item);
		});

		return r;
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
	.then((u) => {
		user = u;
		return new Promise ((resolve, reject) => {
			let secId = helper.mongoId(opts.userId);
			db.collection('users').findOne({_id: secId}, (e, r) => {
				if (e) return reject(e);
				if (! r) return reject(new Error('User not found!'));
				resolve();
			});
		});
	})
	// get chat group
	.then(() => {
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
				rId: chatGr._id,
				date: {
					$gte: moment().subtract(10, 'days').toDate()
				}
			};
			db.collection('chatmessages').find(q, {sort: {date: 1}, limit: 100}).toArray((e, r) => {
				if (e) return reject(e);

				result.messages = _.map(r, (msg) => {
					msg.login = loginById[msg.uId];
					msg.fDate = moment(msg.date).calendar();
					return msg
				});

				resolve(result);
			});
		});
	});
};

apiChat.message = function (opts) {
	if (! opts.rId) {
		return Promise.reject(new Error('Wrong data'));
	}
	if (! opts.msg || ! opts.msg.toString().length) {
		return Promise.resolve();
	}

	opts.rId = helper.mongoId(opts.rId);
	var user = null,
		msg = null;

	return api.user.checkAuth(opts)
	.then((u) => {
		user = u;
		// check room and access of user
		var q = {
			_id: opts.rId,
			'users._id': user._id,
		};
		return new Promise ((resolve, reject) => {
			db.collection('chatgroups').findOne(q, (e, r) => {
				if (e) return reject(e);
				if (! r) return reject(new Error('Chat not found'));
				resolve();
			});
		});
	})
	.then(() => {
		var insObj = {
			uId: helper.mongoId(user._id),
			rId: opts.rId,
			msg: _.escape(opts.msg),
			date: new Date(),
		};
		return new Promise ((resolve, reject) => {
			db.collection('chatmessages').insertOne(insObj, (e, r) => {
				if (e) return reject(e);
				msg = r.ops[0];
				resolve();
			});
		});
	})
	.then(() => {
		msg.login = user.login;
		msg.fDate = moment(msg.date).calendar();
		return msg;
	});
};


apiChat.addChatGroup = (opts) => {
	if (! opts.users || ! opts.users.length) {
		return Promise.reject(new Error('Wrong data'));
	}

	let groupObj = null,
		user = null;
	return api.user.checkAuth(opts)
	.then((u) => {
		user = u;
		opts.users.push(user._id);
		opts.users = _.map(opts.users, (_id) => {
			return {
				_id: helper.mongoId(_id)
			};
		});

		groupObj = {
			users: opts.users,
			creator: user._id,
			date: new Date(),
			type: 'group',
		};

		return new Promise ((resolve, reject) => {
			db.collection('chatgroups').insertOne(groupObj, (e, r) => {
				if (e) return reject(e);
				groupObj = r.ops[0];
				resolve();
			});
		});
	})
	.then(() => {
		let q = {
			_id: {$in: _.map(groupObj.users, (v) => {
				return v._id
			})}
		};

		return new Promise ((resolve, reject) => {
			db.collection('users').find(q, {login: 1, dtActive: 1}).toArray((e, r) => {
				if (e) return reject(e);
				let users = [];
				_.forEach(r, (v) => {
					if (v._id.toString() !== user._id.toString()) {
						users.push({
							_id: v._id,
							login: v.login,
							online: api.user.checkOnline(v.dtActive),
						})
					}
				});
				groupObj.users = users;
				resolve(groupObj);
			});
		});
	});
}

apiChat.editChatGroup = (opts, cb) => {
	if (! opts._id || ! opts.users || ! opts.users.length) {
		return Promise.reject(new Error('Wrong data'));
	}

	opts._id = helper.mongoId(opts._id);
	let user = null,
		groupObj = null;

	return api.user.checkAuth(opts)
	.then((u) => {
		user = u;
		return new Promise ((resolve, reject) => {
			let q = {
				_id: opts._id,
				creator: user._id,
			};
			db.collection('chatgroups').findOne(q, (e, r) => {
				if (e) return reject(e);
				if (! r) return reject(new Error('Chat group not found!'));
				groupObj = r;
				resolve();
			});
		});
	})
	.then(() => {
		opts.users.push(user._id);
		groupObj.users = _.map(opts.users, (_id) => {
			return {
				_id: helper.mongoId(_id)
			};
		});
		return new Promise ((resolve, reject) => {
			db.collection('chatgroups').updateOne({_id: groupObj._id}, {$set: {users: groupObj.users}}, (e, r) => {
				if (e) return reject(e);
				resolve();
			});
		});
	})
	.then(() => {
		let q = {
			_id: {$in: _.map(groupObj.users, (v) => {
				return v._id
			})}
		};

		return new Promise ((resolve, reject) => {
			db.collection('users').find(q, {login: 1, dtActive: 1}).toArray((e, r) => {
				if (e) return reject(e);
				let users = [];
				_.forEach(r, (v) => {
					if (v._id.toString() !== user._id.toString()) {
						users.push({
							_id: v._id,
							login: v.login,
							online: api.user.checkOnline(v.dtActive),
						})
					}
				});
				groupObj.users = users;
				resolve(groupObj);
			});
		});
	});
}


apiChat.joinGroup = (opts) => {
	if (! opts.roomId) {
		return Promise.reject(new Error('Chat not found'));
	}
	let roomId = helper.mongoId(opts.roomId),
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
		return new Promise ((resolve, reject) => {
			var q = {
				_id: roomId,
				type: 'group',
				$and: [
					{'users._id': user._id},
				],
			};
			db.collection('chatgroups').findOne(q, (e, r) => {
				if (e) return reject(e);
				if (! r) return reject(new Error('Chat not found!'));

				chatGr = r;
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
				rId: chatGr._id,
				date: {
					$gte: moment().subtract(10, 'days').toDate()
				}
			};
			db.collection('chatmessages').find(q, {sort: {date: 1}, limit: 100}).toArray((e, r) => {
				if (e) return reject(e);

				result.messages = _.map(r, (msg) => {
					msg.login = loginById[msg.uId] || 'Not found';
					msg.fDate = moment(msg.date).calendar();
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
