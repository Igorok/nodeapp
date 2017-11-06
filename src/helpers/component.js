import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';
import xss from 'xss';

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










const getBlockArr = (cb) => {
    let arr = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'];
    arr = _.map(arr, (v) => {
        return <li key={v}>
            <a 
                href='#' 
                onClick={cb}
                data-scmd='formatblock' 
                data-svalue={v}
            >
                &lt;{v}&gt;
            </a>
        </li>
    });
    return arr;
};

const getFontArr = (cb) => {
    let arr = ['Arial', 'Arial Black', 'Courier New', 'Times New Roman'];
    arr = _.map(arr, (v) => {
        return <li key={v}>
            <a 
                href='#' 
                onClick={cb}
                data-scmd='fontname' 
                data-svalue={v}
            >
                {v}
            </a>
        </li>
    });
    return arr;
};

const getSizeArr = (cb) => {
    let arr = [
        {v: '1', desc: 'Very small'},
        {v: '2', desc: 'A bit small'},
        {v: '3', desc: 'Normal'},
        {v: '4', desc: 'Medium-large'},
        {v: '5', desc: 'Big'},
        {v: '6', desc: 'Very big'},
        {v: '7', desc: 'Maximum'},
    ];
    arr = _.map(arr, (v) => {
        return <li key={v.v}>
            <a 
                href='#' 
                onClick={cb}
                data-scmd='fontsize' 
                data-svalue={v.v}
            >
                {v.desc}
            </a>
        </li>
    });
    return arr;
};

const getColorArr = (cb) => {
    var arr = [
        "#ac725e",
        "#d06b64",
        "#f83a22",
        "#fa573c",
        "#ff7537",
        "#ffad46",
        "#42d692",
        "#16a765",
        "#7bd148",
        "#b3dc6c",
        "#fbe983",
        "#fad165",
        "#92e1c0",
        "#9fe1e7",
        "#9fc6e7",
        "#4986e7",
        "#9a9cff",
        "#b99aff",
        "#c2c2c2",
        "#cabdbf",
        "#cca6ac",
        "#f691b2",
        "#cd74e6",
        "#a47ae2",
        "#ffffff",
        "#000000",
        '#555',
    ];
    arr = _.chunk(arr, 5);

    let colorA = (arr) => {
        return _.map(arr, (v) => {
            return <a 
                key={v}
                href='#' 
                onClick={cb}
                data-scmd='forecolor' 
                data-svalue={v}
                className='colorItem'
                style={{backgroundColor: v}}
            >
            </a>
        });
    };
    arr = _.map(arr, (v, i) => {
        return  <li key={i}>
           {colorA(v) }
        </li>
    });

    return arr;
};


/**
 * check a sum of two numbers
 * @param {Function} cb - callback to use a result of validation
 */
export class TextEditor extends React.Component {
    constructor(props) {
        super(props);

        this.blockArr = getBlockArr(::this.execCommand);
        this.fontArr = getFontArr(::this.execCommand);
        this.sizeArr = getSizeArr(::this.execCommand);
        this.colorArr = getColorArr(::this.execCommand);

        this.state = {
            text: '',
            modeSrc: false,
            description: this.props.description,
        };
    }
    componentWillReceiveProps (newProps) {
        this.setState({
            description: newProps.description,
            cb: newProps.cb,
        });
    }

    shouldComponentUpdate (nextProps, nextState) {
        let upd = (
            (
                nextProps.description !== this.props.description &&
                nextProps.description !== this.state.description
            ) ||
            this.state.modeSrc !== nextState.modeSrc
        );
        return upd;
    }

    switchMode (e) {
        let text = null;
        let checked = e.target.checked;

        if (checked) {
            text = _.escape(this.state.description);
        } else {
            text = xss(_.unescape(this.state.description))
        }

        this.setState({
            modeSrc: checked,
            description: text,
        });
    }
    execCommand (e) {
        e.preventDefault();
        let sCmd = e.currentTarget.dataset.scmd;
        let sValue = e.currentTarget.dataset.svalue || null;
        document.execCommand(sCmd, false, sValue); 
    }
    getContent (e) {
        let text = null;
        if (this.state.modeSrc) {
            text = e.target.innerText;
        } else {
            text = e.target.innerHTML;
        }
        this.setState({description: text}, () => {
            this.props.cb(text);
        });
    }

    render () {
        return <div>
            <div className='toolBar'>
                <div className="btn-group">
                    <button 
                        className="btn btn-default btn-sm dropdown-toggle" 
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
                        {this.blockArr}
                    </ul>
                </div>

                <div className="btn-group">
                    <button 
                        className="btn btn-default btn-sm dropdown-toggle" 
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
                        {this.fontArr}
                    </ul>
                </div>

                <div className="btn-group">
                    <button 
                        className="btn btn-default btn-sm dropdown-toggle" 
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
                        {this.sizeArr}
                    </ul>
                </div>

                <div className="btn-group">
                    <button 
                        className="btn btn-default btn-sm dropdown-toggle" 
                        type="button" 
                        id="dropdownColor" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="true"
                    >
                        Font color&nbsp;
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownColor">
                        {this.colorArr}
                    </ul>
                </div>

                <button 
                    className="btn btn-default btn-sm"
                    type="button"
                    data-scmd='removeFormat'
                    onClick={::this.execCommand}
                >
                    <span className='glyphicon glyphicon-erase'></span>
                </button>

                <button 
                    className="btn btn-default btn-sm"
                    type="button"
                    data-scmd='bold'
                    onClick={::this.execCommand}
                >
                    <span className='glyphicon glyphicon-bold'></span>
                </button>

                <button 
                    className="btn btn-default btn-sm"
                    type="button"
                    data-scmd='italic'
                    onClick={::this.execCommand}
                >
                    <span className='glyphicon glyphicon-italic'></span>
                </button>

                <button 
                    className="btn btn-default btn-sm"
                    type="button"
                    data-scmd='justifyleft'
                    onClick={::this.execCommand}
                >
                    <span className='glyphicon glyphicon-align-left'></span>
                </button>
                <button 
                    className="btn btn-default btn-sm"
                    type="button"
                    data-scmd='justifycenter'
                    onClick={::this.execCommand}
                >
                    <span className='glyphicon glyphicon-align-center'></span>
                </button>
                <button 
                    className="btn btn-default btn-sm"
                    type="button"
                    data-scmd='justifyright'
                    onClick={::this.execCommand}
                >
                    <span className='glyphicon glyphicon-align-right'></span>
                </button>

            </div>
            <br />
            <div id="contenteditable"
                className='form-control textEditor'
                onInput={::this.getContent} 
                onBlur={::this.getContent}
                contentEditable
                dangerouslySetInnerHTML={{__html: this.state.description}}
            >
            </div>
            <div className="checkbox">
                <label>
                    <input 
                        type="checkbox" 
                        name="switchMode" 
                        id="switchMode" 
                        onChange={::this.switchMode}
                        checked={this.state.modeSrc}
                    /> 
                    Show HTML
                </label>
            </div>
        </div>;
    }

}

/*
<div id="contenteditable"
    className='form-control textEditor'
    onInput={::this.getContent} 
    onBlur={::this.getContent}
    contentEditable
    dangerouslySetInnerHTML={{__html: this.state.description}}
>

post -> (description)
    (description) -> component 


*/

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



