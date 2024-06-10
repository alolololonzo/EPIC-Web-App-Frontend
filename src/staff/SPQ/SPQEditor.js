import React from 'react';
import {Link} from 'react-router-dom';

/**
 * Allows the staff to view the past 
 * surveys, polls and quizzes created.
 *
 * @author Lucy Williams
 * @version 1.0
 */

class SPQEditorPage extends React.Component{
    render() {
        return(
            <div>
                <h1>Surveys, Polls and Quizzes</h1>
                <Link to="/staff/spq/create-survey"><h3>Create New Survey</h3></Link>
                <Link to="/staff/spq/create-poll"><h3>Create New Poll</h3></Link>
                <Link to="/staff/spq/create-quiz"><h3>Create New Quiz</h3></Link>
                <h3>Past Surveys, Polls and Quizzes</h3>
                <p>Here staff can view all past surveys, polls and quizzes.</p>
            </div>
        );
    }
}

export default SPQEditorPage;