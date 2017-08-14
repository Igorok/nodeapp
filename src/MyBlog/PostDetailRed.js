let postId = window.locals.postId || null;
let initState = {
	fetch_status: null,
	fetch_error: null,
	postId: postId,
	_bId: '',
	created: '',
	user: '',
	name: '',
	blogName: '',
	description: '',
	status: '',
};
const postDetail = (state = initState, action) => {
	switch (action.type) {
		// detail of the blog
		case 'POST_DETAIL_SEND':
			state = {...state};
			state.fetch_status = 'send';
			return state;
		case 'POST_DETAIL_SUCCESS':
			state = {...state};
			state._bId = action.data._bId;
			state.created = action.data.created;
			state.user = action.data.user;
			state.name = action.data.name;
			state.blogName = action.data.blogName;
			state.description = action.data.description;
			state.status =  action.data.status;
			state.fetch_status = 'success';
			return state;
		case 'POST_DETAIL_EROR':
			state = {...state};
			state.fetch_status = 'error';
			state.fetch_error = action.fetch_error;
			return state;
		default:
			return state;
	}
}

export default postDetail;