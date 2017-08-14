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
import PostDetailComp from './Blog/PostDetailComp'
import postDetail from './Blog/PostDetailRed'

let store = createStore(
	combineReducers({
		auth: auth,
		postDetail: postDetail,
	}),
	compose(
		applyMiddleware(thunk),
		applyMiddleware(createLogger()),
	)
);

let Comp = layout(PostDetailComp);
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)




