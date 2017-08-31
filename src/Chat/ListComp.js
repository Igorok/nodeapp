import React from 'react'
import { connect } from 'react-redux'
import {api} from '../helpers/action'
import {Alert} from '../helpers/component'



class ChatItem extends React.Component {
	render () {
		let link = this.props.item.type === 'group' ? 
			'/chat-group/' + this.props.item._id :
			'/chat-personal/' + this.props.item._id;
		let users = this.props.item.users.map((u) => {
			let cName = 'label label-';
			if (u.online) {
				cName += 'success';
			} else {
				cName += 'default';
			}
			return <span key={u._id} >
				<span className={cName}>{u.login}</span>&nbsp;
			</span>
		});

		return <tr>
			<td className='btn-td'>
				<a 
					className="btn btn-default" 
					href={link}
				>
					<span className='glyphicon glyphicon-envelope'></span>
				</a>
			</td>
			<td>{users}</td>
			
		</tr>
	}
}

class ChatListComp extends React.Component {
	componentWillMount () {
		this.props.dispatch(api({
			type: 'CHAT_LIST',
			fetch: 'chat.getChatList',
		}));
	}

	render () {
		let alertOpts = null,
			chats = null;
	
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

		if (this.props.list.length) {
			chats = this.props.list.map((val) => {
				return <ChatItem item={val} key={val._id} dispatch={this.props.dispatch} />
			});
		}

		// col-md-4
		return <div>
			<Alert opts={alertOpts} />
			<table className="table table-striped table-hover">
				<tbody>{chats}</tbody>
			</table>
		</div>
		
	}
}
const mapStateToProps = (state) => {
	return {...state.chatList}
}
ChatListComp = connect(mapStateToProps)(ChatListComp)

export default ChatListComp