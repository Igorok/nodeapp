import React from 'react'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'


/**
 * boostrap message
 * @param {String} className - success, info, warning, danger
 * @param {String} text - the text of the message
 */
export class Alert extends React.Component {
	render () {
		let tpl = null;
		if (
			this.props.opts && 
			this.props.opts.className && 
			this.props.opts.text
		) {
			let className = "alert alert-" + this.props.opts.className;
			tpl = <div className={className} role="alert">
				{this.props.opts.text}
			</div>
		}
		return tpl;
	}
}

export class SideNav extends React.Component {
	render () {		
		let profileItem = null;
		let userItem = null;
		let chatItem = null;

		if (this.props.auth.isAuthenticated) {
			profileItem = <li role="presentation">
				<a href="/profile">
					<span className="glyphicon glyphicon-home"></span>
					&nbsp;&nbsp;Profile
					({this.props.auth.login})
				</a>
			</li>
			userItem = <li role="presentation">
				<a href="/user-list"><span className="glyphicon glyphicon-user"></span>&nbsp;&nbsp;Users</a>
			</li>
			chatItem = <li role="presentation">
				<a href="/chat-list"><span className="glyphicon glyphicon-envelope"></span>&nbsp;&nbsp;Chats</a>
			</li>
		}		

		return <ul className="nav nav-pills nav-stacked">
			{profileItem}
			<li role="presentation">
				<a href="/"><span className="glyphicon glyphicon-exclamation-sign"></span>&nbsp;&nbsp;About</a>
			</li>
			<li role="presentation">
				<a href="/blog-list"><span className="glyphicon glyphicon-bookmark"></span>&nbsp;&nbsp;Blogs</a>
			</li>
			{userItem}
			{chatItem}
			
		</ul>
	}
}

/**
 * function to render layout
 * @param {Class} Component - React.Component that need to render 
 * @param {*} forAuthenticated - this component only for authenticated users
 */
export function layout (Component, forAuthenticated = false) {
	class Layout extends React.Component {
		componentWillMount() {
			this.checkAuth(this.props.auth)
		}
		componentWillReceiveProps(nextProps) {
			this.checkAuth(nextProps.auth)
		}
		checkAuth(auth) {
			// if this page only for authenticated users and the storage has no isAuthenticated
			if (forAuthenticated && ! auth.isAuthenticated) {
				return window.location = '/';
			}
		}
		render() {
			return (
				<div>
					<div className="row">
						<div className="col-md-2">
							<SideNav auth={this.props.auth}/>
						</div>
						<div className="col-md-10">
							<Component />
						</div>
					</div>
				</div>
			)
		}
	}

	function mapStateToProps(state) {
		return {
			auth: state.auth
		}
	}

	return connect(mapStateToProps)(Layout)
}



