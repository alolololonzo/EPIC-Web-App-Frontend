import React from 'react';
import {Link} from 'react-router-dom';

/**
 * The survey template displays the survey created by 
 * staff and allows students to complete it.
 *
 * @author Lucy Williams
 * @version 1.0
 */

class SurveyTemplatePage extends React.Component{
    getPath() {
        var path = window.location.pathname.split("/");

        return(path[path.length - 1]);
    }

    fetchSurvey() {
        // fetch the surveys from the database

        // example survey data:
        var fetched = []

        var survey = [];

        for (var s = 0; s < fetched.length; s++) {
            if (fetched[s].name.replace(/'/g, '').replace(/\W/g, " ").replace(/\s/g, "-").toLowerCase() === this.getPath()) {
                survey = [fetched[s].name];
            }
        }

        return (survey);
    }

    render() {
        return(
            <div>
                {(!(this.fetchSurvey().length === 0)) ? (<div>
                    <h1>{this.fetchSurvey()[0]}</h1>
                </div>) : (<div className="alert alert-danger" role='alert'>
                    Error: could not find survey.
                </div>)}

                <h5><Link to="/student/spq">Return</Link></h5>
            </div>
        );
    }
}

export default SurveyTemplatePage;