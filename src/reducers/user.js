const initState = {
	status: null,
	error: null,
	list: []
};

const user = (state = initState, action) => {
	switch (action.type) {
		case 'USER_LIST_SEND':
			return {
				status: 'send',
				error: null,
				list: [],
			};
		case 'USER_LIST_SUCCESS':
			return {
				status: 'success',
				error: null,
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

export default user
