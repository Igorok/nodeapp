import {polyfill} from 'es6-promise';
import fetch from 'isomorphic-fetch';

import {api} from '../helper';

export const getUserList = () => {
	return (dispatch) => {

		dispatch({
			type: 'USER_LIST',
			state: 'send',
			list: [],
		});

		api({fetch: 'user.getUserList'})
			.then((r) => {
				console.log('comp r ', r);

				return dispatch({
					type: 'USER_LIST',
					state: 'success',
					list: r,
				});
			})
			.catch((e) => {
				console.log('comp e ', e);
			})

		/*
		fetch('/fetch', param)
			.then((r) => {
				console.log('r ', r);
				if (! r.status || r.status != 200) {
					throw new Error(r.status);
				}
				return r.json();
			})
			.then((r) => {
				return dispatch({
					type: 'GET_USER_LIST',
					state: 'success',
					list: r,
				});
			})
			.catch((e) => {
				dispatch({
					type: 'GET_USER_LIST',
					state: 'error',
					list: [],
				});
			});
		*/
	}
}


