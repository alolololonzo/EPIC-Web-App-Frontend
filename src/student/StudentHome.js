import React from 'react';
import {connect} from 'react-redux';
import {Accordion, Card} from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import Select from 'react-validation/build/select';
import {InputLabel} from '@material-ui/core';

import UserService from '../services/user.service';
import {firstLogin} from '../actions/auth';
import {logout} from '../actions/auth';

/**
 * The student home page displays the announcements 
 * created by the staff by stage and module.
 *
 * @author Lucy Williams
 * @version 3.0
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

class StudentHomePage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            newPassword: '',
            confirmPassword: '',
            passwordmsg: '',
            announcements: [],
            announcementerrormsg: '',
            modules: [],
            moduleerrormsg: ''
        }

        this.moduleSelection = this.moduleSelection.bind(this);
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

    // gets the announcements created by the staff
    // they're filtered by the current user's stage
    componentDidMount() {
        UserService.getAnnouncements().then(response => {
            this.setState({
                announcements: response.data
            });
        },
        error => {
            this.setState(
                {announcmenterrormsg: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()}
            );
        });

        UserService.getModules().then(response => {
            this.setState(
                {modules: response.data}
            );
        },
        error => {
            this.setState(
                {moduleerrormsg: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()}
            );
        });
    }

    moduleSelection = (moduleSelectionEvent) => {
        this.setState(
            {module: moduleSelectionEvent.target.value}
        );
    }

    render() {
        const{newPassword, confirmPassword, passwordmsg, announcements, module, modules, announcementerrormsg, moduleerrormsg} = this.state;
        const{user: currentUser} = this.props;

        return(
            <div>
                <h1>Student Home</h1>
                <p>This is the student homepage. Updates will be displayed here, for example, if a new survey has been added to the system, the student will get a notification on this page.</p>
            
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
        
                <div>
                    <h3>Announcements</h3>

                    {(modules.length === 0) ? (<div className="alert alert-danger" role='alert'>
                        {moduleerrormsg}: No modules found.
                    </div>) : (<Form>
                        <Select value={module} onChange={this.moduleSelection}>
                            <option value="">--Select Module Announcements to View--</option>
                            <option value="all">View All</option>
                            {modules.map(module => <option value={module.moduleCode}>{module.moduleCode}</option>)}
                        </Select>
                    </Form>)}

                    {(!(announcements.length === 0)) ? (
                        announcements.reverse().map(announcement => <div>
                            {(this.state.module === "all") ? (
                                <Accordion>
                                    <Card>
                                        <Accordion.Toggle eventKey="0">
                                            <Card.Header>
                                                <h4>{announcement.announcementName}</h4>
                                                <h6>{((!(announcement.moduleCode === null)) ? ("Module: " + announcement.moduleCode) : (""))}</h6>
                                            </Card.Header>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <p>{announcement.content}</p>
                                                <h6>From {announcement.staffName}, {announcement.announcementTime} {announcement.announcementDate}</h6>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            ) : ((announcement.moduleCode === this.state.module) && (
                                <Accordion>
                                    <Card>
                                        <Accordion.Toggle eventKey="0">
                                            <Card.Header>
                                                <h4>{announcement.announcementName}</h4>
                                                <h6>{((!(announcement.stage === null)) ? ("Stage: " + announcement.stage) : (""))} {((!(announcement.moduleCode === '')) ? ("Module: " + announcement.moduleCode) : (""))}</h6>
                                            </Card.Header>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <p>{announcement.content}</p>
                                                <h6>From {announcement.staffName}, {announcement.announcementTime} {announcement.announcementDate}</h6>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            ))}
                        </div>)
                    ) : (
                        <div className="alert alert-danger" role='alert'>
                            {announcementerrormsg}: No announcements.
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    const{announcement} = state.auth;
    return {
        user,
        announcement
    };
}
    
export default connect(mapStateToProps)(StudentHomePage);