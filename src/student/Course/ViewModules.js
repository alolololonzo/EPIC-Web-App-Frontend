import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import UserService from '../../services/user.service';

/**
 * Allows the student to view the 
 * modules they're registered to.
 *
 * @author Charlotte McVicar and Lucy Williams
 * @version 1.0
 */

class ViewModulesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modules: [],
            errormsg: ''
        }
    }

    componentDidMount() {
        UserService.getModules().then(response => {
            this.setState(
                {modules: response.data}
            );
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

        const{modules, errormsg} = this.state;

        return (
            <div>
                <h1>View Modules</h1>
                {(modules.length === 0) ? (<div>
                    {errormsg}: No modules registered.
                </div>) : (<div>
                    {modules.map(module => <h3>{module.moduleCode}: {module.moduleName}</h3>)}
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
        
export default connect(mapStateToProps)(ViewModulesPage);