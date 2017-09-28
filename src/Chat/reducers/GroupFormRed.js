let initState = {
    "_id" : null,
    "users" : [],
    "creator" : null,
    "date" : null,
    "type" : "group"
};
const groupFrom = (state = initState, action) => {
    state = {...state};
    switch (action.type) {
        case 'GROUP_FORM_SEND':
            state.fetch_status = 'send';
            return state;
        case 'GROUP_FORM_SUCCESS':
            state.fetch_status = 'success';
            return state;
        case 'GROUP_FORM_ERROR':
            state.fetch_status = 'error';
            state.fetch_error = action.error;
            return state;
        default:
            return state;
    }
}

export default groupFrom