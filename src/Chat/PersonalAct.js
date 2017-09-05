

// window.location.hostname
export const joinPers = (opts) => {
	return (dispatch) => {
		dispatch({
			type: 'JOIN_PERS_SUCCESS',
			messages: opts.messages,
			users: opts.users,
		});
	}
};