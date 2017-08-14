let initState = {
	list: [],
	fetch_status: null,
};
const blogList = (state = initState, action) => {
	switch (action.type) {
		case 'MY_BLOG_LIST_SEND':
			return {
				fetch_status: 'send',
				list: state.list,
			};
		case 'MY_BLOG_LIST_SUCCESS':
			return {
				fetch_status: 'success',
				list: action.data,
			};
		case 'MY_BLOG_LIST_ERROR':
			return {
				fetch_status: 'error',
				fetch_error: action.error,
				list: [],
			};
		default:
			return state
	}
}

export default blogList