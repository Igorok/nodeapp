let initState = {
	list: [],
	status: null,
};
const userList = (state = initState, action) => {
	switch (action.type) {
		case 'USER_LIST_SEND':
			return {
				status: 'send',
				list: state.list,
			};
		case 'USER_LIST_SUCCESS':
			return {
				status: 'success',
				list: action.data,
			};
		case 'USER_LIST_ERROR':
			return {
				status: 'error',
				error: action.error,
				list: [],
			};
		default:
			return state
	}
}

export default userList