import React from 'react'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'

import {api} from '../action'
import {Alert} from '../component'


class AuthComp extends React.Component {
	componentDidMount() {
		if (this.props.isAuthenticated) this.props.dispatch(push('/'));
	}
	formSubmit (e) {
		e.preventDefault();	

		this.props.dispatch(api({
			type: 'AUTH',
			fetch: 'user.getAuth',
			login: e.target.elements.loginInput.value,
			password: e.target.elements.passwordInput.value,
		}));
	}

	componentDidUpdate () {
		if (this.props.status === 'success') {
			setTimeout(() => {
				this.props.dispatch(push('/'));
			}, 2000);
		}
	}

	render () {
		let disabled = null,
			alertOpts = null;
	
		if (this.props.status === 'error') {
			alertOpts = {
				className: 'danger',
				text: this.props.error || 'Error, wrong login or password'
			}
		} else if (this.props.status === 'send') {
			disabled = 'disabled';
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		} else if (this.props.status === 'success') {
			alertOpts = {
				className: 'success',
				text: 'Loginned successfully',
			}
		}

		return <div className="row">
			<div className="col-lg-offset-4 col-lg-4">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Authentication</h3>
					</div>
					<div className="panel-body">
						<Alert opts={alertOpts} />

						<form onSubmit={::this.formSubmit}>
							<div className="form-group">
								<label htmlFor="loginInput">Login</label>
								<input 
									type="text" 
									className="form-control" 
									id="loginInput" 
									placeholder="Login" 
									defaultValue={this.props.login}
									disabled={disabled}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="passwordInput">Password</label>
								<input 
									type="password" 
									className="form-control" 
									id="passwordInput" 
									placeholder="Password" 
									defaultValue={this.props.password}
									disabled={disabled}
								/>
							</div>
							<button 
								type="submit" 
								className="btn btn-default btn-block"
								disabled={disabled}
							>Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	}
}
const mapStateToProps = (state) => {
	return {...state.auth}
}
AuthComp = connect(mapStateToProps)(AuthComp)

export default AuthComp