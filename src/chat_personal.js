import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import PersonalComp from './Chat/components/PersonalComp'

import auth from './Auth/AuthRed'
import chatPersonal from './Chat/reducers/PersonalRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	chatPersonal: chatPersonal,
});

let Comp = layout(PersonalComp, true);
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)