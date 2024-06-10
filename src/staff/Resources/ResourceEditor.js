import React from 'react';
import {Link} from 'react-router-dom';

/**
 * Allows the staff to view 
 * the past resources created.
 *
 * @author Lucy Williams
 * @version 1.0
 */

class ResourceEditorPage extends React.Component{
    render() {
        return(
            <div>
                <h1>Resources</h1>
                <Link to="/staff/resources/create-resource"><h3>Create New Resource</h3></Link>
                <div>
                    <h3>Past Resources</h3>
                    <p>Here will be a list of the existing resources.</p>
                </div>
            </div>
        );
    }
}

export default ResourceEditorPage;