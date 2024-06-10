import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import {InputLabel} from '@material-ui/core';

import {announcement} from '../../actions/auth';

/**
 * Allows the staff to create a new 
 * announcement for the students.
 *
 * @author Charlotte McVicar and Lucy Williams
 * @version 2.0
 */

const required = (input) => {
    if (!input) {
        return (
            <div className="alert alert-danger" role='alert'>
                This field cannot be left blank.
            </div>
        );
    }
}

class CreateAnnouncementPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            announcementName: '',
            content: '',
            access: "select",
            moduleCode: null,
            formmsg: '',
            successful: false
        }

        this.announcementNameInput = this.announcementNameInput.bind(this);
        this.contentInput = this.contentInput.bind(this);
        this.accessSelection = this.accessSelection.bind(this);
        this.moduleCodeSelection = this.moduleCodeSelection.bind(this);
    }

    announcementNameInput = (announcementNameInputEvent) => {
        this.setState(
            {announcementName: announcementNameInputEvent.target.value}
        );
    }

    contentInput = (contentInputEvent) => {
        this.setState(
            {content: contentInputEvent.target.value}
        );
    }

    accessSelection = (accessSelectionEvent) => {
        this.setState(
            {access: accessSelectionEvent.target.value}
        );
    }

    moduleCodeSelection = (moduleCodeSelectionEvent) => {
        this.setState(
            {moduleCode: moduleCodeSelectionEvent.target.value}
        );
    }

    createAnnouncement = (createAnnouncementEvent) => {
        createAnnouncementEvent.preventDefault();

        this.setState(
            {
                successful: true,
                formmsg: ''
            }
        );

        this.form.validateAll();

        const{announcementName, content, access, moduleCode} = this.state;

        var stage = access;

        if (!(moduleCode === '')) {
                stage = '';
        }

        // dispatches the inputs and adds them to the database as a new announcement
        if ((this.checkBtn.context._errors.length === 0) && (!(access === "select"))) {
            this.props.dispatch(
                announcement(announcementName, content, access, moduleCode)
            ).then(() => {
                this.setState(
                    {
                        successful: true,
                        formmsg: <div className="alert alert-success" role='alert'>
                            Announcement successfully added.
                        </div>
                    }
                );
            }).catch(() => {
                this.setState(
                    {
                        successful: false,
                        formmsg: <div className="alert alert-danger" role='alert'>
                            Announcement could not be added. Check fields.
                        </div>
                    }
                );
            });
        } else {
            this.setState(
                {
                    successful: false,
                    formmsg: <div className="alert alert-danger" role='alert'>
                        Announcement could not be added. Check fields.
                    </div>
                }

            );
        }
    }

    render() {
        const{user: currentUser} = this.props;

        if (!currentUser) {
            return <Redirect to="/"/>
        }

        const{announcementName, content, access, moduleCode, formmsg} = this.state;

        return (
            <div>
                <Form ref={(c) => {this.form = c}} onSubmit={this.createAnnouncement}>
                    <h1>Create Announcement</h1>
                    <div>
                        <InputLabel id="name">Announcement Name:</InputLabel>
                        <Input labelId="name" type='text' value={announcementName} onChange={this.announcementNameInput} validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="content">Announcement Content:</InputLabel>
                        <Textarea labelId="content" value={content} onChange={this.contentInput} validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="access">Select the stage(s) who can see this announcement:</InputLabel>
                        <Select labelId="access" value={access} onChange={this.accessSelection}>
                            <option value="select">--Select Stage(s)--</option>
                            <option value="">All Stages</option>
                            <option value="1">Stage 1</option>
                            <option value="2">Stage 2</option>
                            <option value="3">Stage 3</option>
                        </Select>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="module">(optional) Select the module associated with the announcement:</InputLabel>
                        <Select labelId="module" disabled={(access === "select") || (access === "")} value={moduleCode} onChange={this.moduleCodeSelection}>
                            <option value="">--Select Module--</option>
                            {(access === "1") && (<option value="CSC1031">CSC1031</option>)}
                            {(access === "1") && (<option value="CSC1032">CSC1032</option>)}
                            {(access === "1") && (<option value="CSC1033">CSC1033</option>)}
                            {(access === "1") && (<option value="CSC1034">CSC1034</option>)}
                            {(access === "1") && (<option value="CSC1035">CSC1035</option>)}
                            {(access === "2") && (<option value="CSC2031">CSC2031</option>)}
                            {(access === "2") && (<option value="CSC2032">CSC2032</option>)}
                            {(access === "2") && (<option value="CSC2033">CSC2033</option>)}
                            {(access === "2") && (<option value="CSC2034">CSC2034</option>)}
                            {(access === "2") && (<option value="CSC2035">CSC2035</option>)}
                            {(access === "3") && (<option value="CSC3031">CSC3031</option>)}
                            {(access === "3") && (<option value="CSC3032">CSC3032</option>)}
                            {(access === "3") && (<option value="CSC3033">CSC3033</option>)}
                            {(access === "3") && (<option value="CSC3034">CSC3034</option>)}
                            {(access === "3") && (<option value="CSC3035">CSC3035</option>)}
                        </Select>
                    </div>
                    <br/>
                    <Input type='submit' value="Create Announcement"/>
                    <br/>
                    <CheckButton style={{display: 'none'}} ref={(c) => {this.checkBtn = c}}/>
                    {formmsg}
                </Form>

                <h5><Link to="/staff/announcements">Return</Link></h5>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const{message} = state.message;
    const {user} = state.auth;
    return{
        message,
        user
    };
}

export default connect(mapStateToProps)(CreateAnnouncementPage);