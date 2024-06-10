import React from 'react';
import {Link} from 'react-router-dom';

/**
 * The poll template displays the poll created by 
 * staff and allows students to complete it.
 *
 * @author Lucy Williams
 * @version 1.0
 */

class PollTemplatePage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            pollselection: '',
            selected: false
        }

        this.pollInput = this.pollInput.bind(this);
    }

    getPath() {
        var path = window.location.pathname.split("/");

        return(path[path.length - 1]);
    }

    fetchPoll() {
        // fetch the polls from the database

        // example poll data:
        var fetched = [
            {
                name: "Poll 1",
                selections: ["Selection 1", "Selection 2", "Selection 3"],
                created: "20/10/2020",
                creator: "John C",
                stage: "",
                module: ""
            },
            {
                name: "Poll 2",
                selections: ["Selection A", "Selection B", "Selection C"],
                created: "09/01/2021",
                creator: "Chris N",
                stage: "2",
                module: "CSC2034"
            }
        ]

        var poll = [];

        for (var p = 0; p < fetched.length; p++) {
            if (fetched[p].name.replace(/'/g, '').replace(/\W/g, " ").replace(/\s/g, "-").toLowerCase() === this.getPath()) {
                poll = [fetched[p].name, fetched[p].selections, fetched[p].created, fetched[p].creator, fetched[p].stage, fetched[p].module];
            }
        }

        return (poll);
    }

    pollInput = (pollInputEvent) => {
        pollInputEvent.preventDefault();

        this.setState(
            {pollselection: pollInputEvent.target.value}
        );
    }

    confirmSelection = (confirmSelectionEvent) => {
        confirmSelectionEvent.preventDefault();

        this.setState(
            {selected: true}
        );
    }

    render() {
        return(
            <div>
                {(!(this.fetchPoll().length === 0)) ? (<div>
                    <h1>{this.fetchPoll()[0]}</h1>
                    <h6>Created: {this.fetchPoll()[2]} by {this.fetchPoll()[3]}</h6>
                    {this.fetchPoll()[1].map(selection => <div>
                        <button disabled={this.state.selected} value={selection} style={(this.state.pollselection === selection) ? ({backgroundColor: "powderblue"}) : ({backgroundColor: "whitesmoke"})} onClick={this.pollInput}>{selection}</button>
                    </div>)}
                    <br/>
                    <button disabled={this.state.selected} onClick={this.confirmSelection}>{(this.state.selected) ? ("Answer saved.") : ("Confirm Selection")}</button>
                </div>) : (<div className="alert alert-danger" role='alert'>
                    Error: could not find poll.
                </div>)}
                <br/>
                <h5><Link to="/student/spq">Return</Link></h5>
            </div>
        );
    }
}
  
export default PollTemplatePage;