// import
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'

// reducers
import redAuth from './reducers/auth'
import redTodos from './reducers/todos'
import redVisibilityFilter from './reducers/visibilityFilter'
import redUser from './reducers/user'

// components
import App from './components/App'
import About from './components/About'
import ChatList from './components/ChatList'
import UserList from './components/User/List'

// launch
const logger = createLogger()
const history = createHistory()
const middleware = routerMiddleware(history)

let store = createStore(
	combineReducers({
		auth: redAuth,
		todos: redTodos,
		visibilityFilter: redVisibilityFilter,
		user: redUser,
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
				<Route path="/user-list" component={UserList}/>
				
			</div>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);
