import React from 'react';
import {connect} from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {InputLabel} from '@material-ui/core';

import {firstLogin} from '../actions/auth';
import {logout} from '../actions/auth';

/**
 * The admin home page displays a table of 
 * all users in the database.
 *
 * @author Lucy Williams
 * @version 1.0
 */

const required = (input) => {
    if (!input) {
        return (
            <div className="alert alert-danger" role="alert">
                This field cannot be left blank.
            </div>
        );
    }
}

const validatePassword = (input) => {
    if (!(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/.test(input))) {
        return (
            <div className="alert alert-danger" role="alert">
                Invalid password.
            </div>
        );
    }
}

class WebAdminHomePage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            newPassword: '',
            confirmPassword: '',
            passwordmsg: '',
        }
    }

    newPasswordInput = (newPasswordInputEvent) => {
        this.setState(
            {newPassword: newPasswordInputEvent.target.value}
        );
    }

    confirmPasswordInput = (confirmPasswordInputEvent) => {
        this.setState(
            {confirmPassword: confirmPasswordInputEvent.target.value}
        );
    }

    changePassword = (changePasswordEvent) => {
        changePasswordEvent.preventDefault();

        this.form.validateAll();

        // the first login function repeats on all user home pages
        // checks the database for the user's firstlogin field
        // and prompts the user to change their password on first login
        if ((this.state.newPassword === this.state.confirmPassword) && (this.checkBtn.context._errors.length === 0)) {
            this.props.dispatch(
                firstLogin(this.state.newPassword)
            ).then(() => {
                this.setState(
                    {passwordmsg: <div className="alert alert-success" role='alert'>
                        Password successfully changed.
                    </div>}
                );

                this.logOutUser();
            }).catch(() => {
                this.setState(
                    {passwordmsg: <div className="alert alert-danger" role='alert'>
                        Error: password could not be changed.
                    </div>}
                );
            });
        } else {
            this.setState(
                {passwordmsg: <div className="alert alert-danger" role='alert'>
                    Passwords need to match.
                </div>}
            );
        }
    }

    logOutUser() {
        this.props.dispatch(logout());
    }

    render() {
        const{newPassword, confirmPassword, passwordmsg} = this.state;
        const{user: currentUser} = this.props;

        return(
            <div>
                <h1>Admin Home</h1>
                <p>This is the admin homepage. Here the admin can view all of the users in the database. Their links will then allow them to add, edit and delete users.</p>
            
                {(currentUser.firstLogin == "1") && <Form ref={(c) => {this.form = c}} onSubmit={this.changePassword}>
                    <h3>Welcome new user!</h3>
                    <p>You are encouraged to change your password when you first login.</p>
                    <div>
                        <InputLabel id="password">Please enter a new password:</InputLabel>
                        <Input labelId="password" type='password' value={newPassword} onChange={this.newPasswordInput} validations={[required, validatePassword]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="confirm">Please enter a new password:</InputLabel>
                        <Input labelId="confirm" type='password' value={confirmPassword} onChange={this.confirmPasswordInput} validations={[required, validatePassword]}/>
                    </div>
                    <br/>
                    <div>
                        <Input type='submit' value="Change Password"/>
                    </div>
                    <br/>
                    {passwordmsg}
                    <CheckButton style={{display: 'none'}} ref={(c) => {this.checkBtn = c}}/>
                </Form>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user
    };
}
    
export default connect(mapStateToProps)(WebAdminHomePage);