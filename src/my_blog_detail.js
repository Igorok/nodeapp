import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import auth from './Auth/AuthRed'

// custom part
import BlogDetailComp from './MyBlog/MyDetailComp'
import blogDetail from './MyBlog/BlogDetailRed'
import postList from './MyBlog/PostListRed'

let store = createStore(
	combineReducers({
		auth: auth,
		blogDetail: blogDetail,
		postList: postList,
	}),
	compose(
		applyMiddleware(thunk),
		applyMiddleware(createLogger()),
	)
);

let Comp = layout(BlogDetailComp);
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)




