let initState = {
	list: [],
	status: null,
};
const blogList = (state = initState, action) => {
	switch (action.type) {
		case 'BLOG_LIST_SEND':
			return {
				status: 'send',
				list: state.list,
			};
		case 'BLOG_LIST_SUCCESS':
			return {
				status: 'success',
				list: action.data,
			};
		case 'BLOG_LIST_ERROR':
			return {
				status: 'error',
				error: action.error,
				list: [],
			};
		default:
			return state
	}
}

export default blogList