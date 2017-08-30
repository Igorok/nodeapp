import React from 'react'
import { connect } from 'react-redux'
import {api} from '../helpers/action'
import {Alert} from '../helpers/component'



class ChatItem extends React.Component {
	render () {
		return <tr>
			<td>
				_id: {this.props.item._id}
				type: {this.props.item.type}
			</td>
			
			<td>
				<button 
					className="btn btn-default" 
				>
					<span className='glyphicon glyphicon-envelope'></span>
				</button>
			</td>
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