import React, {Component} from 'react'
import Form from '../components/auth/auth_form'
import Logins from '../components/auth/logins'

import { getAuth } from '../actions/auth'
import { connect } from 'react-redux'

class AuthForm extends Component {
	constructor(props) {
		super(props);
		this.state = {...this.props};
		this.state.login = this.state.login || 'test';
		this.state.password = this.state.password || 'test';
	}
	onsub (e) {
		e.preventDefault();
		console.log('submit ', e);

	}
	changeField (e) {
		e.preventDefault();
		if (! e.target.dataset || ! e.target.dataset.name) {
			return false;
		}
		
		let state = {};
		state[e.target.dataset.name] = e.target.value;
		this.setState(state, () => {
			this.props.dispatch(getAuth({
				login: this.state.login,
				password: this.state.password,
			}));
		});		
	}
	render () {
		return <div className='page'>
			<form onSubmit={::this.onsub}>
				<input
					type='text'
					value={this.state.login}
					onChange={::this.changeField}
					placeholder='введите значение'
					data-name = 'login'
				/>
				<br />
				<input
					type='password'
					value={this.state.password}
					onChange={::this.changeField}
					placeholder='введите значение'
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
	return {
		login: state.login,
		password: state.password,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onTodoClick: (id) => {
			dispatch(toggleTodo(id))
		}
	}
}

AuthForm = connect()(AuthForm)

export default AuthForm
