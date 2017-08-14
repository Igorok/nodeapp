import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'

export const configureStore = (reducerObj) => {
	return createStore(
		combineReducers(reducerObj),
		compose(
			applyMiddleware(thunk),
			applyMiddleware(createLogger()),
		)
	);
};
