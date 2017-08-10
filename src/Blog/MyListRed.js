let initState = {
	list: [],
	status: null,
};
const blogList = (state = initState, action) => {
	switch (action.type) {
		case 'MY_BLOG_LIST_SEND':
			return {
				status: 'send',
				list: state.list,
			};
		case 'MY_BLOG_LIST_SUCCESS':
			return {
				status: 'success',
				list: action.data,
			};
		case 'MY_BLOG_LIST_ERROR':
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