// import
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'


import { Router, Route } from 'react-router'



// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'

// reducers
import redTodos from './reducers/todos'
import redVisibilityFilter from './reducers/visibilityFilter'
import redUser from './reducers/user'

import auth from './Auth/AuthRed'
import blogList from './Blog/ListRed'

// components
import AuthComp from './Auth/AuthComp'
import BlogListComp from './Blog/ListComp'
import BlogDetailComp from './Blog/DetailComp'


import About from './helpers/components/About'
import ChatList from './helpers/components/ChatList'
import UserList from './helpers/components/User/List'

import {layout} from './helpers/component'


import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss'

// import {redirect} from './middlewares/redirect'

const history = createHistory()


// const rMiddleware = routerMiddleware(history)


let store = createStore(
	combineReducers({
		todos: redTodos,
		visibilityFilter: redVisibilityFilter,
		user: redUser,

		// router: routerReducer,
		auth: auth,
		blogList: blogList,
	}),
	compose(
		applyMiddleware(thunk),
		applyMiddleware(createLogger()),
		// applyMiddleware(rMiddleware),
		// applyMiddleware(redirect)
	)
	
);




ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<div>
				<Route exact path="/" component={layout(BlogListComp)} />
				<Route path="/login" component={AuthComp} />

				<Route exact path="/blog-list" component={layout(BlogListComp)} />
				<Route exact path="/blog-detail/:blogId" component={layout(BlogDetailComp)} />

				<Route exact path="/about" component={layout(About)} />

				<Route path="/chat-list" component={layout(ChatList, true)} />
				<Route path="/user-list" component={layout(UserList, true)} /> 
			</div>

		</Router>
	</Provider>,
	document.getElementById('root')
)
