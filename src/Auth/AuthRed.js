let user = localStorage.getItem('user');
if (user) user = JSON.parse(user);

const initState = {
	_id: user ? user._id : null,
	token: user ? user.token : null,
	login: user ? user.login : null,
	isAuthenticated: !! user,
	status: null,
	error: null,
};


const success = (state, action) => {
	user = {...action.data};
	localStorage.setItem('user', JSON.stringify(user));
	return {
		_id: user._id,
		token: user.token,
		login: user.login,
		isAuthenticated: !! user,
		status: 'success',
		error: null,
	}
}


const auth = (state = initState, action) => {
	switch (action.type) {
		case 'AUTH_SEND':
			return {
				status: 'send',
			};
		case 'AUTH_SUCCESS':
			return success(state, action);
		case 'AUTH_ERROR':
			return {
				status: 'error',
				error: action.error,
			};
		default:
			return state
	}
}

export default auth

