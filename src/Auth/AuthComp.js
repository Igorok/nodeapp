import React from 'react'
import { getAuth } from './AuthAct'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'


class AuthComp extends React.Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated) this.props.dispatch(push('/'));
	}
	formSubmit (e) {
		e.preventDefault();	

		this.props.dispatch(getAuth({
			login: e.target.elements.loginInput.value,
			password: e.target.elements.passwordInput.value,
		}));
	}

	render () {
		let title = null,
			disabled = null,
			disabledAlert = null,
			errorAlert = null
			;
		if (this.props.auth.status && this.props.auth.status === 'send') {
			disabled = 'disabled';
			disabledAlert = <div className="alert alert-info" role="alert">
				<strong>Loading!</strong> Please wait
			</div>
		}
		if (this.props.auth.status && this.props.auth.status === 'error') {
			errorAlert = <div className="alert alert-danger" role="alert">
				<strong>Error!</strong> Wrong login or password
			</div>
		}
		if (this.props.auth.login && this.props.auth.login.length) {
			title = <h2>Login: {this.props.auth.login}<br />
			Password: {this.props.auth.password}<br />
			Email: {this.props.auth.email}
			</h2>
		}

		return <div className="row">
			<div className="col-lg-offset-4 col-lg-4">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Authentication</h3>
					</div>
					<div className="panel-body">
						{disabledAlert}
						{errorAlert}

						<form onSubmit={::this.formSubmit}>
							<div className="form-group">
								<label htmlFor="loginInput">Login</label>
								<input 
									type="text" 
									className="form-control" 
									id="loginInput" 
									placeholder="Login" 
									defaultValue={this.props.auth.login}
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
									defaultValue={this.props.auth.password}
									disabled={disabled}
								/>
							</div>
							<button 
								type="submit" 
								className="btn btn-default btn-block"
								disabled={disabled}
							>Submit</button>
						</form>


						{title}

					</div>
				</div>
			</div>
		</div>
	}
}
const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	}
}
AuthComp = connect(mapStateToProps)(AuthComp)

export default AuthComp