import {uniqueId} from 'lodash';
import {polyfill} from 'es6-promise';
import fetch from 'isomorphic-fetch';

export const getAuth = (opts) => {
	return (dispatch) => {
		let {login, password} = opts;
		let data = {
			type: 'ADD_FIELD',
			id: uniqueId(),
			login: login,
			password: password,
		};

		let param = {
			method: 'POST', 
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		};

		fetch('/fetch', param)
			.then(() => {
				console.log('finish fetch');
				dispatch(data);
			});
	}
	

	/*
	console.log('data 1 ', data);
	var opts = new FormData();
	opts.append("json", JSON.stringify(data));

	fetch('/fetch', {method: 'POST', body: opts})
		.then(() => {
			console.log('finish fetch');


			console.log('data 2 ', data);


			dispatch(data);
		});
	*/
}


// export const getAuth = (opts) => {
// 	let {login, password} = opts;
// 	let data = {
// 		type: 'ADD_FIELD',
// 		id: uniqueId(),
// 		login: login,
// 		password: password,
// 	}
// 	return data;
// }

export const showFields = (login, password) => {
	return {
		type: 'SHOW_FIELDS',
		id: uniqueId(),
		login,
		password,
	}
}

// export const setVisibilityFilter = (filter) => {
// 	return {
// 		type: 'SET_VISIBILITY_FILTER',
// 		filter
// 	}
// }

// export const toggleTodo = (id) => {
// 	return {
// 		type: 'TOGGLE_TODO',
// 		id
// 	}
// }