import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import ListComp from './MyBlog/MyListComp'

import auth from './Auth/AuthRed'
import blogList from './MyBlog/MyListRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	blogList: blogList,
});

let Comp = layout(ListComp);
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)