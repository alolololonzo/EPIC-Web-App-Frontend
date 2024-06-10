import React from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import {connect} from 'react-redux';
import {InputLabel} from '@material-ui/core';
import {register} from '../../actions/auth';

/**
 * Allows the admin to add a new user to the database.
 *
 * @author Lucy Williams
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

const validateName = (input) => {
    if (/\d/.test(input)) {
        return (
            <div className="alert alert-danger" role='alert'>
                This field cannot contain numbers.
            </div>
        );
    }
}

class AddNewUserPage extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            fullname: '',
            role: [],
            stage: '',
            username: '',
            password: "password",
            formmsg: '',
            accessType: '',
            firstLogin: true,
            successful: false
        }

        this.fullNameInput = this.fullNameInput.bind(this);
        this.roleInput = this.roleInput.bind(this);
        this.stageInput = this.stageInput.bind(this);
        this.addUser = this.addUser.bind(this);
        this.usernameInput = this.usernameInput.bind(this);
    }

    fullNameInput = (fullNameInputEvent) => {
        this.setState(
            {fullname: fullNameInputEvent.target.value}
        );
    }

    roleInput = (roleInputEvent) => {
        this.setState(
            {accessType: roleInputEvent.target.value}
        );
    }

    stageInput = (stageInputEvent) => {
        this.setState({
            stage: stageInputEvent.target.value}
        );
    }

    usernameInput = (usernameInputEvent) => {
        this.setState(
            {username: usernameInputEvent.target.value}
        );
    }

    addUser = (addUserEvent) => {
        addUserEvent.preventDefault();

        this.setState(
            {
                successful: false,
                formmsg: ''
            }
        );

        this.form.validateAll();

        const{fullname, stage, username, password, firstLogin, accessType} = this.state;

        var role = accessType.split(",")
        console.log(role);

        if (this.checkBtn.context._errors.length === 0){
            this.props.dispatch(
                register(fullname, username, password, role, firstLogin, stage)
            ).then(() => {
                this.setState(
                    {
                        successful: true,
                        formmsg: <div className="alert alert-success" role='alert'>
                            User successfully added.
                        </div>
                    }
                );
            }).catch(() => {
                this.setState(
                    {
                        successful: false,
                        formmsg: <div className="alert alert-danger" role='alert'>
                            An error has occurred.
                        </div>
                    }
                );
            });
        } else {
            this.setState(
                {
                    successful: false,
                    formmsg: <div className="alert alert-danger" role='alert'>
                        User could not be added. Check fields.
                    </div>
                }

            );
        }
    }

    render() {
        const{fullname, accessType, stage, username, formmsg, successful} = this.state;
        const{message} = this.props;
        return(
            <div>
                <h1>Add New User</h1>
                <Form ref={(c) => {this.form = c}} onSubmit={this.addUser}>
                    <div>
                        <InputLabel id="first name">Full Name:</InputLabel>
                        <Input labelId="first name" type='text' value={fullname} onChange={this.fullNameInput} validations={[required, validateName]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="role">Role:</InputLabel>
                        <Select labelId="role" value={accessType} onChange={this.roleInput} validations={[required]}>
                            <option value=''>--Select Role--</option>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                            <option value="student">Student</option>
                        </Select>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="stage">(Students Only) Stage:</InputLabel>
                        <Select labelId="stage" disabled={accessType !== "student"} value={stage} onChange={this.stageInput}>
                            <option value=''>--Select Stage--</option>
                            <option value="1">Stage One</option>
                            <option value="2">Stage Two</option>
                            <option value="3">Stage Three</option>
                        </Select>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="username">Username:</InputLabel>
                        <Input labelId="username" type='text' value={username} onChange={this.usernameInput} validations={[required]}/>
                    </div>
                    <br/>
                    <p>Initial password: "password"</p>
                    <p>New users are prompted to create a new password on their first login.</p>
                    <br/>
                    <div>
                        <Input type='submit' value="Add User"/>
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
        );
    }
}

function mapStateToProps(state) {
    const{message} = state.message;
    return{
        message
    };
}

export default connect(mapStateToProps)(AddNewUserPage);