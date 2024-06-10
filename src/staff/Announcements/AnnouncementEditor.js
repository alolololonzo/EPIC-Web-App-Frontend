import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import UserService from '../../services/user.service';

/**
 * Allows the staff to view a list 
 * of the past announcements created.
 *
 * @author Lucy Williams
 * @version 1.0
 */

class AnnouncementEditorPage extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
            announcements: [],
            errormsg: ''
        }
    }

    componentDidMount() {
        UserService.getPostedAnnouncements().then(response => {
            this.setState({
                announcements: response.data
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

        const{announcements, errormsg} = this.state;
        
        return (
            <div>
                <h1>Announcements</h1>
                <Link to="/staff/announcements/create-announcement"><h3>Create New Announcement</h3></Link>
                <h3>Past Announcements</h3>
                {(announcements.length === 0) ? (<div className="alert alert-danger" role='alert'>
                    {errormsg}: No announcements found.
                </div>) : (<div>
                    <ul>
                        {announcements.map(announcement => <div>
                            <li><h5>{announcement.announcementName}</h5></li>
                            <p>{announcement.content}</p>
                            <h6>Created {announcement.announcementDate}</h6>
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
        user,
    };
}
        
export default connect(mapStateToProps)(AnnouncementEditorPage);
