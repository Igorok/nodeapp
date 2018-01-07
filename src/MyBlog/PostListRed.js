let blogId = window.locals.blogId || null;
let initState = {
	fetch_status: null,
	fetch_error: null,
	blogId: blogId,
	list: [],
};
const postList = (state = initState, action) => {
	switch (action.type) {
		case 'POST_LIST_SEND':
			state = {...state};
			state.fetch_status = 'send';
			return state;
		case 'POST_LIST_SUCCESS':
			state = {...state};
			state.list = action.data;
			state.fetch_status = 'success';
			return state;
		case 'POST_LIST_ERROR':
			state = {...state};
			state.fetch_status = 'error';
			state.fetch_error = action.error;
			state.list = [];
			return state;

		case 'POST_REMOVE_SEND':
			state = {...state};
			state.fetch_status = 'send';
			return state;
		case 'POST_REMOVE_SUCCESS':
			state.fetch_status = 'success';
			state = {...state};
			_.remove(state.list, (v) => {
				return v._id === action.data._id;
			});
			return state;
		case 'POST_REMOVE_ERROR':
			state.fetch_status = 'error';
			state.fetch_error = action.error;
			state = {...state};
			return state;

		default:
			return state;
	}
}

export default postList;