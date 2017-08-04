import React from 'react'
import { getUserList } from '../../actions/user'
import { connect } from 'react-redux'

import {api} from  '../../action'
import {Alert} from '../../component'


class Item extends React.Component {
	constructor(props) {
		super(props);
		this.state = {...this.props};
	}
	render () {
		return <div>Login {this.state.user.login} Email {this.state.user.email} </div>
	}
}

class List extends React.Component {
	constructor(props) {
		super(props);
		console.log('list');
	}
	componentWillMount() {
		this.props.dispatch(api({
			type: 'USER_LIST',
			fetch: 'user.getUserList',
		}));
		
	}
	render () {
		let list = null,
			alertOpts = null;
		if (this.props.status === 'error') {
			alertOpts = {
				className: 'danger',
				text: this.props.error,
			}
		} else if (this.props.status === 'send') {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait!',
			}
		}

		if (this.props.list && this.props.list.length) {
			list = this.props.list.map((u) => {
				return <Item user={u} key={u._id} />
			});
		}

		return <div>
			<Alert opts={alertOpts} />
			The list of users
			{list}
		</div>
	}
}
const mapStateToProps = (state) => {
	return {...state.user}
}
List = connect(mapStateToProps)(List)


class ListComp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {...this.props};
	}
	
	render () {
		return <div>
			Component
			<List />
		</div>
	}
}





export default ListComp