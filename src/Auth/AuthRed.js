let user = localStorage.getItem('user');
if (user) user = JSON.parse(user);

const initState = {
	login: user ? user.login : '',
	password: '',
	isAuthenticated: !! user,
	status: null,
};


const getAuth = (state, action) => {
	return {
		status: action.status || state.status,
		login: action.login || state.login,
		password: action.password || state.password,
		isAuthenticated: action.isAuthenticated,
		email: action.email || state.email,
	}
}


const login = (state = initState, action) => {
	switch (action.type) {
		case 'GET_AUTH': 
			return getAuth(state, action);
		default:
			return state
	}
}

export default login

