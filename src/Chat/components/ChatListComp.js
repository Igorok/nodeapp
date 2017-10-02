import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Select from 'react-select';

import {api} from '../../helpers/action'
import {Alert} from '../../helpers/component'


import UserLoginComp from '../../User/UserLoginComp'

const groupChange = (opts) => {
	let prop = {
		_id: opts._id,
		users: opts.users,
	}
	if (opts._id.toString() == '-1') {
		prop.type = 'GROUP_ADD';
		prop.fetch = 'chat.addChatGroup';
	} else {
		prop.type = 'GROUP_EDIT';
		prop.fetch = 'chat.editChatGroup';
	}

	console.log('prop ', prop);
	api(prop);
}

class GroupForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: false,
			value: [],
			options: [],
		};
	}
	componentWillReceiveProps (newProps) {
		this.state = {
			options: _.map(newProps.friendList.list, (v) => {
				return {
					value: v._id,
					label: v.login,
				};
			}),
			value: _.map(newProps.users, (v) => {
				return {
					value: v._id,
					label: v.login,
				};
			}),
		};
	}
	// set state
	chatChange (value) {
		this.setState({ value });
	}
	// submit chat group form
	chatSave (e) {
		e.preventDefault();
		var opts = {
			_id: this.props._id,
			users: _.map(this.state.value, (v) => {
				return v.value
			}),

		};
		console.log('opts ', opts);
		this.props.groupUpdate(opts)
	}


	render () {
		return <div className='row'>	
			<div className='col-xs-10'>
				<Select
					name = "form-field-name"
					value = "one"
					multi = {true}
					options = {this.state.options}
					onChange = {::this.chatChange}
					value={this.state.value}
				/>
			</div>
			<div className='col-xs-2'>
				<button className='btn btn-success' onClick={::this.chatSave}>
					<span className='glyphicon glyphicon-ok'></span>
				</button>
			</div>
		</div>
	}
}
class ChatItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: false,
		};
	}
	// show/hide form
	chatEdit (e) {
		e.preventDefault();
		this.setState({
			edit: ! this.state.edit,
		});
	}
	render () {
		let editBtn = null,
			select = null;
		let link = this.props.item.type === 'group' ? 
			'/chat-group/' + this.props.item._id :
			'/chat-personal/' + this.props.item._id;

		if (this.props.item.type === 'group' && this.props.item.creator) {
			editBtn = <button 
					className='btn btn-default'
					onClick={::this.chatEdit}
				>
					<span className='glyphicon glyphicon-cog'></span>
				</button>
			
			select = <div className={! this.state.edit ? 'hidden' : ''}>
					<GroupForm 
						friendList = {this.props.friendList}
						users = {this.props.item.users}
						_id = {this.props.item._id}
						groupUpdate = {this.props.groupUpdate}
					/>
				</div>
		}

		return <tr>
			<td>
				<div 
					className={this.state.edit ? 'hidden' : ''}
				>
					<UserLoginComp users={this.props.item.users} />
				</div>
				{select}
			</td>
			<td className='chat-btn-td'>
				<a href={link} className='btn btn-default'>
					<span className='glyphicon glyphicon-envelope'></span>
				</a>
				&nbsp;
				{editBtn}
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
	groupUpdate (opts) {
		let prop = {
			_id: opts._id,
			users: opts.users,
		}
		if (opts._id.toString() == '-1') {
			prop.type = 'GROUP_ADD';
			prop.fetch = 'chat.addChatGroup';
		} else {
			prop.type = 'GROUP_EDIT';
			prop.fetch = 'chat.editChatGroup';
		}
		
		this.props.dispatch(api(prop));
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
					groupUpdate={::this.groupUpdate} 
					friendList={this.props.friendList} 
					_id_user = {this.props.auth._id}
				/>
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
	return {...state}
}
const mapDispatchToProps = (dispatch) => {
	return {
		dispatch: dispatch,
		groupChange: bindActionCreators(groupChange, dispatch)
	}
}
ChatListComp = connect(mapStateToProps, mapDispatchToProps)(ChatListComp)

export default ChatListComp