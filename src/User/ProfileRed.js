let initState = {
	_id: '',
	login: '',
	email: '',
	friends: '',
	friendRequests: 0,
	selfFriendRequests: 0,
	countChats: 0,
	countBlogs: 0,
	status: null,
	error: null,
};
const profile = (state = initState, action) => {
	switch (action.type) {
		case 'GET_PROFILE_SEND':
			let sendState = {...state};
			sendState.status = 'send';
			return sendState;
		case 'GET_PROFILE_SUCCESS':
			return {
				_id: action.data._id,
				login: action.data.login,
				email: action.data.email,
				friends: action.data.friends ?
					action.data.friends.length : 
					0,
				friendRequests: action.data.friendRequests ?
					action.data.friendRequests.length :
					0,
				selfFriendRequests: action.data.selfFriendRequests ?
					action.data.selfFriendRequests.length :
					0,
				countChats: action.data.countChats || 0,
				countBlogs: action.data.countBlogs || 0,
				status: 'success',
				error: null,
			};
		case 'GET_PROFILE_ERROR':
			let errorState = {...state};
			errorState.status = 'error';
			errorState.error = action.error;
			return errorState;
		
		case 'EDIT_PROFILE_SEND':
			state = {...state};
			state.login = action.login;
			state.email = action.email;
			state.status = 'send';
			return state;
		case 'EDIT_PROFILE_SUCCESS':
			state = {...state};
			state.status = 'edit_success';
			state.error = null;
			return state;
		case 'EDIT_PROFILE_ERROR':
			state = {...state};
			state.status = 'edit_error';
			state.error = action.error;
			return state;
		default:
			return state
	}
}

export default profile