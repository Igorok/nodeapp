const initState = {};
const reg = (state = initState, action) => {
	switch (action.type) {
		case 'REG_SEND':
			return {
				status: 'send',
			};
		case 'REG_SUCCESS':
			return {
				status: 'success',
			};
		case 'REG_ERROR':
			return {
				status: 'error',
				error: action.error,
			};
		default:
			return state
	}
}

export default reg

