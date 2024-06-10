import React from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {InputLabel} from '@material-ui/core';
import {passwordChange} from '../actions/auth';

/**
 * Allows the current user to change their password in the database.
 *
 * @author Charlotte McVicar
 * @version 1.0
 */

// validations for the input fields
const required = (input) => {
    if (!input) {
        return (
            <div className="alert alert-danger" role='alert'>
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

class PasswordChange extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            newPassword: '',
            oldPassword: '',
            successful: false,
            formmsg: ''
        }
        
        this.currentPasswordInput = this.currentPasswordInput.bind(this);
        this.newPasswordInput = this.newPasswordInput.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    currentPasswordInput = (currentPasswordInputEvent) => {
        this.setState(
            {oldPassword: currentPasswordInputEvent.target.value}
        );
    }

    newPasswordInput = (newPasswordInputEvent) => {
        this.setState(
            {newPassword: newPasswordInputEvent.target.value}
        );
    }

    changePassword = (changePasswordEvent) => {
        changePasswordEvent.preventDefault();
    
        this.setState(
            {
                successful: false,
                formmsg: ''
            }
        );

        this.form.validateAll();

        const{oldPassword, newPassword} = this.state;

        if (this.checkBtn.context._errors.length === 0) {
            this.props.dispatch(
                passwordChange(newPassword, oldPassword)
            ).then(() => {
                this.setState(
                    {
                        successful: true,
                        formmsg: <div className="alert alert-success" role='alert'>
                        </div>
                    }
                );
            }).catch(() => {
                this.setState(
                    {
                        successful: false,
                        formmsg: <div className="alert alert-danger" role='alert'>
                        </div>
                    }
                );
            });
        }
    }

    render(){
        const{user: currentUser} = this.props;

        if (!currentUser) {
            return <Redirect to="/"/>
        }

        const{oldPassword, newPassword, formmsg, successful} = this.state;
        const{message} = this.props;

        return (
            <div>
                <h1>Change Password</h1>
                <Form ref={(c) => {this.form = c}} onSubmit={this.changePassword}>
                    <div>
                        <InputLabel id="old">Current Password:</InputLabel>
                        <Input labelId="old" type='password' value={oldPassword} onChange={this.currentPasswordInput} validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="new">New Password:</InputLabel>
                        <Input labelId="new" type='password' value={newPassword} onChange={this.newPasswordInput} validations={[required, validatePassword]}/>
                    </div>
                    <br/>
                    <div>
                        <Input type='submit' value="Change Password"/>
                    </div>
                    <br/>
                    {message && (
                        <div className={successful ? "alert alert-success" : "alert alert-danger"} role='alert'>
                            {message}
                        </div>
                    )}
                    <CheckButton style={{display: 'none'}} ref={(c) => {this.checkBtn = c}}/>
                    {formmsg} 
                </Form>
             </div>   
            

        )
        
    }
    
}
function mapStateToProps(state) {
    const{message} = state.message;
    const {user} = state.auth;
    return{
        message,
        user
    };
}

export default connect(mapStateToProps)(PasswordChange);