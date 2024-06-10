import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";

/**
 * Allows the current user to see their details
 * stored in the database.
 *
 * @author Charlotte McVicar and Lucy Williams
 * @version 1.1
 */

class UserProfilePage extends React.Component {
    render() {
        const{user: currentUser} = this.props;

        if (!currentUser) {
            return <Redirect to="/"/>
        }

        return (
            <div>
                <h1>{currentUser.name.split(" ")[0]}'s Profile</h1>
                <p>Name: {currentUser.name}</p>
                <p>Username: {currentUser.username}</p>
                {(currentUser.roles.includes("ROLE_STUDENT")) && <p>Stage: {currentUser.stage}</p>}
                {currentUser.roles.map(role => {switch (role) {
                    case "ROLE_ADMIN":
                        return (<p>Role: Admin</p>);
                    case "ROLE_STAFF":
                        return (<p>Role: Staff</p>);
                    case "ROLE_STUDENT":
                        return (<p>Role: Student</p>);
                    default:
                        return (<p>Role Error</p>);
                }})}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
      user,
    };
}
  
export default connect(mapStateToProps)(UserProfilePage);