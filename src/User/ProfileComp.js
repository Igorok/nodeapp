import React from 'react'
import { connect } from 'react-redux'

import {api} from '../helpers/action'
import {Alert} from '../helpers/component'


class Info extends React.Component {
	render () {
		return <div className="row">
			<div className="col-sm-3">
				<div className="panel panel-default">
					<div className="panel-heading">
						<span className="glyphicon glyphicon-bookmark"></span>&nbsp;&nbsp;
						<a href="#">My blogs</a>
					</div>
					<div className="panel-body">
						{this.props.profile.countBlogs}
					</div>
				</div>
			</div>

			<div className="col-sm-3">
				<div className="panel panel-default">
					<div className="panel-heading">
						<span className="glyphicon glyphicon-user"></span>&nbsp;&nbsp;
						<a href="#">My friends</a>
					</div>
					<div className="panel-body">
						Friends : {this.props.profile.friends}
						<br/>
						Requests : {this.props.profile.friendRequests}
						<br/>
						My Requests : {this.props.profile.selfFriendRequests}
						<br/>
					</div>
				</div>
			</div>

			<div className="col-sm-3">
				<div className="panel panel-default">
					<div className="panel-heading">
						<span className="glyphicon glyphicon-envelope"></span>&nbsp;&nbsp;
						<a href="/chat-list">My chats</a>
					</div>
					<div className="panel-body">
						{this.props.profile.countChats}
					</div>
				</div>
			</div>
		</div>
	}
}

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: this.props.profile.login,
			email: this.props.profile.email,
		};
	}

	formSubmit (e) {
		e.preventDefault();
		this.props.dispatch(api({
			type: 'EDIT_PROFILE',
			fetch: 'user.editCurrentProfile',
			login: this.state.login,
			email: this.state.email,
		}));
	}

	fieldChange (e) {
		let stateObj = {};
		stateObj[e.target.id] = e.target.value
		this.setState(stateObj);
	}

	componentWillReceiveProps (newProps) {
		this.setState({
			login: newProps.profile.login,
			email: newProps.profile.email,
		});
	}
	render () {
		return <div className="panel panel-default">
			<div className="panel-heading">
				<span className="glyphicon glyphicon-cog"></span>&nbsp;&nbsp;
				Edit my profile
			</div>
			<div className="panel-body">
				<form onSubmit={::this.formSubmit}>
					<div className="form-group">
						<label htmlFor="login">Password</label>
						<input 
							type="text" 
							className="form-control" 
							id="login" 
							placeholder="Login"
							value={this.state.login}
							onChange={::this.fieldChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email address</label>
						<input 
							type="email" 
							className="form-control" 
							id="email" 
							placeholder="Email"
							value={this.state.email}
							onChange={::this.fieldChange}
						/>
					</div>
					<button type="submit" className="btn btn-default">Submit</button>
				</form>
			</div>
		</div>
	}
};

class ProfileComp extends React.Component {
	componentWillMount () {
		this.props.dispatch(api({
			type: 'GET_PROFILE',
			fetch: 'user.getCurrentProfile',
		}));
	}
	componentWillReceiveProps (newProps) {
		if (newProps.profile.status === 'edit_success') {
			newProps.dispatch(api({
				type: 'GET_PROFILE',
				fetch: 'user.getCurrentProfile',
			}));
		}
	}

	render () {
		let alertOpts = null;
		if (
			this.props.profile.status === 'error' ||
			this.props.profile.status === 'edit_error'
		) {
			alertOpts = {
				className: 'danger',
				text: this.props.profile.error || this.props.profile.error
			}
		} else if (this.props.profile.status === 'send') {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		} else if (this.props.profile.status === 'edit_success') {
			alertOpts = {
				className: 'success',
				text: 'The profile updated successfully',
			}
		}
		
		return <div>
			<Alert opts={alertOpts} />
			<Form profile={this.props.profile} dispatch={this.props.dispatch} />
			<Info profile={this.props.profile} />
		</div>
	}
}
const mapStateToProps = (state) => {
	return {...state}
}
ProfileComp = connect(mapStateToProps)(ProfileComp)

export default ProfileComp