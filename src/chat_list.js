import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css';
import 'react-select/dist/react-select.css';
import './styles/index.scss'

import {layout} from './helpers/component'
import ChatListComp from './Chat/components/ChatListComp'

import auth from './Auth/AuthRed'
import chatList from './Chat/reducers/ListRed'
import groupFrom from './Chat/reducers/GroupFormRed'
import friendList from './User/FriendRed'

import {configureStore} from './helpers/configureStore'

let store = configureStore({
	auth: auth,
	chatList: chatList,
	groupFrom: groupFrom,
	friendList: friendList,
});

let Comp = layout(ChatListComp, true);
render(
	<Provider store={store}>
		<Comp />
	</Provider>,
	document.getElementById('root')
)