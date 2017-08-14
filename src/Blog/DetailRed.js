let blogId = window.locals.blogId || null;
let initState = {
	status: null,
	error: null,
	blogId: blogId,
	created: '',
	user: '',
	name: '',
	description: '',
};
const blogDetail = (state = initState, action) => {
	switch (action.type) {
		// detail of the blog
		case 'BLOG_DETAIL_SEND':
			state = {...state};
			state.status = 'send';
			return state;
		case 'BLOG_DETAIL_SUCCESS':
			state = {...state};
			state.created = action.data.created;
			state.user = action.data.user;
			state.name = action.data.name;
			state.description = action.data.description;
			state.status = 'success';
			return state;
		case 'BLOG_DETAIL_ERROR':
			state = {...state};
			state.status = 'error';
			state.error = action.error;
			return state;
		default:
			return state;
	}
}

export default blogDetail;