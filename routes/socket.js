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
				var emitError = (err) => {
					console.trace(err);
					return socket.emit('err', err);
				};

				socket.on('connection', (socket) => {
					console.log('connection');
				});

				socket.on('joinPers', (param) => {
					console.log('joinPers ', param);

					socket.emit('joinPers', {
						_id: param._id,
						users: ['user 1', 'user 2'],
						messages: ['message 1', 'message 2', 'message 3'],
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
