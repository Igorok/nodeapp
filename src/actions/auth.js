import {uniqueId} from 'lodash'


export const getAuth = (opts) => {
	let {login, password} = opts;
	let data = {
		type: 'ADD_FIELD',
		id: uniqueId(),
		login: login,
		password: password,
	}
	return data;
}

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