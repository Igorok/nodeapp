import React from 'react'
import ReactDOM from 'react-dom'
import 'jquery';

class MsgItemComp extends React.Component {
    render () {
        return <tr>
            <td className='td-date'>{this.props.msg.login}</td>
            <td>{this.props.msg.msg}</td>
            <td className='td-date'>{this.props.msg.fDate}</td>
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
    scrollBottom () {
        let h = $('.msg-table').height();
        $('.msg-case').scrollTop(h);
    }
    componentDidMount() {
        this.scrollBottom();
    }
    componentDidUpdate() {
        this.scrollBottom();
    }

    render () {
        let msgList = this.props.messages.map((val) => {
            return <MsgItemComp 
                msg={val} 
                key={val._id}
            />
        });
        let style = {
            height: this.state.height + 'px',
        };
        return <div style={style} className='msg-case'>
            <table className="table table-hover msg-table" >
                <tbody>
                    {msgList}
                </tbody>
            </table>
        </div>
    }
}
export default MsgListComp;