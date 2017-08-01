const initState = {
	list: []
};

const getUserList = (state, action) => {
	return {
		type: action.type,
		list: action.list,
	}
}


const user = (state = initState, action) => {
	switch (action.type) {
		case 'GET_USER_LIST':
			return getUserList(state, action);
		// case 'TOGGLE_TODO':
		//   return state.map(t =>
		//     todo(t, action)
		//   )
		default:
			return state
	}
}

export default user
