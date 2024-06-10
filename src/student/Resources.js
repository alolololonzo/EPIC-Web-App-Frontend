import React from 'react';
import {Link} from 'react-router-dom';

/**
 * Allows the student to view the 
 * resources created by the staff.
 *
 * @author Lucy Williams
 * @version 2.0
 */

class ResourcesPage extends React.Component{
    fetchResourceNames() {
        // fetch the resource names from the database

        // example of fetched data:
        var fetched = ["Resource 1", "Resource 2", "Resource 3"];

        return (fetched);
    }

    getPath(name) {
        var resourcePath = name.replace(/'/g, '').replace(/\W/g, " ").replace(/\s/g, "-").toLowerCase();

        return (resourcePath);
    }

    render() {
        return(
            <div>
                <h1>Resources</h1>
                <p>This is where the students can view the resources the staff create.</p>

                <div>
                    {this.fetchResourceNames().map(resource => <div>
                        <h3><Link to={"/student/resources/" + this.getPath(resource)}>{resource}</Link></h3>
                    </div>)}
                </div>
            </div>
        );
    }
}

export default ResourcesPage;