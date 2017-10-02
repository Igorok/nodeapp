import _ from 'lodash';
// list of chats
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

		case 'GROUP_ADD_SEND':
			return {
				fetch_status: 'send',
				list: [...state.list],
			};
		case 'GROUP_ADD_SUCCESS':
			state.list = [action.data, ...state.list];
			return {
				fetch_status: 'success_add',
				list: state.list,
			};
		case 'GROUP_ADD_ERROR':
			return {
				fetch_status: 'error',
				fetch_error: action.error,
				list: state.list,
			};

		case 'GROUP_EDIT_SEND':
			return {
				fetch_status: 'send',
				list: [...state.list],
			};
		case 'GROUP_EDIT_SUCCESS':
			state.list = [...state.list];
			_.forEach(state.list, (v) => {
				if (v._id !== action.data._id) {
					return;
				} else {
					v.users = action.data.users;
					return false;
				}
			});
			return {
				fetch_status: 'success_edit',
				list: state.list,
			};
		case 'GROUP_EDIT_ERROR':
			return {
				fetch_status: 'error',
				fetch_error: action.error,
				list: state.list,
			};

		default:
			return state;
	}
}

export default chatList