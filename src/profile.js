import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import ProfileComp from './User/ProfileComp'

import auth from './Auth/AuthRed'
import profile from './User/ProfileRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	profile: profile,
});

let Comp = layout(ProfileComp, true);
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)