import React from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {InputLabel} from '@material-ui/core';

import {deleteUser} from '../../actions/auth';

/**
 * Allows the admin to delete an exisiting user 
 * from the database.
 *
 * @author Charlotte McVicar
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

class DeleteUserPage extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            successful: false,
            formmsg: ''
        }
        
        this.usernameInput = this.usernameInput.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    usernameInput = (usernameInputEvent) => {
        this.setState(
            {username: usernameInputEvent.target.value}
        );
    }

    deleteUser = (deleteUserEvent) => {
        deleteUserEvent.preventDefault();
    
        this.setState(
            {
                successful: false,
                formmsg: ''
            }
        );

        this.form.validateAll();

        const{username} = this.state;

        // checks the database for the user matching the username
        // and deletes all information 
        if (this.checkBtn.context._errors.length === 0){
            this.props.dispatch(
                deleteUser(username)
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
                            User does not exist/could not be deleted.
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

    const{username, formmsg, successful} = this.state;
    const{message} = this.props;

        return (
            <div>
                <h1>Delete User</h1>
                <Form ref={(c) => {this.form = c}} onSubmit={this.deleteUser}>
                    <div>
                        <InputLabel id="username">Username:</InputLabel>
                        <Input labelId="username" type='text' value={username} onChange={this.usernameInput} validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <Input type='submit' value="Delete User"/>
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

export default connect(mapStateToProps)(DeleteUserPage);
