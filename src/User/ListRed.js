import _ from 'lodash';
let initState = {
	list: [],
	fetch_status: null,
	fetch_error: null,
};
const userList = (state = initState, action) => {
	switch (action.type) {
		case 'USER_LIST_SEND':
			return {
				fetch_status: 'send',
				list: [...state.list],
			};
		case 'USER_LIST_SUCCESS':
			return {
				fetch_status: 'success',
				list: [...action.data],
			};
		case 'USER_LIST_ERROR':
			return {
				fetch_status: 'error',
				fetch_error: action.error,
				list: [],
			};
		
		case 'FRIEND_UPDATE_SEND':
			return {
				fetch_status: 'send_friend',
				list: [...state.list],
			};
		case 'FRIEND_UPDATE_SUCCESS':
			let frList = [...state.list];

			if (action.data && action.data._id) {
				let fr = _.find(frList, (val) => {
					return val._id === action.data._id;
				});
				fr.friend = action.data.friend;
			}

			return {
				fetch_status: 'success_friend',
				list: frList,
			};
		case 'FRIEND_UPDATE_ERROR':
			return {
				fetch_status: 'error_friend',
				fetch_error: action.error,
				list: [],
			};
		
		
		default:
			return state
	}
}

export default userList