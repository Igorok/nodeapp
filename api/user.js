const helper = require(__dirname + '/../bin/helper.js');
const crypto = require('crypto');
const _ = require('lodash');
const moment = require('moment');



let cfg = null,
	db = null,
	apiUser = {};

apiUser.checkOnline = (dt) => {
	if (! dt || ! dt.valueOf()) return false;

	return Date.now() - dt.valueOf() < 5 * 60 * 1000;
};

const emailReg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

apiUser.getUserList = (opts) => {
	let user = null,
		uArr = [];
	return apiUser.checkAuth(opts)
		.then((u) => {
			return new Promise((resolve, reject) => {
				user = u;
				let q = {
					_id: {$ne: user._id},
					status: 1,
				};
				let rows = {
					login: 1, 
					dtActive: 1,
				};

				db.collection('users').find({_id: {$ne: user._id}, status: 1}, rows).toArray((e, r) => {
					if (e) return reject(e);
					uArr = r || [];
					resolve();
				});
			});
		})
		.then(() => {
			let frById = {},
				reqById = {},
				myReqById = {};

			_.forEach(user.friends, function (f) {
				frById[f._id.toString()] = f._id;
			});
			_.forEach(user.friendRequests, function (f) {
				reqById[f._id.toString()] = f._id;
			});
			_.forEach(user.selfFriendRequests, function (f) {
				myReqById[f._id.toString()] = f._id;
			});

			uArr = uArr.map((u) => {
				if (frById[u._id]) {
					u.friend = 'fr';
				} else if (reqById[u._id]) {
					u.friend = 'fr_req';
				} else if (myReqById[u._id]) {
					u.friend = 'my_fr_req';
				} else {
					u.friend = 'not_fr';
				}

				u.online = apiUser.checkOnline(u.dtActive);
				return u;
			});
			return uArr;
		});
};

apiUser.getCurrentProfile = (opts) => {
	let user = null;
	
	return apiUser.checkAuth(opts)
		.then((u) => {
			user = u;

			let getCountChats = new Promise((resolve, reject) => {
				db.collection('chatgroups').count({'users._id': user._id}, (e, r) => {
					if (e) return reject(e);
					user.countChats = r;
					resolve()
				});
			});
			let getCountBlogs = new Promise((resolve, reject) => {
				db.collection('blogs').count({uId: user._id}, (e, r) => {
					if (e) return reject(e);
					user.countBlogs = r;
					resolve()
				});
			});

			return Promise.all([getCountChats, getCountBlogs]);
		})
		.then(() => {
			delete user.password;
			delete user.tokens;
			return user;
		});
};


apiUser.editCurrentProfile = (opts) => {
	let user = null;
	
	if (! opts.login || ! opts.email) {
		return Promise.reject(new Error('Login and email are required'));
	}

	opts.login = opts.login.toString().trim();
	opts.email = opts.email.toString().trim();


	return apiUser.checkAuth(opts)
		.then((u) => {
			user = u;

			if (
				opts.login === user.login &&
				opts.email === user.email
			) {
				return Promise.reject(new Error('Nothing to edit'));
			}

			let q = {
				_id : {
					$ne: user._id,
				},
				$or: [
					{email: opts.email},
					{login: opts.login},
				]
			};

			return new Promise((resolve, reject) => {
				db.collection('users').count(q, (e, r) => {
					if (e) return reject(e);
					if (r) return reject(new Error('The login or the email already exists'));
					
					resolve()
				});
			});
		})
		.then(() => {
			return new Promise((resolve, reject) => {
				let q = {_id: user._id};
				let set = {$set: {
					login: opts.login,
					email: opts.email,
				}};
				db.collection('users').update({_id: user._id}, set, (e, r) => {
					if (e) return reject(e);
					
					resolve()
				});
			});
		});
};



