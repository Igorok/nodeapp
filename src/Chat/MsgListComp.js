import React from 'react'
import 'jquery';

class MsgItemComp extends React.Component {
    render () {
        return <tr>
            <td>{this.props.msg.login}</td>
            <td>{this.props.msg.msg}</td>
            <td>{this.props.msg.fDate}</td>
        </tr>
    }
}
class MsgListComp extends React.Component {
    constructor(props) {
		super(props);		
        this.state = {
            height: $(window).height() - 120,
        };
	}
    componentWillMount () {
        $(window).resize(() => {
            this.setState({
                height: $(window).height() - 120,
            });
        });
        
    }
    render () {
        let msgList = this.props.messages.map((val) => {
            return <MsgItemComp msg={val} key={val._id}/>
        });
        let style = {
            height: this.state.height + 'px',
            overflowY: 'scroll',
        };
        return <div style={style}>
            <table className="table table-hover">
                <tbody>{msgList}</tbody>
            </table>
        </div>
    }
}
export default MsgListComp;