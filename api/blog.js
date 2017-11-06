const helper = require(__dirname + '/../bin/helper.js');
const _ = require('lodash');
const xss = require('xss');
const moment = require('moment');

let cfg = null,
	db = null,
	apiBlog = {},
	api = {};

// validation start



// validation end














apiBlog.getBlogList = (opts) => {
	let blogArr = [],
		userArr = [];
	return new Promise((resolve, reject) => {
		db.collection('blogs').find({public: true}).toArray((e, r) => {
			if (e) return reject(e);
			blogArr = r;
			resolve();
		});
	})
	.then(() => {
		if (! blogArr.length) return Promise.resolve();

		let userIds = blogArr.map((val) => {
			return val.uId;
		});

		return new Promise((resolve, reject) => {
			db.collection('users').find({_id: {$in: userIds}}, {login: 1}).toArray((e, r) => {
				if (e) return reject(e);
				userArr = r;
				resolve();
			});
		});
	})
	.then(() => {
		if (! blogArr.length) return Promise.resolve(blogArr);

		let loginById = userArr.reduce((obj, val) => {
			obj[val._id.toString()] = val.login;
			return obj;
		}, {});

		blogArr = blogArr.map((val) => {
			val.user = loginById[val.uId.toString()] || null;
			val.created = moment(val.created).format('YYYY-MM-DD HH:mm');
			delete val.uId;
			delete val.public;

			return val;
		});

		return blogArr;
	});
}

apiBlog.getBlogDetail = (opts) => {
	let blog = null;
	if (! opts._id) {
		return Promise.reject(new Error('The blog not found'));
	}
	opts._id = helper.mongoId(opts._id.toString());

	return new Promise((resolve, reject) => {
		db.collection('blogs').findOne({_id: opts._id, public: true}, (e, r) => {
			if (e) return reject(e);
			if (! r) return reject(new Error('The blog not found'));
			blog = r;
			resolve();
		});
	})
	.then(() => {
		return new Promise((resolve, reject) => {
			db.collection('users').findOne({_id: blog.uId}, {login: 1}, (e, r) => {
				if (e) return reject(e);
				blog.user = r ?  r.login : 'unknown';
				blog.created = moment(blog.created).format('YYYY-MM-DD HH:mm');
				delete blog.uId;
				delete blog.public;
				resolve();
			});
		});
	})
	.then(() => {
		return blog;
	});
};

apiBlog.getBlogPosts = (opts) => {
	let posts = [],
		users = [];
	if (! opts._id) {
		return Promise.reject(new Error('The blog not found'));
	}
	opts._id = helper.mongoId(opts._id.toString());

	return new Promise((resolve, reject) => {
		db.collection('blogs').findOne({_id: opts._id, public: true}, (e, r) => {
			if (e) return reject(e);
			if (! r) return reject(new Error('The blog not found'));
			resolve();
		});
	})
	.then(() => {
		return new Promise((resolve, reject) => {
			let q = {
				_bId: opts._id,
				approved: 1,
				status: "publish",
			};
			let rows = {
				_id: 1,
				name: 1,
				description: 1,
				uId: 1,
				created: 1,
			};
			db.collection('posts').find(q, rows).toArray((e, r) => {
				if (e) return reject(e);
				if (r && r.length) {
					posts = r;
				}
				resolve();
			});
		});
	})
	.then(() => {
		if (! posts.length) return;
		let userIds = posts.map((val) => {
			return val.uId;
		});
		return new Promise((resolve, reject) => {
			db.collection('users').find({_id: {$in: userIds}}, {login: 1}).toArray((e, r) => {
				if (e) return reject(e);
				users = r;
				resolve();
			});
		});
	})
	.then(() => {
		if (! posts.length) return posts;

		let loginById = users.reduce((obj, user) => {
			obj[user._id] = user.login;
			return obj;
		}, {});
		posts = posts.map((val) => {
			val.user = loginById[val.uId];
			val.created = moment(val.created).format('YYYY-MM-DD HH:mm');
			val.description = val.description.substring(0, 140) + '...';
			delete val.uId;
			return val;
		});
		return posts;
	});
};

apiBlog.getPostDetail = (opts) => {
	let post = null;
	if (! opts._id) {
		return Promise.reject(new Error('The blog not found'));
	}
	opts._id = helper.mongoId(opts._id.toString());

	return new Promise((resolve, reject) => {
		let q = {
			_id: opts._id,
			approved: 1,
			status: 'publish',
		};

		db.collection('posts').findOne(q, (e, r) => {
			if (e) return reject(e);
			if (! r) return reject(new Error('The post not found'));
			post = r;
			resolve();
		});
	})
	.then(() => {
		return new Promise((resolve, reject) => {
			db.collection('blogs').findOne({_id: post._bId, public: true}, (e, r) => {
				if (e) return reject(e);
				if (! r) return reject(new Error('The blog not found'));
				resolve();
			});
		})
	})
	.then(() => {
		return new Promise((resolve, reject) => {
			db.collection('users').findOne({_id: post.uId}, {login: 1}, (e, r) => {
				if (e) return reject(e);
				post.user = r ?  r.login : 'unknown';
				post.created = moment(post.created).format('YYYY-MM-DD HH:mm');
				post.description = post.description;

				delete post.uId;
				delete post.public;
				delete post.approved;
				resolve();
			});
		});
	})
	.then(() => {
		return post;
	});
};

