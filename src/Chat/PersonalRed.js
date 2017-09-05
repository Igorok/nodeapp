import _ from 'lodash';
let chatId = window.locals.chatId || null;

let initState = {
	_id: chatId,
	users: [],
	messages: [],
	fetch_status: null,
	fetch_error: null,
};
const chatList = (state = initState, action) => {
	switch (action.type) {
		case 'JOIN_PERS_SEND':
			return {
				fetch_status: 'send',
				users: [...state.users],
				messages: [...state.messages],
			};
		case 'JOIN_PERS_SUCCESS':
			return {
				fetch_status: 'success',
				users: [...action.users],
				messages: [...action.messages],
			};
		case 'JOIN_PERS_ERROR':
			return {
				fetch_status: 'error',
				fetch_error: action.error,
				users: [...state.users],
				messages: [...state.messages],
			};

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