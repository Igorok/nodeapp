import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import GroupComp from './Chat/components/GroupComp'

import auth from './Auth/AuthRed'
import chatGroup from './Chat/reducers/GroupRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	chatGroup: chatGroup,
});

let Comp = layout(GroupComp, true);
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)