const _ = require('lodash');

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
			db.collection('users').find({_id: {$in: userIds}}, {login: 1}).toArray((e, r) => {
				if (e) return reject(e);
				userById = r.reduce((obj, val) => {
					obj[val._id] = val.login;
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

			item.users = val.users.map((u) => {
				return userById[u._id.toString()] ? userById[u._id.toString()] : '';
			});

			return item;
		});

		return chatArr;
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