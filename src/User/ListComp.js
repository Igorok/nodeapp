import React from 'react'
import { connect } from 'react-redux'
import {api} from '../helpers/action'
import {Alert} from '../helpers/component'

class UserListItem extends React.Component {
	render () {
		console.log('this.props ', this.props);
		
		return <tr>
			<td>
				<a href = {"/blog-detail/" + this.props.item._id}>
					{this.props.item.login}
				</a>
			</td>
			<td>{this.props.item.email}</td>
			<td>send message</td>
			<td>add</td>
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
	
		if (this.props.status === 'error') {
			alertOpts = {
				className: 'danger',
				text: this.props.error
			}
		} else if (this.props.status === 'send') {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		}

		if (this.props.status === 'success' && this.props.list.length) {
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