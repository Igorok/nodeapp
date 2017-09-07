const helper = require(__dirname + '/../bin/helper.js');
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
				let emitError = (err) => {
					console.trace(err);
					return socket.emit('err', err);
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
						console.log('emit');

						socket.to(room.roomId).emit('freshStatus', {roomId: room.roomId, users: room.users});
						socket.emit('joinPers', room);
						return;
					})
					.catch((e) => {
						console.log('catch ', e);

						emitError(e);
					});


				});


				/**
				 * join to group between two users
				 * take token, users ids and returned a room id and users with statuses
				 *
				 * 
				socket.on('joinPersonal', function (_obj) {
					if (_.isEmpty(_obj)) {
						return emitError(404);
					}
					var data = {
						params: []
					};
					data.params.push(_obj);
					cokcore.ctx.api.chat.joinPersonal(data, safe.sure(emitError, function (data) {
						socket.join(data._id, safe.sure(emitError, function () {
							socket.to(data._id).emit('freshStatus', {_id: data._id, users: data.users});
							socket.emit('joinPersonal', {_id: data._id, users: data.users, history: data.history});
						}));
					}));
				});
				*/


				next();
			});
		})
		.catch((e) => {
			console.trace(e);
		});

	



};


module.exports = init;
