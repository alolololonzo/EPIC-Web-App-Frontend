import React from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router-dom';

import {logout} from './actions/auth';
import {clearMessage} from './actions/message';
import {history} from './helpers/history';

import AppRoutes from './AppRoutes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EPiCLogo from './EPiC_Logo.png';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';

/**
 * App.js controls the navigation bar and 
 * displays the content of each page.
 *
 * @author Charlotte McVicar and Lucy Williams
 * @version 3.0
 */

class App extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined,
            studentUser: false,
            staffUser: false,
            adminUser: false, 
        }

        history.listen((location) => {
            props.dispatch(clearMessage());
        });

        this.logOutUser = this.logOutUser.bind(this);
    }

    componentDidMount() {
        const user = this.props.user;

        if (user) {
            this.setState(
                {
                    currentUser: user,
                    adminUser: user.roles.includes("ROLE_ADMIN"),
                    staffUser: user.roles.includes("ROLE_STAFF"),
                    studentUser: user.roles.includes("ROLE_STUDENT")
                }
            );
        }
    }

    logOutUser() {
        this.props.dispatch(logout());
    }

    // the navbar changes depending on whether the user is logged in
    // then it also changes depending on which type the user is (admin, staff, student)
    render() {
        const{currentUser, adminUser, staffUser, studentUser} = this.state;
        return(
            <Router history={history}>
                <div>
                    <Navbar collapseOnSelect bg="light" expand="lg">
                        {currentUser ? (
                            <Navbar.Brand href="/public/home">
                                <img src={EPiCLogo} alt="The EPiC Learning and Engagement Tool" width='300'/>
                            </Navbar.Brand>
                        ) : (
                            <Navbar.Brand href="/">
                                <img src={EPiCLogo} alt="The EPiC Learning and Engagement Tool" width='300'/>
                            </Navbar.Brand>
                        )}
                        <Navbar.Toggle/>
                        <Navbar.Collapse>
                            <Nav className="mr-auto">
                                
                                {adminUser && (<Nav.Link href={"/admin/home"}>Home</Nav.Link>)}
                                {adminUser && (<NavDropdown title="Users">
                                    <NavDropdown.Item href={"/admin/users/add-user"}>Add User</NavDropdown.Item>
                                    <NavDropdown.Item href={"/admin/users/delete-user"}>Delete User</NavDropdown.Item>
                                </NavDropdown>)}

                                {staffUser && (<Nav.Link href={"/staff/home"}>Home</Nav.Link>)}
                                {staffUser && (<NavDropdown title="Modules">
                                    <NavDropdown.Item href={"/staff/modules/view-modules"}>View All Modules</NavDropdown.Item>
                                    <NavDropdown.Item href={"/staff/modules/add-module"}>Add Module</NavDropdown.Item>
                                    <NavDropdown.Item href={"/staff/modules/register-student"}>Register Student to Module</NavDropdown.Item>
                                </NavDropdown>)}
                                {staffUser && (<NavDropdown title="Students">
                                    <NavDropdown.Item href={"/staff/students/progress-tracking"}>Student Progress</NavDropdown.Item>
                                    <NavDropdown.Item href={"/staff/students/add-results"}>Add Results</NavDropdown.Item>
                                    <NavDropdown.Item href={"/staff/students/feedback"}>Student Feedback</NavDropdown.Item>
                                </NavDropdown>)}
                                {staffUser && (<NavDropdown title="Announcements">
                                <NavDropdown.Item href={"/staff/announcements"}>View Announcements</NavDropdown.Item>
                                <NavDropdown.Item href={"/staff/announcements/create-announcement"}>Create Announcement</NavDropdown.Item>
                                </NavDropdown>)}
                                {staffUser && (<NavDropdown title="SPQs">
                                    <NavDropdown.Item href={"/staff/spq"}>View Surveys, Polls and Quizzes</NavDropdown.Item>
                                    <NavDropdown.Item href={"/staff/spq/create-survey"}>Create Survey</NavDropdown.Item>
                                    <NavDropdown.Item href={"/staff/spq/create-poll"}>Create Poll</NavDropdown.Item>
                                    <NavDropdown.Item href={"/staff/spq/create-quiz"}>Create Quiz</NavDropdown.Item>
                                </NavDropdown>)}
                                {staffUser && (<NavDropdown title="Resources">
                                    <NavDropdown.Item href={"/staff/resources"}>View Resources</NavDropdown.Item>
                                    <NavDropdown.Item href={"/staff/resources/create-resource"}>Create Resource</NavDropdown.Item>
                                </NavDropdown>)}

                                {studentUser && (<Nav.Link href={"/student/home"}>Home</Nav.Link>)}
                                {studentUser && (<NavDropdown title="Course">
                                    <NavDropdown.Item href={"/student/course/view-modules"}>Modules</NavDropdown.Item>
                                    <NavDropdown.Item href={"/student/course/progress-tracking"}>Progress Tracking</NavDropdown.Item>
                                </NavDropdown>)}
                                {studentUser && (<Nav.Link href={"/student/spq"}>SPQs</Nav.Link>)}
                                {studentUser && (<Nav.Link href={"/student/resources"}>Resources</Nav.Link>)}
                            </Nav>

                            {currentUser ? (
                                <Nav>
                                    {adminUser && (<NavDropdown title={currentUser.username}>
                                        <NavDropdown.Item href={"/admin/profile"}>Profile</NavDropdown.Item>
                                        <NavDropdown.Item href={"/admin/profile/change-password"}>Change Password</NavDropdown.Item>
                                    </NavDropdown>)}
                                    {staffUser && (<NavDropdown title={currentUser.username}>
                                        <NavDropdown.Item href={"/staff/profile"}>Profile</NavDropdown.Item>
                                        <NavDropdown.Item href={"/staff/profile/change-password"}>Change Password</NavDropdown.Item>
                                    </NavDropdown>)}
                                    {studentUser && (<NavDropdown title={currentUser.username}>
                                        <NavDropdown.Item href={"/student/profile"}>Profile</NavDropdown.Item>
                                        <NavDropdown.Item href={"/student/profile/change-password"}>Change Password</NavDropdown.Item>
                                    </NavDropdown>)}
                                    <Nav.Link href={"/"} onClick={this.logOutUser}>Logout</Nav.Link>  
                                </Nav>
                            ) : (
                                <Nav>
                                    <Nav.Link href={"/admin-login"}>Admin Login</Nav.Link>
                                    <Nav.Link href={"/staff-login"}>Staff Login</Nav.Link>
                                    <Nav.Link href={"/student-login"}>Student Login</Nav.Link>
                                </Nav>   
                            )}
                        </Navbar.Collapse>
                    </Navbar>

                    <AppRoutes/>
                    </div>
            </Router>
        );
    }
}

// bottom navbar/footer implemented
// overlaps content

/*
<Navbar fixed="bottom" bg="dark">
    <Nav className="mr-auto">
        <Navbar.Text style={{color: "gray"}}>The EPiC Learning and Engagement Tool &copy; 2021</Navbar.Text>
    </Nav>
    <Nav>
        <Navbar.Text style={{color: "gray"}}>In association with:</Navbar.Text>
        <Nav.Link href={"https://epic.ncl.ac.uk/"} style={{color: "gray"}}>EPiC - The Educational Practice in Computing</Nav.Link>
    </Nav>
</Navbar>
*/

function mapStateToProps(state) {
    const{user} = state.auth;
    return {user};
  }
  
  export default connect(mapStateToProps)(App);
