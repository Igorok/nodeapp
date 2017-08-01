import React from 'react'
import { getUserList } from '../../actions/user'
import { connect } from 'react-redux'



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
		this.props.dispatch(getUserList({}));
	}
	render () {
		console.log('list render');

		return <div>
			The list of users
			 {this.props.list.map((u) => {
				return <Item user={u} key={u._id} />
			})} 
		</div>
	}
}
const mapStateToProps = (state) => {
	return {
		list: state.user.list,
	}
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