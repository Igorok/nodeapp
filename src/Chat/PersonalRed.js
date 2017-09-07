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
		case 'JOIN_PERS_SEND':
			state.fetch_status = 'send';
			return state;
		case 'JOIN_PERS_SUCCESS':
			state.fetch_status = 'success';
			state.roomId = action.roomId;
			state.users = action.users;
			state.messages = action.messages;
			return state;
		case 'JOIN_PERS_ERROR':
			state.fetch_status = 'error';
			state.fetch_error = action.error;
			return state;

		case 'MSG_PERS_SEND':
			return {
				fetch_status: 'send',
				users: [...state.users],
				messages: [...state.messages],
			};
		case 'MSG_PERS_SUCCESS':
			return {
				fetch_status: 'success',
				users: [...action.users],
				messages: [...action.messages],
			};
		case 'MSG_PERS_ERROR':
			return {
				fetch_status: 'error',
				fetch_error: action.error,
				users: [...state.users],
				messages: [...state.messages],
			};

		default:
			return state;
	}
}

export default chatList