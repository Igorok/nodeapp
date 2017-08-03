import {push} from 'react-router-redux'

export const getAuth = (opts = {}) => {
	return (dispatch) => {
		dispatch({
			type: 'GET_AUTH',
			status: 'send',
			isAuthenticated: false,
		});

		let param = {
			method: 'POST', 
			body: JSON.stringify({
				fetch: 'user.getAuth',
				login: opts.login,
				password: opts.password,
			}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		};

		fetch('/fetch', param)
			.then((r) => {
				if (! r.status || r.status != 200) {
					throw new Error(r.status);
				}
				return r.json();
			})
			.then((r) => {
				localStorage.setItem('user', JSON.stringify(r));
				return dispatch({
					type: 'GET_AUTH',
					status: 'success',
					isAuthenticated: true,
					login: r.login,
					password: r.password,
					email: r.email,
				});
			})
			.then(() => {
				setTimeout(() => {
					return dispatch(push('/user-list'));
				}, 5 * 1000)
			})
			.catch((e) => {
				console.log('e ', e);
				dispatch({
					type: 'GET_AUTH',
					status: 'error',
					isAuthenticated: false,
				});
			});
	}
}
