import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

/**
 * Allows the student to view the surveys, 
 * polls and quizzes created by the staff.
 *
 * @author Lucy Williams
 * @version 2.0
 */

class SPQsPage extends React.Component{
    fetchSPQs() {
        // fetch the resource names from the database

        // example of fetched data:
        var fetched = [
            {
                name: "Survey 1",
                type: "survey",
                stage: "1"
            },
            {
                name: "Survey 2",
                type: "survey",
                stage: "2"
            },
            {
                name: "Poll 1",
                type: "poll",
                stage: ""
            },
            {
                name: "Poll 2",
                type: "poll",
                stage: "2"
            },
            {
                name: "Quiz 1",
                type: "quiz",
                stage: ""
            },
            {
                name: "Quiz 2",
                type: "quiz",
                stage: "1"
            }
        ]

        return (fetched);
    }

    getPath(name) {
        var spqPath = name.replace(/'/g, '').replace(/\W/g, " ").replace(/\s/g, "-").toLowerCase();

        return (spqPath);
    }

    render() {
        const{user: currentUser} = this.props;

        if (!currentUser) {
            return <Redirect to="/"/>
        }

        return(
            <div>
                <h1>Surveys, Polls and Quizzes</h1>
                <p>This is where the students can view the surveys, polls and quizzes the staff create.</p>

                <div>
                    <h3>Surveys:</h3>
                    {this.fetchSPQs().map(spq => <div>
                        {((spq.stage === "") || (currentUser.stage == spq.stage)) && (spq.type === "survey") && (<div>
                            <h6><Link to={"/student/spq/surveys/" + this.getPath(spq.name)}>{spq.name}</Link></h6>
                        </div>)}
                    </div>)}
                    <h3>Polls:</h3>
                    {this.fetchSPQs().map(spq => <div>
                        {((spq.stage === "") || (currentUser.stage == spq.stage)) && (spq.type === "poll") && (<div>
                            <h6><Link to={"/student/spq/polls/" + this.getPath(spq.name)}>{spq.name}</Link></h6>
                        </div>)}
                    </div>)}
                    <h3>Quizzes:</h3>
                    {this.fetchSPQs().map(spq => <div>
                        {((spq.stage === "") || (currentUser.stage == spq.stage)) && (spq.type === "quiz") && (<div>
                            <h6><Link to={"/student/spq/quizzes/" + this.getPath(spq.name)}>{spq.name}</Link></h6>
                        </div>)}
                    </div>)}
                </div>
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
  
export default connect(mapStateToProps)(SPQsPage);