import React, {Component} from 'react'
import Form from '../components/auth/auth_form'
import Logins from '../components/auth/logins'

import { getAuth } from '../actions/auth'
import { connect } from 'react-redux'

class AuthForm extends Component {
	constructor(props) {
		super(props);
		this.state = {...this.props};
	}
	onsub (e) {
		e.preventDefault();

		console.log(this.props);

		this.props.dispatch(getAuth({
			login: this.state.login,
			password: this.state.password,
		}));
	}
	changeField (e) {
		e.preventDefault();
		if (! e.target.dataset || ! e.target.dataset.name) {
			return false;
		}
		
		let state = {};
		state[e.target.dataset.name] = e.target.value;
		this.setState(state);
	}
	render () {
		return <div className='page'>
			<form onSubmit={::this.onsub} action="/fetch" method="post" >
				<input
					type='text'
					name='login'
					value={this.state.login}
					onChange={::this.changeField}
					placeholder='Введите значение'
					data-name = 'login'
				/>
				<br />
				<input
					type='password'
					name='password'
					value={this.state.password}
					onChange={::this.changeField}
					placeholder='Введите значение'
					data-name = 'password'
				/>
				<br />
				<input type='submit' value='submit' />
			</form>


			<Logins login={this.state.login} password={this.state.password} />
		</div>
	}
}


const mapStateToProps = (state) => {
	console.log('mapStateToProps ', state);
	return {
		login: state.auth.login,
		password: state.auth.password,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAuth: (id) => {
			dispatch(getAuth(id))
		}
	}
}

AuthForm = connect(mapStateToProps)(AuthForm)

export default AuthForm
