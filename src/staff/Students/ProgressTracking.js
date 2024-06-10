import React from 'react';
import {Redirect} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import {InputLabel} from '@material-ui/core';
import {connect} from 'react-redux';
import {Line} from 'react-chartjs-2';

import {findStudentById} from '../../actions/auth';
import AuthService from '../../services/auth.service';

/**
 * Allows the staff to look at 
 * the progress for a student.
 *
 * @author Lucy Williams
 * @version 3.0
 */

class ProgressTrackingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            modules: [],
            results: [],
            moduleCode: '',
            moduleerrormsg: '',
            resulterrormsg: ''
        }

        this.usernameInput = this.usernameInput.bind(this);
        this.getStudentModules = this.getStudentModules.bind(this);
        this.moduleCodeSelection = this.moduleCodeSelection.bind(this);
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

        if (username === '') {
            this.setState(
                {usernamemsg: <div className="alert alert-danger" role='alert'>
                    A username is required.
                </div>}
            );
        } else {
            this.props.dispatch(
                findStudentById(username)
            ).then(response => {
                this.setState(
                    {modules: response.data}
                );
            }).catch(() => {
                this.setState(
                    {moduleerrormsg: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()}
                );
            });
        }
    }

    moduleCodeSelection = (moduleCodeSelectionEvent) => {
        this.setState(
            {moduleCode: moduleCodeSelectionEvent.target.value}
        );

        const{username} = this.state;

        // gets the students results filtered by module
        AuthService.getStudentModuleResults(username, moduleCodeSelectionEvent.target.value).then((response) => {
            this.setState(
                {results: response.data}
            );
        },
        error => {
            this.setState(
                {resulterrormsg: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()}
            );
        });
    }

    createStudentData() {
        const{results, moduleCode} = this.state;

        var quizNames = [];
        var quizResults = [];

        results.forEach(quiz => {
            quizNames.push(quiz.quizName);
            quizResults.push(quiz.result);
        })

        var data = {
            labels: quizNames,
            datasets: [
                {
                    label: moduleCode,
                    data: quizResults,
                    fill: false,
                    borderColor: "#A3DC62"
                }
            ]
        }

        return (data);
    }

    render() {
        const{user: currentUser} = this.props;

        if (!currentUser) {
            return <Redirect to="/"/>
        }

        const{username, results, resulterrormsg, usernamemsg, modules, moduleCode, moduleerrormsg} = this.state;

        return (
            <div>
                <h1>Student Progress Tracking</h1>
                <Form onSubmit={this.getStudentModules}>
                    <div>
                        <InputLabel id="username">Student's Username:</InputLabel>
                        <Input labelId="username" type='text' value={username} onChange={this.usernameInput}/>
                    </div>
                    {usernamemsg}
                    <br/>
                    <div>
                        <Input type='submit' value="Get Student Modules"/>
                    </div>
                    <br/>
                </Form>

                <Form>
                    <div>
                        <InputLabel id="module">Select Module:</InputLabel>
                        {(modules.length === 0) ? (<div className="alert alert-danger" role='alert'>
                            {moduleerrormsg}: No modules found.
                        </div>) : (<Select value={moduleCode} onChange={this.moduleCodeSelection}>
                            <option value="">--Select Module--</option>
                            {modules.map(module => <option value={module.moduleCode}>{module.moduleCode}</option>)}
                        </Select>)}
                        <br/>
                        {(!(moduleCode === '')) && ((results.length === 0) ? (<div className="alert alert-danger" role='alert'>
                            {resulterrormsg}: No results found.
                        </div>) : (<div>
                            <h3>{username}'s {moduleCode} results:</h3>
                            <Line data={this.createStudentData()} width={"55%"} options={{maintainAspectRatio: false}}/>
                        </div>))}
                    </div>
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

export default connect(mapStateToProps)(ProgressTrackingPage);