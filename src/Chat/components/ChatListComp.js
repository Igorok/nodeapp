import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import {api} from '../../helpers/action'
import {Alert} from '../../helpers/component'

import Select from 'react-select';

import UserLoginComp from '../../User/UserLoginComp'



class ChatItem extends React.Component {
	constructor(props) {
		super(props);

		console.log('ChatItem ', this.props.friendList.list);

		this.state = {
			value: [],
			options: [],
		};


		console.log(1, this.props.friendList.list);
	}
	componentWillReceiveProps (newProps) {
		this.state = {
			options: _.map(newProps.friendList.list, (v) => {
				return {
					value: v._id,
					label: v.login,
				}
			}),
			value: _.map(newProps.item.users, (v) => {
				return {
					value: v._id,
					label: v.login,
				}
			}),
		};
	}

	/*
	componentWillMount () {
		this.state = {
			value: _.map(this.props.friendList.list, (v) => {
				return {
					value: v._id,
					label: v.login,
				}
			}),
		};
	}
	componentWillReceiveProps (newProps) {
		this.state = {
			value: _.map(newProps.friendList.list, (v) => {
				return {
					value: v._id,
					label: v.login,
				}
			}),
		};
	}
	*/
	logChange (value) {
		this.setState({ value });
	}

	render () {
		let link = this.props.item.type === 'group' ? 
			'/chat-group/' + this.props.item._id :
			'/chat-personal/' + this.props.item._id;

		console.log(2, this.props.friendList.list);
		var options = _.map(this.props.friendList.list, (v) => {
			return {
				value: v._id,
				label: v.login,
			}
		});

		return <tr>
			<td>
				<UserLoginComp users={this.props.item.users} />
				<br />
				<Select
					name = "form-field-name"
					value = "one"
					multi = {true}
					options = {this.state.options}
					onChange = {::this.logChange}
					value={this.state.value}
				/>

			</td>
			<td className='chat-btn-td'>
				<a href={link} className='btn btn-default'>
					<span className='glyphicon glyphicon-envelope'></span>
				</a>
				&nbsp;
				<button className='btn btn-default'>
					<span className='glyphicon glyphicon-cog'></span>
				</button>
				&nbsp;
				<button className='btn btn-default'>
					<span className='glyphicon glyphicon-trash'></span>
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
				return <ChatItem 
					item={val} 
					key={val._id}
					dispatch={this.props.dispatch} 
					friendList={this.props.friendList} 
				/>
			});
		}


		console.log('render ', this.props.friendList.list);

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
	return {...state}
}
ChatListComp = connect(mapStateToProps)(ChatListComp)

export default ChatListComp