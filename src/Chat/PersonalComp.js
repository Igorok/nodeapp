import React from 'react'
import { connect } from 'react-redux'
import client from 'socket.io-client'

import {Alert} from '../helpers/component'
import {joinPers, joinErr} from './PersonalAct'
import UserListComp from './UserListComp'
import MsgListComp from './MsgListComp'
import MsgFormComp from './MsgFormComp'

class ChatPersComp extends React.Component {
	constructor(props) {
		super(props);
		
		this.io = client(window.location.host);

		this.io.on('joinPers', (r) => {
			this.props.dispatch(joinPers(r));
		});

		this.io.on('err', (e) => {
			if (e && e.toString() === '403') {
				localStorage.removeItem('user');
				return window.location = '/login'
			}
			this.props.dispatch(joinErr({
				error: e,
			}));
		});
	}

	componentWillMount () {
		let p = {
			token: this.props.auth.token,
			userId: this.props.chatPersonal.userId,
		}
		this.io.emit('joinPers', p);
	}

	render () {
		let alertOpts = null,
			users = null,
			messages = null;
	
		if (
			this.props.chatPersonal.fetch_status === 'error'
		) {
			alertOpts = {
				className: 'danger',
				text: this.props.chatPersonal.fetch_error
			}
		} else if (
			this.props.chatPersonal.fetch_status === 'send'
		) {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		}

		console.log('alertOpts ', alertOpts);

		// col-md-4
		return <div>
			<Alert opts={alertOpts} />
			<UserListComp users={this.props.chatPersonal.users} />
			<br />
			<MsgListComp messages={this.props.chatPersonal.messages} />
			<MsgFormComp />
		</div>
		
	}
}
const mapStateToProps = (state) => {
	return {...state}
}
ChatPersComp = connect(mapStateToProps)(ChatPersComp)

export default ChatPersComp