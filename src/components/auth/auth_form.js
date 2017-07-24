import PropTypes from 'prop-types'
import React, {Component} from 'react'
import * as auth from '../../actions/auth'

export default class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {...this.props};

		console.log('this.state ', this.state);
	}
	render () {
		return <div className='page'>
			<form onSubmit={::this.state.onsub}>
				<input
					type='text'
					value={this.state.login}
					onChange={::this.state.changeLogin}
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
