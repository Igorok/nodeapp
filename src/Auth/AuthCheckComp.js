import React from 'react'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'

export default function requireAuthentication(Component) {

	class AuthCheckComp extends React.Component {
		componentWillMount() {
			this.checkAuth(this.props.auth)
		}
		componentWillReceiveProps(nextProps) {
			this.checkAuth(nextProps.auth)
		}
		checkAuth(auth) {
			if (! auth.isAuthenticated) this.props.dispatch(push('/login'));
		}
		render() {
			return (
			<div>
				{this.props.auth.isAuthenticated === true
					? <Component {...this.props} />
					: null
				}
			</div>
			)
		}
	}

	function mapStateToProps(state) {
		return {
			auth: state.auth
		}
	}

	return connect(mapStateToProps)(AuthCheckComp)
}
