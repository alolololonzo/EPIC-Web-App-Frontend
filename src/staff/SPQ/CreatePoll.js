import React from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import {InputLabel} from '@material-ui/core';
import {Link} from 'react-router-dom';

/**
 * Allows the staff to create a new 
 * poll for the students to complete.
 *
 * @author Lucy Williams
 * @version 1.0
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

class CreatePollPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = { 
            title: '',
            selection: '',
            selections: [],
            tomanage: '',
            formmsg: ''
        };

        this.titleInput = this.titleInput.bind(this);
        this.selectionInput = this.selectionInput.bind(this);
        this.toManageSelection = this.toManageSelection.bind(this);
        this.clearFormMsg = this.clearFormMsg.bind(this);
        this.appendSelections = this.appendSelections.bind(this);
        this.editSelection = this.editSelection.bind(this);
        this.deleteSelection = this.deleteSelection.bind(this);
        this.createPoll = this.createPoll.bind(this);
    }

    titleInput = (titleInputEvent) => {
        this.setState(
            {title: titleInputEvent.target.value}
        );
    }

    selectionInput = (selectionInputEvent) => {
        this.setState(
            {selection: selectionInputEvent.target.value}
        );
    }

    clearFormMsg = () => {
        this.setState(
            {formmsg: ''}
        );
    }

    appendSelections = (appendSelectionsEvent) => {
        appendSelectionsEvent.preventDefault();

        this.clearFormMsg();
        
        this.setState(prevState => (
            {selections: prevState.selections.concat(this.state.selection)}
        ));

        this.setState(
            {selection: ''}
        );
    }

    toManageSelection = (toManageSelectionEvent) => {
        this.setState(
            {tomanage: toManageSelectionEvent.target.value}
        );
    }

    editSelection = (editSelectionEvent) => {
        editSelectionEvent.preventDefault();

        this.clearFormMsg();

        const{tomanage} = this.state;

        if ((tomanage === '') || (tomanage === "--Poll Selections--")) {
            this.setState(
                {formmsg: <div className="alert alert-warning" role='alert'>
                    Please choose a selection before trying to edit.
                </div>}
            );
        } else {
            this.setState(
                {selection: tomanage}
            );

            this.setState(prevState => (
                {selections: prevState.selections.filter(selection => selection !== tomanage)}
            ));
        }
    }

    deleteSelection = (deleteSelectionEvent) => {
        deleteSelectionEvent.preventDefault();

        this.clearFormMsg();

        const{tomanage} = this.state;

        if ((tomanage === '') || (tomanage === "--Poll Selections--")) {
            this.setState(
                {formmsg: <div className="alert alert-warning" role='alert'>
                    Please choose a selection before trying to delete.
                </div>}
            );
        } else {
            this.setState(prevState => (
                {selections: prevState.selections.filter(selection => selection !== tomanage)}
            ));
        }
    }

    createPoll = (createPollEvent) => {
        createPollEvent.preventDefault();

        this.clearFormMsg();

        this.form.validateAll();

        if ((this.checkBtn.context._errors.length === 0) && (!(this.state.selections.length < 2))) {
            this.setState(
                {formmsg: <div className="alert alert-success" role='alert'>
                    Poll successfully created.
                </div>}
            );
        } else {
            this.setState(
                {formmsg: <div className="alert alert-danger" role='alert'>
                    Poll could not be created. Check fields. Poll Selections must contain more than 1 item.
                </div>}
            );
        }
    }

    render() {
        const{title, selection, selections, tomanage, formmsg} = this.state;
        return(
            <div>
                <h1>Create New Poll</h1>
                <Form ref={(c) => this.form = c} onSubmit={this.createPoll}>
                    <div>
                        <InputLabel id="question">Poll Question:</InputLabel>
                        <Input labelId="question" type='text' value={title} onChange={this.titleInput} validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="selection">Poll Selection:</InputLabel>
                        <Input labelId="selection" type='text' value={selection} onChange={this.selectionInput}/>
                        <button onClick={this.appendSelections}>Add Selection</button>
                    </div>
                    <br/>
                    <div>
                        <Select value={tomanage} onChange={this.toManageSelection} size={selections.length + 1}>
                            <option selected>--Poll Selections--</option>
                            {this.state.selections.map(selection => <option>{selection}</option>)}
                        </Select>
                        <button onClick={this.editSelection}>Edit Selection</button>
                        <button onClick={this.deleteSelection}>Delete Selection</button>
                    </div>
                    <br/>
                    <div>
                        <Input type='submit' value="Create Poll"/>
                    </div>
                    <br/>
                    <CheckButton ref={(c) => {this.checkBtn = c}} style={{display: 'none'}}/>
                    {formmsg} 
                </Form>

                <h5><Link to="/staff/spq">Return</Link></h5>
            </div>
        );
    }
}

export default CreatePollPage;