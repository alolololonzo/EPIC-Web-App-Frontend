import React from 'react';
import {connect} from "react-redux";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {InputLabel} from '@material-ui/core';

import {firstLogin} from '../actions/auth';
import {logout} from '../actions/auth';

/**
 * The staff home displays all updates about 
 * student feedback and response, for example, 
 * when a student has completed a survey.
 *
 * @author Lucy Williams
 * @version 2.0
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

class StaffHomePage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            newPassword: '',
            confirmPassword: '',
            passwordmsg: '',
            module: {}
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

    getUpdates() {
        // when a survey, poll or quiz has been completed, it should also send an update to
        // a table called Updates - these updates are displayed on the staff home to show
        // staff when a new result/feedback has been added

        // example data:
        const fetched = [
            {
                username: "b9024234",
                stage: "1",
                moduleCode: "",
                spqName: "Stage 1 Survey",
                date: "2020-09-21"
            },
            {
                username: "b8012857",
                stage: "2",
                moduleCode: "CSC2033",
                spqName: "CSC2033 Quiz",
                date: "2020-10-03"
            },
            {
                username: "b9016989",
                stage: "1",
                moduleCode: "",
                spqName: "Stage 1 Survey",
                date: "2020-10-29"
            }
        ]

        return (fetched);
    }

    render() {
        const{newPassword, confirmPassword, passwordmsg} = this.state;
        const{user: currentUser} = this.props;

        return(
            <div>
                <h1>Staff Home</h1>
                <p>This is the staff homepage. Updates will be displayed here, for example, if a new student has completed a survey, their answers will be added and the staff will get a notification on this page.</p>
                
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
                
                {(this.getUpdates().length === 0) ? (<div>
                    No updates found.
                </div>) : (<div>
                    <h4>Stage 1 Updates</h4>
                    <ul>
                        {this.getUpdates().map(update => <div>
                            {(update.stage === "1") && (<li>{update.date}: {update.username} completed {update.spqName}</li>)}
                        </div>)}
                    </ul>
                    <h4>Stage 2 Updates</h4>
                    <ul>
                        {this.getUpdates().map(update => <div>
                            {(update.stage === "2") && (<li>{update.date}: {update.username} completed {update.spqName}</li>)}
                        </div>)}
                    </ul>
                    <h4>Stage 3 Updates</h4>
                    <ul>
                        {this.getUpdates().map(update => <div>
                            {(update.stage === "3") && (<li>{update.date}: {update.username} completed {update.spqName}</li>)}
                        </div>)}
                    </ul>
                </div>)}
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
    
export default connect(mapStateToProps)(StaffHomePage);