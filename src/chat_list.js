import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import ListComp from './Chat/ListComp'

import auth from './Auth/AuthRed'
import chatList from './Chat/ListRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	chatList: chatList,
});

let Comp = layout(ListComp, true);
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)