import {polyfill} from 'es6-promise';
import fetch from 'isomorphic-fetch';


export const api = (opts) => {	
	return (dispatch) => {
		let type = opts.type;
		delete opts.type;

		let param = {
			method: 'POST', 
			body: JSON.stringify(opts),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		};
		dispatch({
			type: type + '_SEND'
		});
		return fetch('/fetch', param)
			.then((r) => {
				if (! r.status || r.status != 200) {
					throw new Error(r.status);
				}
				return r.json();
			})
			.then((r) => {
				r = {data: r, type: type + '_SUCCESS'}; 
				dispatch(r);
			})
			.catch((e) => {
				let ex = null;
				if (e) {
					ex = e.name + ' ' + e.message;
				}
				e = {
					type: type + '_ERROR',
					error: ex || 'Oops, something wrong!',
				}; 
				dispatch(e);
			});
	}
	
};