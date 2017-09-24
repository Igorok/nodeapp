let initState = {
    "list" : []
};
const friendList = (state = initState, action) => {
    state = {...state};
    switch (action.type) {
        case 'FRIEND_LIST_SEND':
            state.fetch_status = 'send';
            return state;
        case 'FRIEND_LIST_SUCCESS':
            state.list = action.data;
            state.fetch_status = 'success';
            return state;
        case 'FRIEND_LIST_ERROR':
            state.fetch_status = 'error';
            state.fetch_error = action.error;
            return state;
        default:
            return state;
    }
}

export default friendList