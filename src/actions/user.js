import {polyfill} from 'es6-promise';
import fetch from 'isomorphic-fetch';


export const getUserList = () => {
	return (dispatch) => {

		dispatch({
			type: 'GET_USER_LIST',
			state: 'send',
			list: [],
		});

		let param = {
			method: 'POST', 
			body: JSON.stringify({
				fetch: 'user.getUserList'
			}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		};

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
	}
}


