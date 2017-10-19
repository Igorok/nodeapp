import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import auth from './Auth/AuthRed'
import RegComp from './Auth/RegComp'

import reg from './Auth/RegRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	reg: reg,
});

let Comp = layout(RegComp);
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)