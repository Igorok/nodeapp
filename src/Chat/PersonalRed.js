import _ from 'lodash';
let userId = window.locals.userId || null;

let initState = {
	roomId: null,
	userId: userId,
	users: [],
	messages: [],
	fetch_status: null,
	fetch_error: null,
};
const chatList = (state = initState, action) => {
	state = {...state};
	switch (action.type) {
		case 'JOIN_PERS_SUCCESS':
			state.fetch_status = 'success';
			state.roomId = action.roomId;
			state.users = action.users;
			state.messages = action.messages;
			return state;
		case 'MSG_PERS_SUCCESS':
			state.fetch_status = 'success';
			action = {...action};
			delete action.type;
			state.messages.push(action);
			return state;
		case 'PERS_ERROR':
			state.fetch_status = 'error';
			state.fetch_error = action.error;
			return state;

		default:
			return state;
	}
}

export default chatList