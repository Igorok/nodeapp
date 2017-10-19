import React from 'react'
import { connect } from 'react-redux'
// import {push} from 'react-router-redux'

import {api} from '../helpers/action'
import {Alert} from '../helpers/component'


class RegComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            email: '',
            password: '',
            confPassword: '',
        }
    }
    
    componentDidMount() {
        if (this.props.auth.isAuthenticated) return window.location = '/';
    }

    changeField (e) {
        let stateObj = {};
		stateObj[e.target.id] = e.target.value;
		this.setState(stateObj);
    }
    formSubmit (e) {
        e.preventDefault();

        console.log(
            'this state ', this.state
        );

        // this.props.dispatch(api({
        //     type: 'REG',
        //     fetch: 'user.registration',
        //     login: this.state.login,
        //     email: this.state.email,
        //     password: this.state.password,
        // }));
    }

    componentDidUpdate () {
        if (this.props.reg.status === 'success') {
            setTimeout(() => {
                return window.location = '/';
            }, 1000);
        }
    }

    render () {
        console.log('qwe');

        let disabled = null,
            alertOpts = null;
    
        if (this.props.reg.status === 'error') {
            alertOpts = {
                className: 'danger',
                text: this.props.reg.error || 'Error, wrong login or password'
            }
        } else if (this.props.reg.status === 'send') {
            disabled = 'disabled';
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        } else if (this.props.reg.status === 'success') {
            alertOpts = {
                className: 'success',
                text: 'Loginned successfully',
            }
        }

        return <div className="row">
            <div className="col-lg-offset-4 col-lg-4">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Authentication</h3>
                    </div>
                    <div className="panel-body">
                        <Alert opts={alertOpts} />
                        <form onSubmit={::this.formSubmit}>
                            <div className="form-group">
                                <label htmlFor="login">Login</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="login" 
                                    placeholder="Login" 
                                    defaultValue={this.state.login}
                                    onChange={::this.changeField}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    placeholder="Email" 
                                    defaultValue={this.state.email}
                                    onChange={::this.changeField}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Password" 
                                    defaultValue={this.state.password}
                                    onChange={::this.changeField}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confPassword">Confirm password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="confPassword" 
                                    placeholder="Confirm password" 
                                    defaultValue={this.state.confPassword}
                                    onChange={::this.changeField}
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-default btn-block"
                                disabled={disabled}
                            >Submit</button>
                        </form>
                        <br />
                        <p className='text-center'>
                            <a href='/login'>Authorisation</a>
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    }
}
const mapStateToProps = (state) => {
    return {...state}
}
RegComp = connect(mapStateToProps)(RegComp)

export default RegComp