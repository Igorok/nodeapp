import {map} from 'lodash'

import React from 'react'
import { connect } from 'react-redux'
import {api} from '../helpers/action'
import {Alert} from '../helpers/component'

import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';


class ChatGroupForm extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			value: [],
        };
    }



	logChange (value) {
		console.log('this.state ', this.state);

		console.log("Selected 1: " + JSON.stringify(value));
		this.setState({ value });
	}

	render () {

		var options = map(this.props.friendList.list, (v) => {
			return {
				value: v._id,
				label: v.login,
			}
		});

		console.log('options ', options);

		return <div>
			<Select
				name = "form-field-name"
				value = "one"
				multi = {true}
				options = {options}
				onChange = {::this.logChange}
				value={this.state.value}
			/>
			<br />
		</div>
	}
}
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

		this.props.dispatch(api({
			type: 'FRIEND_LIST',
			fetch: 'user.getFriendList',
		}));
	}

	render () {
		let alertOpts = null,
			chats = null;
	
		if (
			this.props.chatList.fetch_status === 'error'
		) {
			alertOpts = {
				className: 'danger',
				text: this.props.chatList.fetch_error
			}
		} else if (
			this.props.chatList.fetch_status === 'send'
		) {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		}

		if (this.props.chatList.list.length) {
			chats = this.props.chatList.list.map((val) => {
				return <ChatItem item={val} key={val._id} />
			});
		}

		// col-md-4
		return <div>
			<Alert opts={alertOpts} />
			<ChatGroupForm 
				dispatch={this.props.dispatch} 
				friendList={this.props.friendList} 
			/>

			<table className="table table-striped table-hover">
				<tbody>{chats}</tbody>
			</table>
		</div>
		
	}
}
const mapStateToProps = (state) => {
	return {...state}
}
ChatListComp = connect(mapStateToProps)(ChatListComp)

export default ChatListComp