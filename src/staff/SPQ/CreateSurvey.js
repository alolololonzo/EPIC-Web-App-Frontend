import React from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import {InputLabel} from '@material-ui/core';
import {Link} from 'react-router-dom';

/**
 * Allows the staff to create a new 
 * survey for the students to complete.
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

class CreateSurveyPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = { 
            title: '',
            question: '',
            questions: [],
            tomanage: '',
            formmsg: ''
        };

        this.titleInput = this.titleInput.bind(this);
        this.questionInput = this.questionInput.bind(this);
        this.toManageSelection = this.toManageSelection.bind(this);
        this.clearFormMsg = this.clearFormMsg.bind(this);
        this.appendQuestions = this.appendQuestions.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.createSurvey = this.createSurvey.bind(this);
    }

    titleInput = (titleInputEvent) => {
        this.setState(
            {title: titleInputEvent.target.value}
        );
    }

    questionInput = (questionInputEvent) => {
        this.setState(
            {question: questionInputEvent.target.value}
        );
    }

    clearFormMsg = () => {
        this.setState(
            {formmsg: ''}
        );
    }

    appendQuestions = (appendQuestionsEvent) => {
        appendQuestionsEvent.preventDefault();

        this.clearFormMsg();
        
        this.setState(prevState => (
            {questions: prevState.questions.concat(this.state.question)}
        ));

        this.setState(
            {question: ''}
        );
    }

    toManageSelection = (toManageSelectionEvent) => {
        this.setState(
            {tomanage: toManageSelectionEvent.target.value}
        );
    }

    editQuestion = (editQuestionEvent) => {
        editQuestionEvent.preventDefault();

        this.clearFormMsg();

        const{tomanage} = this.state;

        if ((tomanage === '') || (tomanage === "--Questions--")) {
            this.setState(
                {formmsg: <div className="alert alert-warning" role='alert'>
                    Please choose a question before trying to edit.
                </div>}
            );
        } else {
            this.setState(
                {question: tomanage}
            );

            this.setState(prevState => (
                {questions: prevState.questions.filter(question => question !== tomanage)}
            ));
        }
    }

    deleteQuestion = (deleteQuestionEvent) => {
        deleteQuestionEvent.preventDefault();

        this.clearFormMsg();

        const{tomanage} = this.state;

        if ((tomanage === '') || (tomanage === "--Questions--")) {
            this.setState(
                {formmsg: <div className="alert alert-warning" role='alert'>
                    Please choose a question before trying to delete.
                </div>}
            );
        } else {
            this.setState(prevState => (
                {questions: prevState.questions.filter(question => question !== tomanage)}
            ));
        }
    }

    createSurvey = (createSurveyEvent) => {
        createSurveyEvent.preventDefault();

        this.clearFormMsg();

        this.form.validateAll();

        if ((this.checkBtn.context._errors.length === 0) && (!(this.state.questions.length < 2))) {
            this.setState(
                {formmsg: <div className="alert alert-success" role='alert'>
                    Survey successfully created.
                </div>}
            );
        } else {
            this.setState(
                {formmsg: <div className="alert alert-danger" role='alert'>
                    Survey could not be created. Check fields. Questions must contain more than 1 item.
                </div>}
            );
        }
    }

    render() {
        const{title, question, questions, tomanage, formmsg} = this.state;
        return(
            <div>
                <h1>Create New Survey</h1>
                <Form ref={(c) => this.form = c} onSubmit={this.createSurvey}>
                    <div>
                        <InputLabel id="title">Survey Title:</InputLabel>
                        <Input labelId="title" type='text' value={title} onChange={this.titleInput} validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="question">Question:</InputLabel>
                        <Input labelId="question" type='text' value={question} onChange={this.questionInput}/>
                        <button onClick={this.appendQuestions}>Add Question</button>
                    </div>
                    <br/>
                    <div>
                        <Select value={tomanage} onChange={this.toManageSelection} size={questions.length + 1}>
                            <option selected>--Questions--</option>
                            {this.state.questions.map(question => <option>{question}</option>)}
                        </Select>
                        <button onClick={this.editQuestion}>Edit Question</button>
                        <button onClick={this.deleteQuestion}>Delete Question</button>
                    </div>
                    <br/>
                    <div>
                        <Input type='submit' value="Create Survey"/>
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

export default CreateSurveyPage;