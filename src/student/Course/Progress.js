import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {Line} from 'react-chartjs-2';
import Select from 'react-validation/build/select';
import Form from 'react-validation/build/form';

import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';

/**
 * Allows the student to view their progress:
 * - All progress as a list
 * - All progress as a graph
 * - Modular progress as graphs
 * - The average from all modules
 *
 * @author Lucy Williams
 * @version 2.0
 */

class ProgressPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            module: '',
            resultView: '',
            modules: [],
            results: [],
            moduleerrormsg: '',
            resulterrormsg: ''
        }
    }

    // getModules function is repeated on other student pages
    // gets the current students registered modules
    componentDidMount() {
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

        switch (moduleSelectionEvent.target.value) {
            case "":
                this.setState(
                    {
                        resulterrormsg: "Select a module to view results.",
                        results: [],
                        resultView: ""
                    }
                );
                break;
            case "all list":
                // gets all results for the current user
                UserService.getAllResults().then(response => {
                    this.setState({
                        results: response.data,
                        resulterrormsg: "All Results",
                        resultView: "all list"
                    });
                },
                error => { 
                    this.setState(
                        {errormsg: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()}
                    );
                });
                break;
            case "all graph":
                UserService.getAllResults().then(response => {
                    this.setState({
                        results: response.data,
                        resulterrormsg: "All Results",
                        resultView: "all graph"
                    });
                },
                error => { 
                    this.setState(
                        {errormsg: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()}
                    );
                });
                break;
            case "average":
                this.setState(
                    {
                        resulterrormsg: "Averages",
                        results: [],
                        resultView: "average"
                    }
                );
                break;
            default:
                // gets the results filtered by module for the current user
                AuthService.getModuleResults(moduleSelectionEvent.target.value).then((response) => {
                    this.setState(
                        {
                            results: response.data,
                            resultView: "module"
                        }
                    );
                },
                error => {
                    this.setState(
                        {resulterrormsg: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()}
                    );
                });
                break;
        }
    }

    createAllData() {
        const{results} = this.state;

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
                    label: "",
                    data: quizResults,
                    fill: false,
                    borderColor: "#4FB8D9"
                }
            ]
        }

        return (data);
    }

    createModuleData() {
        const{results, module} = this.state;

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
                    label: module,
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

        const{modules, moduleerrormsg, results, resulterrormsg, module, resultView} = this.state;

        return (
            <div>
                <h1>Progress Tracking</h1>
                {(modules.length === 0) ? (<div className="alert alert-danger" role='alert'>
                    {moduleerrormsg}
                </div>) : (<div>
                    <Form>
                        <Select value={module} onChange={this.moduleSelection}>
                            <option value="">--Select Results to View--</option>
                            <option value="all list">View All Results (List)</option>
                            <option value="all graph">View All Results (Graph)</option>
                            {modules.map(module => <option value={module.moduleCode}>{module.moduleCode}</option>)}
                            <option value="average">View Average of Each Module</option>
                        </Select>
                    </Form>
                </div>)}

                {(results.length === 0) ? (<div>
                    {resulterrormsg}
                </div>) : (<div>
                    {(resultView === "all list") && (results.map(result => <div>
                        <h3>{result.quizName}: {result.result}</h3>
                        <h5>{result.moduleCode} {result.date.substring(0, 10)}</h5>
                    </div>))}
                    {(resultView === "all graph") && (<Line data={this.createAllData()} width={"55%"} options={{maintainAspectRatio: false}}/>)}
                    {(resultView === "module") && (<Line data={this.createModuleData()} width={"55%"} options={{maintainAspectRatio: false}}/>)}
                </div>)}
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user
    };
}
    
export default connect(mapStateToProps)(ProgressPage);