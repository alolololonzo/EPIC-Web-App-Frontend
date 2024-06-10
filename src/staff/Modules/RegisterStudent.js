import React from 'react';
import {Redirect} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {InputLabel} from '@material-ui/core';
import {connect} from 'react-redux';

import {addStudentsByUsername} from '../../actions/auth';

const required = (input) => {
    if (!input) {
        return (
            <div className="alert alert-danger" role='alert'>
                This field cannot be left blank.
            </div>
        );
    }
}

class RegisterStudentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moduleCode: '',
            username: '',
            usernamemsg: ''
        }

        this.moduleCodeInput = this.moduleCodeInput.bind(this);
        this.usernameInput = this.usernameInput.bind(this);
    }

    moduleCodeInput = (moduleCodeInputEvent) => {
        this.setState(
            {moduleCode: moduleCodeInputEvent.target.value}
        );
    }

    usernameInput = (usernameInputEvent) => {
        this.setState(
            {username: usernameInputEvent.target.value}
        );

        if ((!(this.state.username.startsWith("b")))) {
            this.setState(
                {usernamemsg: <div className="alert alert-danger" role='alert'>
                    Enter a valid student username.
                </div>}
            );
        } else {
            this.setState(
                {usernamemsg: ''}
            );
        }
    }

    registerStudent = (registerStudentEvent) => {
        registerStudentEvent.preventDefault();

        this.setState(
            {
                successful: false,
                regformmsg: ''
            }
        );

        this.registerForm.validateAll();

        const{username, moduleCode} = this.state;

        if (this.registerCheck.context._errors.length === 0){
            this.props.dispatch(
                addStudentsByUsername(username, moduleCode)
            ).then(() => {
                this.setState(
                    {
                        successful: true,
                        regformmsg: <div className="alert alert-success" role='alert'>
                            Student successfully registered.
                        </div>
                    }
                );
            }).catch(() => {
                this.setState(
                    {
                        successful: false,
                        regformmsg: <div className="alert alert-danger" role='alert'>
                            Student could not be registered.
                        </div>
                    }
                );
            });
        } else {
            this.setState(
                {
                    successful: false,
                    regformmsg: <div className="alert alert-danger" role='alert'>
                        Student could not be registered. Check fields.
                    </div>
                }
            );
        }
    }

    render() {
        const{user: currentUser} = this.props;

        if (!currentUser) {
            return <Redirect to="/"/>
        }

        const{moduleCode, username, usernamemsg, regformmsg} = this.state;

        return (
            <div>
            <h1>Register Students to Module</h1>
                <p>This page is for adding individual students to a module, after the module has been created.</p>
                <Form ref={(c) => {this.registerForm = c}} onSubmit={this.registerStudent}>
                    <div>
                        <InputLabel id="username">Student Username:</InputLabel>
                        <Input labelId="username" type='text' value={username} onChange={this.usernameInput} validations={[required]}/>
                    </div>
                    {usernamemsg}
                    <br/>
                    <div>
                        <InputLabel id="module">Full Module Code (e.g. CSC1032 20/21):</InputLabel>
                        <Input labelId="module" type='text' value={moduleCode} onChange={this.moduleCodeInput} validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <Input type='submit' value="Register Student"/>
                    </div>
                    <br/>
                    <CheckButton style={{display: 'none'}} ref={(c) => {this.registerCheck = c}}/>
                    {regformmsg}
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return{
        user
    };
}

export default connect(mapStateToProps)(RegisterStudentPage);
