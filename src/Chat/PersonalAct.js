export const joinPers = (opts) => {
	return (dispatch) => {
		dispatch({
			type: 'JOIN_PERS_SUCCESS',
			messages: opts.messages,
			users: opts.users,
			roomId: opts.roomId,
		});
	}
};

export const err = (opts) => {
	return (dispatch) => {
		dispatch({
			type: 'PERS_ERROR',
			error: opts.error,
		});
	}
};

export const message = (opts) => {
	return (dispatch) => {
		dispatch({
			...opts,
			type: 'MSG_PERS_SUCCESS',
		});
	}
};