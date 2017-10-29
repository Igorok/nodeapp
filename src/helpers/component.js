import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';

import 'jquery';
import 'bootstrap/dist/js/bootstrap';

/**
 * boostrap message
 * @param {String} className - success, info, warning, danger
 * @param {String} text - the text of the message
 */
export class Alert extends React.Component {
    render () {
        let tpl = null;
        if (
            this.props.opts && 
            this.props.opts.className && 
            this.props.opts.text
        ) {
            let className = "alert alert-" + this.props.opts.className;
            tpl = <div className={className} role="alert">
                {this.props.opts.text}
            </div>
        }
        return tpl;
    }
}

export class SideNav extends React.Component {
    render () {		
        let profileItem = null;
        let userItem = null;
        let chatItem = null;

        if (this.props.auth.isAuthenticated) {
            profileItem = <li role="presentation">
                <a href="/profile">
                    <span className="glyphicon glyphicon-home"></span>
                    &nbsp;&nbsp;Profile
                    ({this.props.auth.login})
                </a>
            </li>
            userItem = <li role="presentation">
                <a href="/user-list"><span className="glyphicon glyphicon-user"></span>&nbsp;&nbsp;Users</a>
            </li>
            chatItem = <li role="presentation">
                <a href="/chat-list"><span className="glyphicon glyphicon-envelope"></span>&nbsp;&nbsp;Chats</a>
            </li>
        }		

        return <ul className="nav nav-pills nav-stacked">
            {profileItem}
            <li role="presentation">
                <a href="/"><span className="glyphicon glyphicon-exclamation-sign"></span>&nbsp;&nbsp;About</a>
            </li>
            <li role="presentation">
                <a href="/blog-list"><span className="glyphicon glyphicon-bookmark"></span>&nbsp;&nbsp;Blogs</a>
            </li>
            {userItem}
            {chatItem}
            
        </ul>
    }
}

/**
 * check a sum of two numbers
 * @param {Function} cb - callback to use a result of validation
 */
export class MathCaptcha extends React.Component {
    constructor(props) {
        super(props);
        let v1 = this.getRandomInt(0, 10);
        let v2 = this.getRandomInt(0, 10);

        this.state = {
            v1: v1,
            v2: v2,
            sum: v1 + v2,
            isValid: null,
        }
    }
    getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    changeSum (e) {
        this.setState({
            isValid: parseInt(e.target.value) === this.state.sum,
        }, () => {
            if (this.props.cb && typeof(this.props.cb) === 'function') {
                this.props.cb(this.state.isValid);
            }
        });
    }
    render () {
        let formClass = 'form-group';
        if (this.state.isValid === true) {
            formClass += ' has-success';
        } else if (this.state.isValid === false) {
            formClass += ' has-error';
        }

        return <div>
            <div className='form-inline'>
                <div className={formClass}>
                    <label htmlFor="sum" className='control-label'>
                        {this.state.v1} + {this.state.v2} = 
                        &nbsp;&nbsp;
                    </label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="sum"
                        placeholder="Sum"
                        onChange={::this.changeSum}
                    />
                </div>
            </div>
            <br />
        </div>
    }
}


/**
 * check a sum of two numbers
 * @param {Function} cb - callback to use a result of validation
 */
export class TextEditor extends React.Component {
    setMode (e) {
        e.preventDefault();
        let sCmd = e.target.dataset.scmd;
        let sValue = e.target.dataset.svalue;
        console.log('sCmd, sValue ', sCmd, sValue);

        document.execCommand(sCmd, false, sValue); 
        // oDoc.focus();
    }
    render () {
        let blockArr = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'];
        blockArr = _.map(blockArr, (v) => {
            return <li key={v}>
                <a 
                    href='#' 
                    onClick={::this.setMode}
                    data-scmd='formatblock' 
                    data-svalue={v}
                >
                    &lt;{v}&gt;
                </a>
            </li>
        });
        let fontArr = ['Arial', 'Arial Black', 'Courier New', 'Times New Roman'];
        fontArr = _.map(fontArr, (v) => {
            return <li key={v}>
                <a 
                    href='#' 
                    onClick={::this.setMode}
                    data-scmd='fontname' 
                    data-svalue={v}
                >
                    &lt;{v}&gt;
                </a>
            </li>
        });
        let sizeArr = [
            {v: '1', desc: 'Very small'},
            {v: '2', desc: 'A bit small'},
            {v: '3', desc: 'Normal'},
            {v: '4', desc: 'Medium-large'},
            {v: '5', desc: 'Big'},
            {v: '6', desc: 'Very big'},
            {v: '7', desc: 'Maximum'},
        ];
        sizeArr = _.map(sizeArr, (v) => {
            return <li key={v.v}>
                <a 
                    href='#' 
                    onClick={::this.setMode}
                    data-scmd='fontsize' 
                    data-svalue={v.v}
                >
                    {v.desc}
                </a>
            </li>
        });


        return <div>
            <div className='toolBar'>
                <div className="btn-group">
                    <button 
                        className="btn btn-default dropdown-toggle" 
                        type="button" 
                        id="dropdownBlock" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="true"
                    >
                        Formatting&nbsp;
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownBlock">
                        {blockArr}
                    </ul>
                </div>

                <div className="btn-group">
                    <button 
                        className="btn btn-default dropdown-toggle" 
                        type="button" 
                        id="dropdownFont" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="true"
                    >
                        Font&nbsp;
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownFont">
                        {fontArr}
                    </ul>
                </div>

                <div className="btn-group">
                    <button 
                        className="btn btn-default dropdown-toggle" 
                        type="button" 
                        id="dropdownSize" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="true"
                    >
                        Size&nbsp;
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownSize">
                        {sizeArr}
                    </ul>
                </div>
            </div>
            <br />
            <div id="contenteditable"
                className='form-control textEditor'
                onInput={this.emitChange} 
                onBlur={this.emitChange}
                contentEditable
                dangerouslySetInnerHTML={{__html: this.props.description}}>
            </div>
            <div className="checkbox">
                <label>
                    <input 
                        type="checkbox" 
                        name="switchMode" 
                        id="switchMode" 

                    /> 
                    Show HTML
                </label>
            </div>
        </div>;
    }

}



/**
 * function to render layout
 * @param {Class} Component - React.Component that need to render 
 * @param {Boolean} forAuthenticated - this component only for authenticated users
 */
export function layout (Component, forAuthenticated = false) {
    class Layout extends React.Component {
        componentWillMount() {
            this.checkAuth(this.props.auth)
        }
        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.auth)
        }
        checkAuth(auth) {
            // if this page only for authenticated users and the storage has no isAuthenticated
            if (forAuthenticated && ! auth.isAuthenticated) {
                return window.location = '/';
            }
        }
        render() {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-2">
                            <SideNav auth={this.props.auth}/>
                        </div>
                        <div className="col-md-10">
                            <Component />
                        </div>
                    </div>
                </div>
            )
        }
    }

    function mapStateToProps(state) {
        return {
            auth: state.auth
        }
    }

    return connect(mapStateToProps)(Layout)
}



