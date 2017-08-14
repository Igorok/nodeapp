let blogId = window.locals.blogId || null;
let initState = {
	fetch_status: null,
	fetch_error: null,
	blogId: blogId,
	created: '',
	public: null,
	name: '',
	description: '',
	
};
const blogDetail = (state = initState, action) => {
	switch (action.type) {
		// detail of the blog
		case 'BLOG_DETAIL_SEND':
			state = {...state};
			state.fetch_status = 'send';
			return state;
		case 'BLOG_DETAIL_SUCCESS':
			state = {...state};
			state.created = action.data.created;
			state.public = action.data.public;
			state.name = action.data.name;
			state.description = action.data.description;
			state.fetch_status = 'success';
			return state;
		case 'BLOG_DETAIL_ERROR':
			state = {...state};
			state.fetch_status = 'error';
			state.fetch_error = action.error;
			return state;

		case 'BLOG_EDIT_SEND':
			state = {...state};
			state.fetch_status = 'send_edit';
			state.public = action.public;
			state.name = action.name;
			state.description = action.description;
			return state;
		case 'BLOG_EDIT_SUCCESS':
			state = {...state};
			state.fetch_status = 'success_edit';
			return state;
		case 'BLOG_EDIT_ERROR':
			state = {...state};
			state.fetch_status = 'error_edit';
			state.fetch_error = action.error;
			return state;
		default:
			return state;
	}
}

export default blogDetail;