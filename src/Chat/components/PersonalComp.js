import React from 'react'
import { connect } from 'react-redux'
import client from 'socket.io-client'

import {Alert} from '../../helpers/component'
import {joinPers, err, message} from '../PersonalAct'
import UserLoginComp from '../../User/UserLoginComp'
import MsgListComp from './MsgListComp'
import MsgFormComp from './MsgFormComp'

class ChatPersComp extends React.Component {
	constructor(props) {
		super(props);
		
		this.io = client(window.location.host);

		this.io.on('joinPers', (r) => {
			this.props.dispatch(joinPers(r));
		});

		this.io.on('message', (r) => {
			this.props.dispatch(message(r));
		});

		this.io.on('err', (e) => {
			if (e && e.toString() === '403') {
				localStorage.removeItem('user');
				return window.location = '/login'
			}
			this.props.dispatch(err({
				error: e,
			}));
		});
	}
	emitMessage (msg) {		
		let p = {
			token: this.props.auth.token,
			uId: this.props.chatPersonal.userId,
			rId: this.props.chatPersonal.roomId,
			msg: msg,
		}
		this.io.emit('message', p);
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


		// col-md-4
		return <div>
			<Alert opts={alertOpts} />
			<UserLoginComp users={this.props.chatPersonal.users} />
			<br />
			<MsgListComp messages={this.props.chatPersonal.messages} />
			<MsgFormComp emitMessage={::this.emitMessage} />
		</div>
		
	}
}
const mapStateToProps = (state) => {
	return {...state}
}
ChatPersComp = connect(mapStateToProps)(ChatPersComp)

export default ChatPersComp