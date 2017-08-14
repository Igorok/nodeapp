import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import AuthComp from './Auth/AuthComp'

import auth from './Auth/AuthRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
});

let Comp = layout(AuthComp);
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)