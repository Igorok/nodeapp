let blogId = window.locals.blogId || null;
let initState = {
	status: null,
	error: null,
	blogId: blogId,
	list: [],
};
const postList = (state = initState, action) => {
	switch (action.type) {
		case 'POST_LIST_SEND':
			state = {...state};
			state.status = 'send';
			return state;
		case 'POST_LIST_SUCCESS':
			state = {...state};
			state.list = action.data;
			state.status = 'success';
			return state;
		case 'POST_LIST_EROR':
			state = {...state};
			state.status = 'error';
			state.error = action.error;
			state.list = [];
			return state;
		default:
			return state;
	}
}

export default postList;