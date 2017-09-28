import React from 'react'
import 'jquery';

class MsgFormComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
        };
    }
    changeMsg (e) {
        this.setState({
            msg: e.target.value,
        });
    }
    submitMsg (e) {
        e.preventDefault();	
        if (! this.state.msg || ! this.state.msg.toString().length) {
            return false;
        }
        let msg = '' + this.state.msg;
        this.props.emitMessage(msg);
        this.setState({
            msg: '',
        });
    }
    render () {
        return <form onSubmit={::this.submitMsg}>
            <div className="input-group chatMsgForm">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Message..." 
                    onChange={::this.changeMsg}
                    value={this.state.msg}
                />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="submit">
                        <span className='glyphicon glyphicon-send'></span>
                    </button>
                </span>
            </div>
        </form>
    }
}
export default MsgFormComp;