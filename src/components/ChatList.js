import React from 'react'




class ChatGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {...this.props};
	}
	render () {
		return <div>chat {this.state.i} </div>
	}
}


class ChatList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {...this.props};
	}
	render () {
		let arr = [];
		for (let i = 0; i < 10; i++) {
			arr.push(i);
		}

		
		return <div>
			asd
			{arr.map((i) => {
				return <ChatGroup i={i} key={i}/>
			})}
		</div>
	}
}
export default ChatList