apiBlog.getMyBlogList = (opts) => {
	return api.user.checkAuth(opts)
	.then((u) => {
		return new Promise((resolve, reject) => {
			db.collection('blogs').find({uId: u._id}).toArray((e, r) => {
				if (e) return reject(e);
				resolve(r);
			});
		});
	})
}
apiBlog.getMyBlogDetail = (opts) => {
	let blog = null,
		user = null;
	if (! opts._id) {
		return Promise.reject(new Error('The blog not found'));
	}
	opts._id = helper.mongoId(opts._id.toString());

	return api.user.checkAuth(opts)
	.then((u) => {
		user = u;
		return new Promise((resolve, reject) => {
			db.collection('blogs').findOne({_id: opts._id, uId: user._id}, (e, r) => {
				if (e) return reject(e);
				if (! r) return reject(new Error('The blog not found'));
				blog = r;
				resolve(blog);
			});
		});
	})
};

apiBlog.getMyBlogPosts = (opts) => {
	let posts = [],
		users = [];
	if (! opts._id) {
		return Promise.reject(new Error('The blog not found'));
	}
	opts._id = helper.mongoId(opts._id.toString());

	return new Promise((resolve, reject) => {
		let q = {
			_bId: opts._id,
		};
		db.collection('posts').find(q).toArray((e, r) => {
			if (e) return reject(e);
			if (r && r.length) {
				posts = r;
			}
			resolve();
		});
	})
	.then(() => {
		if (! posts.length) return posts;
		var statObj = {
			write: 'Write',
			publish: 'Publish',
			archive: 'Archive',
		};

		posts = posts.map((val) => {
			val.created = moment(val.created).format('YYYY-MM-DD HH:mm');
			val.updated = moment(val.updated).format('YYYY-MM-DD HH:mm');
			val.description = val.description.substring(0, 140) + '...';
			val.status = statObj[val.status];
			val.approved = val.approved ? 'Approved' : 'Not approved';
			return val;
		});
		return posts;
	});
};

apiBlog.editMyBlog = (opts) => {
	let user = null;
	if (! opts._id) {
		return Promise.reject(new Error('Blog not found'));
	}
	if (! opts.name || ! opts.description) {
		return Promise.reject(new Error('Name and description are required'));
	}

	opts._id = helper.mongoId(opts._id.toString());

	let setObj = {
		name: xss(opts.name.toString().trim()),
		description: xss(opts.description.toString().trim()),
		public: !! opts.public,
		updated: new Date(),
	};
	let q = {_id: opts._id};
	return api.user.checkAuth(opts)
	.then((u) => {
		user = u;
		return new Promise((resolve, reject) => {
			db.collection('blogs').findOne(q, (e, r) => {
				if (e) return reject(e);
				if (! r) return reject(new Error('Blog not found'));

				if (
					setObj.name === r.name &&
					setObj.description === r.description &&
					setObj.public === r.public
				) {
					return reject(new Error('Nothing to edit'));
				}
				resolve();
			});
		});
	})
	.then(() => {
		return new Promise((resolve, reject) => {
			db.collection('blogs').update(q, {$set: setObj}, (e) => {
				if (e) return reject(e);
				resolve();
			});
		});
	});
};


apiBlog.getMyPostDetail = (opts) => {
	let post = null;

	if (! opts._id) {
		return Promise.reject(new Error('The blog not found'));
	}
	opts._id = helper.mongoId(opts._id.toString());
	
	return api.user.checkAuth(opts)
	.then((u) => {
		return new Promise((resolve, reject) => {
			db.collection('posts').findOne({_id: opts._id, uId: u._id}, (e, r) => {
				if (e) return reject(e);
				if (! r) return reject(new Error('The blog not found'));
				post = r;
				resolve();
			});
		});
	})
	.then(() => {
		return new Promise((resolve, reject) => {
			db.collection('blogs').findOne({_id: post._bId}, (e, r) => {
				if (e) return reject(e);
				post.blogName = r ? r.name : null;
				post.description = post.description;
				resolve(post);
			});
		});
	});
};


apiBlog.editMyPostDetail = (opts) => {
	let user = null;
	if (! opts._id) {
		return Promise.reject(new Error('Post not found'));
	}
	if (! opts.name || ! opts.description || ! opts.status) {
		return Promise.reject(new Error('Name and description are required'));
	}

    opts._id = helper.mongoId(opts._id.toString());

	let setObj = {
		status: opts.status.toString(),
		name: xss(opts.name.toString().trim()),
		description: xss(opts.description.toString().trim()),
		updated: new Date(),
    };

	let q = {_id: opts._id};
	return api.user.checkAuth(opts)
	.then((u) => {
		user = u;
		return new Promise((resolve, reject) => {
			db.collection('posts').findOne(q, (e, r) => {
				if (e) return reject(e);
				if (! r) return reject(new Error('Post not found'));

				if (
					setObj.name === r.name &&
					setObj.description === r.description &&
					setObj.status === r.status
				) {
					return reject(new Error('Nothing to edit'));
				}
				resolve();
			});
		});
	})
	.then(() => {
		return new Promise((resolve, reject) => {
			db.collection('posts').update(q, {$set: setObj}, (e) => {
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
			return helper.getApi(['user']);
		}).then((r) => {
			api = r;
			return apiBlog;
		})
}










module.exports.init = init;