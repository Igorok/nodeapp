import PropTypes from 'prop-types'
import React, {Component} from 'react'
import { connect } from 'react-redux'

class Logins extends Component {
	constructor(props) {
		super(props);
		this.state = {...this.props};
		console.log('Logins ', this.state);
	}
	render () {
		let obj = this.props.auth || {};
		return (
			<div>
				id : {obj.id}, login: {obj.login} , password: {obj.password} <br />
			</div>
		);
	}
}

const sTop = (state) => {
	return {
		auth: state.auth
	}
}



export default connect(sTop)(Logins)