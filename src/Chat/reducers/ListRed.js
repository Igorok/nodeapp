import _ from 'lodash';
let initState = {
	list: [],
	fetch_status: null,
	fetch_error: null,
};
const chatList = (state = initState, action) => {
	switch (action.type) {
		case 'CHAT_LIST_SEND':
			return {
				fetch_status: 'send',
				list: [...state.list],
			};
		case 'CHAT_LIST_SUCCESS':
			return {
				fetch_status: 'success',
				list: [...action.data],
			};
		case 'CHAT_LIST_ERROR':
			return {
				fetch_status: 'error',
				fetch_error: action.error,
				list: [],
			};

		default:
			return state;
	}
}

export default chatList