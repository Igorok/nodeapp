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
	_id: '',
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
			state._id = action.data._id;
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



		case 'POST_EDIT_SEND':
			state = {...state};
			state.fetch_status = 'send_edit';
			state.status = action.status;
			state.name = action.name;
			state.description = action.description;
			return state;
		case 'POST_EDIT_SUCCESS':
			state = {...state};
			state.fetch_status = 'success_edit';
			return state;
		case 'POST_EDIT_ERROR':
			state = {...state};
			state.fetch_status = 'error_edit';
			state.fetch_error = action.error;
			return state;

		default:
			return state;
	}
}

export default postDetail;