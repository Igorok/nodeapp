import PropTypes from 'prop-types'
import React, {Component} from 'react'

export default class AuthForm extends Component {
	constructor(props) {
		super(props);
		this.state = {...this.props};

		console.log('this.state ', this.state);
	}
	onsub (e) {
		e.preventDefault();
		console.log('submit ', e);

	}
	changeLogin (e) {
		e.preventDefault();
		console.log('changeLogin ', e.target.value);
		this.setState({login: e.target.value});
	}
	render () {
		return <div className='page'>
			<form onSubmit={::this.onsub}>
				<input
					type='text'
					value={this.state.login}
					onChange={::this.changeLogin}
					placeholder='введите значение'
				/>
				<input type='submit' value='submit' />
			</form>
		</div>
	}
}
// Page.propTypes	=	{
// 	year:	PropTypes.number.isRequired,
// 	photos:	PropTypes.array.isRequired,
// 	getPhotos:	PropTypes.func.isRequired
// }
