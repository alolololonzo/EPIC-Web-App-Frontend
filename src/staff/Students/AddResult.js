import React from 'react';
import {Redirect} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import {InputLabel} from '@material-ui/core';
import {connect} from 'react-redux';

import {addResults} from '../../actions/auth';
import {findStudentById} from '../../actions/auth';

/**
 * Allows the staff to add a 
 * quiz result for a student.
 *
 * @author Charlotte McVicar and Lucy Williams
 * @version 1.0
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

const isResultNumber = (input) => {
    if (!Number(input)) {
        return (
            <div className="alert alert-danger" role='alert'>
                This field must contain a number.
            </div>
        )
    }
}

const isDate = (input) => {
    if (!(/^(\d{4}-\d{2}-\d{2})/.test(input))) {
        return (
            <div className="alert alert-danger" role='alert'>
                This field must contain a date in the format YEAR-MONTH-DAY (e.g. 2020-12-31).
            </div>
        )
    }
}

class AddResultPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            modules: [],
            quizName: '',
            result: '',
            stage: '',
            moduleCode: '',
            successful: false,
            usernamemsg: '',
            formmsg: '',
            errormsg: '',
            date: ''
        }

        this.usernameInput = this.usernameInput.bind(this);
        this.quizNameInput = this.quizNameInput.bind(this);
        this.resultInput = this.resultInput.bind(this);
        this.moduleCodeSelection = this.moduleCodeSelection.bind(this);
        this.addResult = this.addResult.bind(this);
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
    
    getStudentModules = (getStudentModulesEvent) => {
        getStudentModulesEvent.preventDefault();

        const{username, error} = this.state;

        // use the student's username to find the modules
        if (username === '') {
            this.setState(
                {usernamemsg: <div className="alert alert-danger" role='alert'>
                    A username is required.
                </div>}
            );
        } else {
            // retrieves the student's modules
            this.props.dispatch(
                findStudentById(username)
            ).then(response => {
                this.setState(
                    {
                        modules: response.data
                    }
                );
            }).catch(() => {
                this.setState(
                    {errormsg: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()}
                );
            });
        }
    }

    moduleCodeSelection = (moduleCodeSelectionEvent) => {
        this.setState(
            {moduleCode: moduleCodeSelectionEvent.target.value}
        );
    }

    quizNameInput = (quizNameInputEvent) => {
        this.setState(
            {quizName: quizNameInputEvent.target.value}
        );
    }

    resultInput = (resultInputEvent) => {
        this.setState(
            {result: resultInputEvent.target.value}
        );
    }

    dateInput = (dateInputEvent) => {
        this.setState(
            {date: dateInputEvent.target.value}
        );
    }

    addResult = (addResultEvent) => {
        addResultEvent.preventDefault();

        this.setState(
            {
                successful: false,
                formmsg: ''
            }
        );

        this.form.validateAll();

        const{username, quizName, result, stage, moduleCode, date} = this.state;

        if (this.checkBtn.context._errors.length === 0){
            this.props.dispatch(
                addResults(username, quizName, moduleCode, stage, result, date)
            ).then(() => {
                this.setState(
                    {
                        successful: true,
                        formmsg: <div className="alert alert-success" role='alert'>
                            Result successfully added.
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
                        Result could not be added. Check fields.
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

        const{username, usernamemsg, modules, moduleCode, quizName, result, formmsg, errormsg, date} = this.state;

        return (
            <div>
                <h1>Add Result</h1>
                <Form onSubmit={this.getStudentModules}>
                    <div>
                        <InputLabel id="username">Student's Username:</InputLabel>
                        <Input labelId="username" type='text' value={username} onChange={this.usernameInput} validations={[required]}/>
                    </div>
                    {usernamemsg}
                    <br/>
                    <div>
                        <Input type='submit' value="Get Student Modules"/>
                    </div>
                    <br/>
                </Form>

                <Form ref={(c) => {this.form = c}} onSubmit={this.addResult}>
                    <div>
                        <InputLabel id="module">Module Code:</InputLabel>
                        <Select disabled={modules.length === 0} value={moduleCode} onChange={this.moduleCodeSelection}>
                            <option value="">--Select Module--</option>
                            {modules.map(module => <option value={module.moduleCode}>{module.moduleCode}</option>)}
                        </Select>
                        {errormsg}
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="quiz name">Quiz Name:</InputLabel>
                        <Input labelId="quiz name" type='text' value={quizName} onChange={this.quizNameInput} validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="result">Student's Result:</InputLabel>
                        <Input labelId="result" type='text' value={result} onChange={this.resultInput} validations={[required, isResultNumber]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="date">Quiz Completition Date:</InputLabel>
                        <Input labelId="date" type='text' value={date} onChange={this.dateInput} validations={[required, isDate]}/>
                    </div>
                    <br/>
                    <div>
                        <Input type='submit' value="Add Result"/>
                    </div>
                    <br/>
                    <CheckButton style={{display: 'none'}} ref={(c) => {this.checkBtn = c}}/>
                    {formmsg}
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

export default connect(mapStateToProps)(AddResultPage);