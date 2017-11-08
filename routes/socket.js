const helper = require(__dirname + '/../api/helper.js');
let io = require('socket.io');

let api = {};

let init = (server) => {
	return helper.getApi(['chat'])
	.then((r) => {
		api = r;
	})
	.then(() => {
		io = io.listen(server);

		io.use((socket, next) => {
			let emitError = (e) => {
				console.trace('socket ', e);
				if (e.message) e = e.message;
				socket.emit('err', e);
				return;
			};

			socket.on('connection', (socket) => {
				console.log('connection');
			});

			socket.on('joinPers', (param) => {
				let room = null;
				api.chat.joinPersonal(param)
				.then((r) => {
					room = r;
					return new Promise((resolve, reject) => {
						socket.join(room.roomId, (e) => {
							if (e) return reject(e);
							resolve();
						});
					});
				})
				.then(() => {
					// to room
					socket.to(room.roomId.toString()).emit('freshStatus', {
						roomId: room.roomId,
						users: room.users
					});
					// to user
					socket.emit('joinPers', room);
					return;
				})
				.catch((e) => {
					return emitError(e);
				});
			});

			socket.on('joinGroup', (param) => {
				let room = null;
				api.chat.joinGroup(param)
				.then((r) => {
					room = r;
					return new Promise((resolve, reject) => {
						socket.join(room.roomId, (e) => {
							if (e) return reject(e);
							resolve();
						});
					});
				})
				.then(() => {
					// to room
					socket.to(room.roomId.toString()).emit('freshStatus', {
						roomId: room.roomId,
						users: room.users
					});
					// to user
					socket.emit('joinGroup', room);
					return;
				})
				.catch((e) => {
					return emitError(e);
				});
			});

			socket.on('message', (param) => {
				api.chat.message(param)
				.then((r) => {
					// to room
					socket.to(r.rId.toString()).emit('message', r);
					// to user
					socket.emit('message', r);
				})
				.catch((e) => {
					return emitError(e);
				});
			});

			next();
		});
	})
	.catch((e) => {
		console.trace(e);
	});





};


module.exports = init;
