// import
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'

// reducers
import redTodos from './reducers/todos'
import redVisibilityFilter from './reducers/visibilityFilter'
import redUser from './reducers/user'
import redAuth from './Auth/AuthRed'

// components
import Auth from './Auth/AuthComp'
import AuthCheck from './Auth/AuthCheckComp'
import About from './components/About'
import ChatList from './components/ChatList'
import UserList from './components/User/List'

// import {redirect} from './middlewares/redirect'

const history = createHistory()
const rMiddleware = routerMiddleware(history)


let store = createStore(
	combineReducers({
		todos: redTodos,
		visibilityFilter: redVisibilityFilter,
		user: redUser,
		router: routerReducer,
		auth: redAuth,
	}),
	compose(
		applyMiddleware(thunk),
		applyMiddleware(createLogger()),
		applyMiddleware(rMiddleware),
		// applyMiddleware(redirect)
	)
	
);




ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<Route exact path="/" component={AuthCheck(About)}/>
				<Route path="/login" component={Auth}/>
				<Route exact path="/about" component={AuthCheck(About)}/>
				<Route path="/chat-list" component={AuthCheck(ChatList)}/>
				<Route path="/user-list" component={AuthCheck(UserList)}/>
				
			</div>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);
