// import { browserHistory } from 'react-router'
import {Router} from 'react-router'

console.log('Router ', Router);

export const redirect = store => next => action => {
	// if (action.type === 'ROUTING') {
	// 	browserHistory[action.payload.method](action.payload.nextUrl)
	// }

	console.log(
		'action ', action
	);

	return next(action);
}
