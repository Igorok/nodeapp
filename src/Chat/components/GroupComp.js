import React from 'react'
import { connect } from 'react-redux'
import client from 'socket.io-client'

import {Alert} from '../../helpers/component'
import {joinGrp, err, message} from '../ChatAct'
import UserLoginComp from '../../User/UserLoginComp'
import MsgListComp from './MsgListComp'
import MsgFormComp from './MsgFormComp'

class ChatPersComp extends React.Component {
	constructor(props) {
		super(props);
		
		this.io = client(window.location.host);

		this.io.on('joinGroup', (r) => {
            console.log('joinGroup ', r);

			this.props.dispatch(joinGrp(r));
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
			// uId: this.props.chatGroup.userId,
			rId: this.props.chatGroup.roomId,
			msg: msg,
		}
		this.io.emit('message', p);
	}
	componentWillMount () {
		let p = {
			token: this.props.auth.token,
			roomId: this.props.chatGroup.roomId,
        }
        console.log('emit ', p);

		this.io.emit('joinGroup', p);
	}

	render () {
		let alertOpts = null,
			users = null,
			messages = null;
	
		if (
			this.props.chatGroup.fetch_status === 'error'
		) {
			alertOpts = {
				className: 'danger',
				text: this.props.chatGroup.fetch_error
			}
		} else if (
			this.props.chatGroup.fetch_status === 'send'
		) {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		}


		// col-md-4
		return <div>
			<Alert opts={alertOpts} />
			<UserLoginComp users={this.props.chatGroup.users} />
			<br />
			<MsgListComp messages={this.props.chatGroup.messages} />
			<MsgFormComp emitMessage={::this.emitMessage} />
		</div>
		
	}
}
const mapStateToProps = (state) => {
	return {...state}
}
ChatPersComp = connect(mapStateToProps)(ChatPersComp)

export default ChatPersComp