import React from 'react';
import {Redirect} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {connect} from 'react-redux';
import {InputLabel} from '@material-ui/core';

import {login} from '../actions/auth';

/**
 * The staff login allows only staff to 
 * login and redirects them to the staff home page.
 *
 * @author Charlotte McVicar and Lucy Williams
 * @version 2.0
 */

const required = (input) => {
    if (!input) {
        return (
            <div className="alert alert-danger" role='alert'>
                This field cannot be left blank.
            </div>
        );
    }
}

class StaffLoginForm extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          username: '',
          password: '',
          loading: false,
          usernamemsg: '',
          formmsg: ''
        };

        this.usernameInput = this.usernameInput.bind(this);
        this.passwordInput = this.passwordInput.bind(this);
        this.logStaffIn = this.logStaffIn.bind(this);
    }

    usernameInput = (usernameInputEvent) => {
        this.setState(
            {username: usernameInputEvent.target.value}
        );

        if ((!(this.state.username.startsWith("n")))) {
            this.setState(
                {usernamemsg: <div className="alert alert-danger" role='alert'>
                    Enter a valid staff username.
                </div>}
            );
        } else {
            this.setState(
                {usernamemsg: ''}
            );
        }
    }

    passwordInput = (passwordInputEvent) => {
        this.setState(
            {password: passwordInputEvent.target.value}
        );
    }

    logStaffIn = (logStaffInEvent) => {
        logStaffInEvent.preventDefault();

        this.setState(
            {
                loading: true,
                formmsg: ''
            }
        );

        this.form.validateAll();

        const{username, password} = this.state;
        const{dispatch, history} = this.props;

        if ((this.checkBtn.context._errors.length === 0) && (username.startsWith("n"))) {
            dispatch(login(username, password)).then(() => {
                history.push("/staff/home");
                window.location.reload();
            }).catch(() => {
                this.setState(
                    {
                        loading: false,
                        formmsg: <div className="alert alert-danger" role='alert'>
                            Invalid username/password.
                        </div>
                    }
                );
            });
        } else {
            this.setState(
                {
                    loading: false,
                    formmsg: <div className="alert alert-danger" role='alert'>
                        Invalid username/password.
                    </div>
                }
            );
        }
    }

    render() {
        const{username, usernamemsg, password, formmsg, loading} = this.state;
        const{loggedIn, message} = this.props;

        if (loggedIn) {
            return <Redirect to="/staff/home"/>
        }

        return(
            <div>
                <h1>Staff Login</h1>
                <Form onSubmit={this.logStaffIn} ref={(c) => {this.form = c}}>
                    <div>
                        <InputLabel id="username">Username:</InputLabel>
                        <Input labelId="username" type='text' value={username} onChange={this.usernameInput} validations={[required]}/>
                    </div>
                    {usernamemsg}
                    <br/>
                    <div>
                        <InputLabel id="password">Password:</InputLabel>
                        <Input labelId="password" type='password' value={password} onChange={this.passwordInput} validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <button disabled={loading}><span>Login</span>{loading && (<span className="spinner-border spinner-border-sm"/>)}</button>
                    </div>
                    <br/>
                    {message && (
                        <div className="alert alert-danger" role='alert'>
                            {message}
                        </div>
                    )}
                    <CheckButton style={{display: 'none'}} ref={(c) => {this.checkBtn = c}}/>
                    <br/>
                    {formmsg}
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const{loggedIn} = state.auth;
    const{message} = state.message;
    return{
        loggedIn,
        message
    };
}

export default connect(mapStateToProps)(StaffLoginForm);