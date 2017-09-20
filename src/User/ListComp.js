import React from 'react'
import { connect } from 'react-redux'
import {api} from '../helpers/action'
import {Alert} from '../helpers/component'



class UserListItem extends React.Component {
	getLabel (online) {
		let lbl = '';
		if (online) {
			lbl = <span className="label label-success">Online</span>;
		} else {
			lbl = <span className="label label-default">Offline</span>;
		}
		return lbl;
	}
	getFrButton (_id, friend) {
		let str = 'Add';
		if (friend === 'fr') {
			str = 'Remove'
		} else if (friend === 'fr_req') {
			str = 'Approve'
		} else if (friend === 'my_fr_req') {
			str = 'Wait of approve'
		}
		return <button 
			className="btn btn-default" 
			data-friend={friend} 
			data-id={_id}
			onClick={::this.updateFriend}
		>{str}</button>
	}
	updateFriend (e) {
		e.preventDefault();
		this.props.dispatch(api({
			type: 'FRIEND_UPDATE',
			fetch: 'user.updateFriend',
			_id: e.target.dataset.id,
			friend: e.target.dataset.friend,
		}));
	}
	render () {
		return <tr>
			<td>
				<a href = {"/user-detail/" + this.props.item._id}>
					{this.props.item.login}
				</a>
			</td>
			<td>{this.getLabel(this.props.item.online)}</td>
			<td>{this.getFrButton(this.props.item._id, this.props.item.friend)}</td>
			<td>
				<a 
					className="btn btn-default"
					href={'/chat-personal/' + this.props.item._id}
				>
					<span className='glyphicon glyphicon-envelope'></span>
				</a>
			</td>
		</tr>
	}
}

class UserListComp extends React.Component {
	componentWillMount () {
		this.props.dispatch(api({
			type: 'USER_LIST',
			fetch: 'user.getUserList',
		}));
	}

	render () {
		let alertOpts = null,
			users = null;
	
		if (
			this.props.fetch_status === 'error' ||
			this.props.fetch_status === 'error_friend'
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
			users = this.props.list.map((val) => {
				return <UserListItem item={val} key={val._id} dispatch={this.props.dispatch} />
			});
		}

		// col-md-4
		return <div>
			<Alert opts={alertOpts} />
			<table className="table table-striped table-hover">
				<tbody>{users}</tbody>
			</table>
		</div>
		
	}
}
const mapStateToProps = (state) => {
	return {...state.userList}
}
UserListComp = connect(mapStateToProps)(UserListComp)

export default UserListComp