apiUser.getAuth = (opts) => {
	if (! opts.login || ! opts.password) {
		return Promise.reject(new Error('Wrong data'));
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

apiUser.checkAuth = (opts) => {
	if (! opts.token) {
		return Promise.reject(new Error(403));
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
			if (! u) return reject(new Error(403));

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
				return reject(new Error(403));
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


/**
 * @param {Object} opts:
 * @param {string} opts._id - _id of user to change friend status
 * @param {string} opts.tyfriendpe - type of friend status
 */
apiUser.updateFriend = (opts) => {
	if (! opts._id || ! opts.friend) {
		return Promise.reject(new Error('Login and email are required'));
	}

	let user = null;
	let _id = helper.mongoId(opts._id.toString());
	let friend = opts.friend.toString();
	let userUpd = (q, setObj) => {
		return new Promise((resolve, reject) => {
			db.collection('users').update(q, setObj, (e, r) => {
				if (e) return reject(e);
				resolve();
			});
		})
	};

	return apiUser.checkAuth(opts)
	.then((u) => {
		user = u;
		let pArr = [];
		// need to remove user from friend
		if (friend === 'fr') {
			let myQ = {_id: user._id};
			let mySet = {$pull: {
				friends: {_id: _id},
			}};

			let frQ = {_id: _id};
			let frSet = {$pull: {
				friends: {_id: user._id},
			}};
			return Promise.all([
				userUpd(myQ, mySet),
				userUpd(frQ, frSet),
			])
			.then(() => {
				return {
					_id: _id.toString(),
					friend: 'not_fr',
				}
			});
			
		}
		// request wait of my approve
		else if (friend === 'fr_req') {
			let myQ = {_id: user._id};
			let mySet = {
				$pull: {friendRequests: {_id: _id}},
				$push: {friends: {_id: _id}},
			};

			let frQ = {_id: _id};
			let frSet = {
				$pull: {selfFriendRequests: {_id: user._id}},
				$push: {friends: {_id: user._id}},
			};
			return Promise.all([
				userUpd(myQ, mySet),
				userUpd(frQ, frSet),
			])
			.then(() => {
				return {
					_id: _id.toString(),
					friend: 'fr',
				}
			});
		}
		// need to remove from my request
		else if (friend === 'my_fr_req') {
			let myQ = {_id: user._id};
			let mySet = {
				$pull: {selfFriendRequests: {_id: _id}},
			};

			let frQ = {_id: _id};
			let frSet = {
				$pull: {friendRequests: {_id: user._id}},
			};
			return Promise.all([
				userUpd(myQ, mySet),
				userUpd(frQ, frSet),
			])
			.then(() => {
				return {
					_id: _id.toString(),
					friend: 'not_fr',
				}
			});
		}
		// send request to user
		else if (friend === 'not_fr') {
			let myQ = {_id: user._id};
			let mySet = {
				$push: {selfFriendRequests: {_id: _id}},
			};

			let frQ = {_id: _id};
			let frSet = {
				$push: {friendRequests: {_id: user._id}},
			};
			return Promise.all([
				userUpd(myQ, mySet),
				userUpd(frQ, frSet),
			])
			.then(() => {
				return {
					_id: _id.toString(),
					friend: 'my_fr_req',
				}
			});
		} else {
			return;
		}
	});
};

apiUser.getFriendList = (opts) => {
	let user = null,
		fArr = [];

	return apiUser.checkAuth(opts)
	.then((u) => {
		return new Promise((resolve, reject) => {
			user = u;
			let fIds = _.map(user.friends, (v) => {
				return v._id;
			});
			let q = {
				_id: {$in: fIds},
				'friends._id': user._id,
				status: 1,
			};
			let rows = {
				login: 1, 
				dtActive: 1,
			};

			db.collection('users').find(q, rows).toArray((e, r) => {
				if (e) return reject(e);
				fArr = _.map(r, (u) => {
					u.online = apiUser.checkOnline(u.dtActive);
					return u;
				});
				resolve(fArr);
			});
		});
	});
};



apiUser.getUsersStatus = (opts) => {
	let user = null;
	
	if (! opts.login || ! opts.email) {
		return Promise.reject(new Error('Login and email are required'));
	}

	opts.login = opts.login.toString().trim();
	opts.email = opts.email.toString().trim();


	return apiUser.checkAuth(opts)
}


apiUser.registration = (opts) => {
	if (
		! opts.login || 
		! opts.password || 
		! opts.email || 
		! emailReg.test(opts.email.toString())
	) {
		return Promise.reject(new Error('Wrong data'));
	}

	opts.login = opts.login.toString().trim();
	opts.email = opts.email.toString().trim();
	opts.password = opts.password.toString().trim();
	let hash = crypto.createHash('sha1');
	hash = hash.update(opts.password).digest('hex');

	return new Promise((resolve, reject) => {
		let q = {
			$or : [
				{login: opts.login},
				{email: opts.email}
			],
		};
		db.collection('users').findOne(q, (e, r) => {
			if (e) return reject(e);
			if (r) return reject(new Error('Login or email already registered'));
			resolve();
		});
	})
	.then((r) => {
		return new Promise((resolve, reject) => {
			var newUser = {
				login: opts.login,
				email: opts.email,
				password: hash,
				group: "SimpleUser",
				dtCreated: new Date(),
				status: 1
			};
			db.collection('users').insert(newUser, function (e, r) {
				if (e) return reject(e);
				resolve();
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
			return apiUser;
		})
}

module.exports.init = init;