import _ from 'lodash';
let roomId = window.locals.roomId || null;

let initState = {
	roomId: roomId,
	// userId: null,
	users: [],
	messages: [],
	fetch_status: null,
	fetch_error: null,
};
const chatList = (state = initState, action) => {
	state = {...state};
	switch (action.type) {
		case 'JOIN_GRP_SUCCESS':
			state.fetch_status = 'success';
			// state.roomId = action.roomId;
			state.users = action.users;
			state.messages = action.messages;
			return state;
		case 'MSG_SUCCESS':
			state.fetch_status = 'success';
			action = {...action};
			delete action.type;
			state.messages.push(action);
			return state;
		case 'CHAT_ERROR':
			state.fetch_status = 'error';
			state.fetch_error = action.error;
			return state;

		default:
			return state;
	}
}

export default chatList