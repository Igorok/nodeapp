import React from 'react'
import { connect } from 'react-redux'
import {Alert} from '../helpers/component'

import client from 'socket.io-client'

import {joinPers} from './PersonalAct'

class ChatPersComp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: props.initialColor
		};
		this.io = client(window.location.host);

		this.io.on('joinPers', (r) => {
			console.log('joinPers ', r);
			this.props.dispatch(joinPers(r));
		});
	}

	componentWillMount () {
		// this.props.dispatch(api({
		// 	type: 'CHAT_LIST',
		// 	fetch: 'chat.getChatList',
		// }));

		console.log('this.props ', this.props);
		this.io.emit('joinPers', {_id: this.props._id});
	}

	render () {
		let alertOpts = null,
			users = null,
			messages = null;
	
		if (
			this.props.fetch_status === 'error'
		) {
			alertOpts = {
				className: 'danger',
				text: this.props.fetch_error
			}
		} else if (
			this.props.fetch_status === 'send'
		) {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		}


		if (this.props.users.length) {
			let i = 0;
			users = this.props.users.map((val) => {
				return <span key={i++}>{val}</span>
			});
		}
		if (this.props.messages.length) {
			let i = 0;
			messages = this.props.messages.map((val) => {
				return <p key={i++}>{val}</p>
			});
		}

		console.log('render ', this.props);

		// col-md-4
		return <div>
			<Alert opts={alertOpts} />
			qwe
			<div>{users}</div>
			<div>{messages}</div>

		</div>
		
	}
}
const mapStateToProps = (state) => {
	return {...state.chatPersonal}
}
ChatPersComp = connect(mapStateToProps)(ChatPersComp)

export default ChatPersComp