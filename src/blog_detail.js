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
import BlogListComp from './Blog/ListComp'
import blogList from './Blog/ListRed'

let store = createStore(
	combineReducers({
		auth: auth,
		blogList: blogList,
	}),
	compose(
		applyMiddleware(thunk),
		applyMiddleware(createLogger()),
	)
);

let Comp = layout(BlogListComp);
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)




