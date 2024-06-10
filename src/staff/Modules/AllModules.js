import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import UserService from '../../services/user.service';

/**
 * Allows staff to view all of the modules added.
 *
 * @author Charlotte McVicar
 * @version 1.0
 */

class ViewAllModulesPage extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
            allModules: [],
            errormsg: ''
        }
    }

    // gets all of the registered modules from the database
    componentDidMount() {
        UserService.getAllModules().then(response => {
            this.setState({
                allModules: response.data
            });
        },
        error => {
            this.setState(
                {errormsg: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()}
            );
        });
    }

    render() {
        const{user: currentUser} = this.props;

        if (!currentUser) {
            return <Redirect to="/"/>
        }

        const{allModules, errormsg} = this.state;
        
        return (
            <div>
                <h1>All Modules</h1>
                {(allModules.length === 0) ? (<div className="alert alert-danger" role='alert'>
                    {errormsg}: No modules found.
                </div>) : (<div>
                    <ul>
                        {allModules.map(modules => <li><h4>{modules.moduleCode} {modules.moduleName}</h4></li>)}
                    </ul>
                </div>)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
        };
    }
        
export default connect(mapStateToProps)(ViewAllModulesPage);
