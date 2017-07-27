const initState = {
	login: 'tester',
	password: 'test',
};

const getAuth = (state, action) => {
	console.log(
		'getAuth ',
		'state ', state, 
		'action ', action
	);

	return {
		id: action.id,
		login: action.login,
		password: action.password,
	}
}


const auth = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_FIELD':
			return getAuth(state, action);
		// case 'TOGGLE_TODO':
		//   return state.map(t =>
		//     todo(t, action)
		//   )
		default:
			return state
	}
}

export default auth
