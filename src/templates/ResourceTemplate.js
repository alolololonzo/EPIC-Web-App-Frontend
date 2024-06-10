import React from 'react';
import {Link} from 'react-router-dom';

/**
 * The resource template displays the resource created by 
 * staff and allows students to complete it.
 *
 * @author Lucy Williams
 * @version 1.0
 */

class ResourceTemplatePage extends React.Component{
    getPath() {
        var path = window.location.pathname.split("/");

        return(path[path.length - 1]);
    }

    fetchResource() {
        // fetch the resources from the database

        // example resources:
        var fetched = [
            {
                name: "Resource 1",
                content: "Resource 1 content.",
                created: "20/10/2020",
                creator: "John C"
            },
            {
                name: "Resource 2",
                content: "Resource 2 content.",
                created: "09/01/2021",
                creator: "Chris N",
            }
        ]

        var resource = [];

        for (var r = 0; r < fetched.length; r++) {
            if (fetched[r].name.replace(/'/g, '').replace(/\W/g, " ").replace(/\s/g, "-").toLowerCase() === this.getPath()) {
                resource = [fetched[r].name, fetched[r].content, fetched[r].created, fetched[r].creator];
            }
        }

        return (resource);
    }

    render() {
        return(
            <div>
                {(!(this.fetchResource().length === 0)) ? (<div>
                    <h1>{this.fetchResource()[0]}</h1>
                    <p>{this.fetchResource()[1]}</p>
                    <h6>Created: {this.fetchResource()[2]} by {this.fetchResource()[3]}</h6>
                </div>) : (<div className="alert alert-danger" role='alert'>
                    Error: could not find resource.
                </div>)}

                <h5><Link to="/student/resources">Return</Link></h5>
            </div>
        );
    }
}

export default ResourceTemplatePage;