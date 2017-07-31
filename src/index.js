/*
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import App from './components/App'

let store = configureStore()

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
*/


import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import redAuth from './reducers/auth'
import redTodos from './reducers/todos'
import redVisibilityFilter from './reducers/visibilityFilter'

import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'

import App from './components/App'
import ChatList from './components/ChatList'
import About from './components/About'

const logger = createLogger()
const history = createHistory()
const middleware = routerMiddleware(history)

let store = createStore(
	combineReducers({
		auth: redAuth,
		todos: redTodos,
		visibilityFilter: redVisibilityFilter,
		router: routerReducer
	}),
	applyMiddleware(thunk, logger, middleware)
);



ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<Route exact path="/" component={App}/>
				<Route path="/about" component={About}/>
				<Route path="/chat-list" component={ChatList}/>
				
			</div>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);
