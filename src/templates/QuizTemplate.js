import React from 'react';
import {Link} from 'react-router-dom';

/**
 * The quiz template displays the quiz created by 
 * staff and allows students to complete it.
 *
 * @author Lucy Williams
 * @version 1.0
 */

class QuizTemplatePage extends React.Component{
    getPath() {
        var path = window.location.pathname.split("/");

        return(path[path.length - 1]);
    }

    fetchQuiz() {
        // fetch the quizzes from the database

        // example quiz data:
        var fetched = []

        var quiz = [];

        for (var q = 0; q < fetched.length; q++) {
            if (fetched[q].name.replace(/'/g, '').replace(/\W/g, " ").replace(/\s/g, "-").toLowerCase() === this.getPath()) {
                quiz = [fetched[q].name];
            }
        }

        return (quiz);
    }

    render() {
        return(
            <div>
                {(!(this.fetchQuiz().length === 0)) ? (<div>
                    <h1>{this.fetchQuiz()[0]}</h1>
                </div>) : (<div className="alert alert-danger" role='alert'>
                    Error: could not find quiz.
                </div>)}

                <h5><Link to="/student/spq">Return</Link></h5>
            </div>
        );
    }
}

export default QuizTemplatePage;