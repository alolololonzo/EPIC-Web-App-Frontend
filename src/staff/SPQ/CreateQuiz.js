import React from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import {InputLabel} from '@material-ui/core';
import {Link} from 'react-router-dom';

/**
 * Allows the staff to create a new 
 * quiz for the students to complete.
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

class CreateQuizPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = { 
            title: '',
            question: '',
            answer: '',
            tomanage: '',
            questionsanswers: [],
            formmsg: ''
        };

        this.titleInput = this.titleInput.bind(this);
        this.questionInput = this.questionInput.bind(this);
        this.answerInput = this.answerInput.bind(this);
        this.toManageSelection = this.toManageSelection.bind(this);
        this.clearFormMsg = this.clearFormMsg.bind(this);
        this.appendQuestionsAnswers = this.appendQuestionsAnswers.bind(this);
        this.editQuestionsAnswers = this.editQuestionsAnswers.bind(this);
        this.deleteQuestionsAnswers = this.deleteQuestionsAnswers.bind(this);
        this.createQuiz = this.createQuiz.bind(this);
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

    answerInput = (answerInputEvent) => {
        this.setState(
            {answer: answerInputEvent.target.value}
        );
    }

    clearFormMsg = () => {
        this.setState(
            {formmsg: ''}
        );
    }

    appendQuestionsAnswers = (appendQuestionsAnswersEvent) => {
        appendQuestionsAnswersEvent.preventDefault();

        this.clearFormMsg();

        const{question, answer} = this.state;

        if ((question === '') || (answer === '')) {
            this.setState(
                {formmsg: <div className="alert alert-warning" role='alert'>
                    Please enter a question and an answer.
                </div>}
            );
        } else {
            var questionAnswerString = question + ":" + answer;

            this.setState(prevState => (
                {questionsanswers: prevState.questionsanswers.concat(questionAnswerString)}
            ));
    
            this.setState(
                {
                    question: '',
                    answer: ''
                }
            );
        }
    }

    toManageSelection = (toManageSelectionEvent) => {
        this.setState(
            {tomanage: toManageSelectionEvent.target.value}
        );
    }

    editQuestionsAnswers = (editQuestionsAnswersEvent) => {
        editQuestionsAnswersEvent.preventDefault();

        this.clearFormMsg();

        const{tomanage} = this.state;

        if ((tomanage === '') || (tomanage === "--Questions and Answers--")) {
            this.setState(
                {formmsg: <div className="alert alert-warning" role='alert'>
                    Please choose a question before trying to edit.
                </div>}
            );
        } else {
            var splitToManage = tomanage.split(":");

            this.setState(
                {
                    question: splitToManage[0],
                    answer: splitToManage[1]
                }
            );

            this.setState(prevState => (
                {questionsanswers: prevState.questionsanswers.filter(question => question !== tomanage)}
            ));
        }
    }

    deleteQuestionsAnswers = (deleteQuestionsAnswersEvent) => {
        deleteQuestionsAnswersEvent.preventDefault();

        this.clearFormMsg();

        const{tomanage} = this.state;

        if ((tomanage === '') || (tomanage === "--Questions and Answers--")) {
            this.setState(
                {formmsg: <div className="alert alert-warning" role='alert'>
                    Please choose a question before trying to delete.
                </div>}
            );
        } else {
            this.setState(prevState => (
                {questionsanswers: prevState.questionsanswers.filter(question => question !== tomanage)}
            ));
        }
    }

    createQuiz = (createQuizEvent) => {
        createQuizEvent.preventDefault();

        this.clearFormMsg();

        this.form.validateAll();

        if ((this.checkBtn.context._errors.length === 0) && (!(this.state.questionsanswers.length < 2))) {
            this.setState(
                {formmsg: <div className="alert alert-success" role='alert'>
                    Quiz successfully created.
                </div>}
            );
        } else {
            this.setState(
                {formmsg: <div className="alert alert-danger" role='alert'>
                    Quiz could not be created. Check fields. Questions and Answers must contain more than 1 item.
                </div>}
            );
        }
    }

    render() {
        const{title, question, answer, tomanage, questionsanswers, formmsg} = this.state;
        return(
            <div>
                <h1>Create New Quiz</h1>
                <Form ref={(c) => this.form = c} onSubmit={this.createQuiz}>
                    <div>
                        <InputLabel id="title">Quiz Title</InputLabel>
                        <Input labelId="title" type='text' value={title} onChange={this.titleInput} validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="question">Question:</InputLabel>
                        <Input labelId="question" type='text' value={question} onChange={this.questionInput}/>
                        <InputLabel id="answer">Answer:</InputLabel>
                        <Input labelId="answer" type='text' value={answer} onChange={this.answerInput}/>
                        <button onClick={this.appendQuestionsAnswers}>Add Question</button>
                    </div>
                    <br/>
                    <div>
                        <Select value={tomanage} onChange={this.toManageSelection} size={questionsanswers.length + 1}>
                            <option selected>--Questions and Answers--</option>
                            {this.state.questionsanswers.map(qA => <option>{qA}</option>)}
                        </Select>
                        <button onClick={this.editQuestionsAnswers}>Edit Question</button>
                        <button onClick={this.deleteQuestionsAnswers}>Delete Question</button>
                    </div>
                    <br/>
                    <div>
                        <Input type='submit' value="Create Quiz"/>
                    </div>
                    <CheckButton ref={(c) => {this.checkBtn = c}} style={{display: 'none'}}/>
                    {formmsg} 
                </Form>

                <h5><Link to="/staff/spq">Return</Link></h5>
            </div>
        );
    }
}

export default CreateQuizPage;