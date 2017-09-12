import React from 'react'
import 'jquery';

class MsgFormComp extends React.Component {
    constructor(props) {
		super(props);
	}
    componentWillMount () {
        
    }
    render () {
        return <div className="input-group chatMsgForm">
            <input type="text" className="form-control" placeholder="Message..." />
            <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                    <span className='glyphicon glyphicon-send'></span>
                </button>
            </span>
        </div>
    }
}
export default MsgFormComp;