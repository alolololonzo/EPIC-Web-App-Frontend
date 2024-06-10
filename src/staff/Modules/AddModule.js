import React from 'react';
import {Redirect} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {InputLabel} from '@material-ui/core';
import {connect} from 'react-redux';

import {addModule, addStudentsByStage} from '../../actions/auth';

/**
 * Allows the staff to add a new module 
 * and register all students to it.
 *
 * @author Charlotte McVicar and Lucy Williams
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

const number = (input) => {
    if (!Number(input)) {
        return (
            <div className="alert alert-danger" role='alert'>
                This field must contain a number.
            </div>
        );
    }
}

const moduleCodeValidation = (input) => {
    if ((!Number(input)) || (!(input.length === 4))) {
        return (
            <div className="alert alert-danger" role='alert'>
                Module code must contain four numbers (e.g. 1031).
            </div>
        );
    }
}

const academicYearValidation = (input) => {
    if (!(/(\d{2}[/]\d{2})/.test(input))) {
        return (
            <div className="alert alert-danger" role='alert'>
                Academic year must be in the format startyear/endyear (e.g. 20/21).
            </div>
        )
    }
}

const fullModuleCodeValidation = (input) => {
    if (!(/(^CSC)(\d{4})\s(\d{2}[/]\d{2})/.test(input))) {
        return (
            <div className="alert alert-danger" role='alert'>
                The full module code must in the format "CSC" followed by four numbers and the academic year: startyear/endyear (e.g. CSC1031 20/21).
            </div>
        )
    }
}

class AddModulePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moduleName: '',
            code: '',
            stage: '',
            academicYear: '',
            fullModuleCode: '',
            successful: false,
            usernamemsg: '',
            codemsg: '',
            addformmsg: '',
            regformmsg: ''
        }

        this.moduleNameInput = this.moduleNameInput.bind(this);
        this.moduleCodeInput = this.moduleCodeInput.bind(this);
        this.academicYearInput = this.academicYearInput.bind(this);
    }

    moduleNameInput = (moduleNameInputEvent) => {
        this.setState(
            {moduleName: moduleNameInputEvent.target.value}
        );
    }

    moduleCodeInput = (moduleCodeInputEvent) => {
        this.setState(
            {code: moduleCodeInputEvent.target.value}
        );

        if (this.state.code.startsWith("1")) {
            this.setState(
                {stage: "1"}
            );
        } else if (this.state.code.startsWith("2")) {
            this.setState(
                {stage: "2"}
            );
        } else if (this.state.code.startsWith("3")) {
            this.setState(
                {stage: "3"}
            );
        }
    }

    stageInput = (stageInputEvent) => {
        this.setState(
            {stage: stageInputEvent.target.value}
        );
    }

    academicYearInput = (academicYearInputEvent) => {
        this.setState(
            {academicYear: academicYearInputEvent.target.value}
        );
    }

    addModule = (addModuleEvent) => {
        addModuleEvent.preventDefault();

        this.setState(
            {
                successful: false,
                addformmsg: ''
            }
        );

        const{moduleName, code, stage, academicYear} = this.state;

        var moduleCode = "CSC" + code;

        this.setState(
            {fullModuleCode: moduleCode + " " + academicYear}
        );

        this.addForm.validateAll();

        // dispatches the inputs and adds them as a new module in the database
        if (this.addCheck.context._errors.length === 0){
            this.props.dispatch(
                addModule(moduleCode, moduleName, academicYear, stage)
            ).then(() => {
                this.setState(
                    {
                        successful: true,
                        addformmsg: <div className="alert alert-success" role='alert'>
                            Module successfully added.
                        </div>
                    }
                );
            }).catch(() => {
                this.setState(
                    {
                        successful: false,
                        addformmsg: <div className="alert alert-danger" role='alert'>
                            Module could not be added.
                        </div>
                    }
                );
            });
        } else {
            this.setState(
                {
                    successful: false,
                    addformmsg: <div className="alert alert-danger" role='alert'>
                        Module could not be added. Check fields.
                    </div>
                }
            );
        }
    }

    fullModuleCodeInput = (fullModuleCodeInputEvent) => {
        this.setState(
            {fullModuleCode: fullModuleCodeInputEvent.target.value}
        );
    }

    registerStudents = (registerStudentsEvent) => {
        registerStudentsEvent.preventDefault();

        this.setState(
            {
                successful: false,
                regformmsg: ''
            }
        );

        this.registerForm.validateAll();

        const{stage, fullModuleCode} = this.state;

        if (this.registerCheck.context._errors.length === 0){
            this.props.dispatch(
                addStudentsByStage(stage, fullModuleCode)
            ).then(() => {
                this.setState(
                    {
                        successful: true,
                        regformmsg: <div className="alert alert-success" role='alert'>
                            Students successfully registered.
                        </div>
                    }
                );
            }).catch(() => {
                this.setState(
                    {
                        successful: false,
                        regformmsg: <div className="alert alert-danger" role='alert'>
                            Students could not be registered.
                        </div>
                    }
                );
            });
        } else {
            this.setState(
                {
                    successful: false,
                    regformmsg: <div className="alert alert-danger" role='alert'>
                        Students could not be registered. Check fields.
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

        const{moduleName, code, codemsg, stage, academicYear, addformmsg, fullModuleCode, regformmsg} = this.state;

        return (
            <div>
                <h1>Add Module</h1>
                <Form ref={(c) => {this.addForm = c}} onSubmit={this.addModule}>
                    <div>
                        <InputLabel id="name">Module Name:</InputLabel>
                        <Input labelId="name" type='text' value={moduleName} onChange={this.moduleNameInput} validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="code">Module Code (e.g. 1031):</InputLabel>
                        <Input labelId="code" type='text' value={code} onChange={this.moduleCodeInput} validations={[required, moduleCodeValidation]}/>
                    </div>
                    {codemsg}
                    <br/>
                    <div>
                        <InputLabel id="stage">Stage (generated by module code):</InputLabel>
                        <Input labelId="stage" disabled type='text' value={stage} validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="year">Academic Year (e.g. 20/21):</InputLabel>
                        <Input labelId="year" type='text' value={academicYear} onChange={this.academicYearInput} validations={[required, academicYearValidation]}/>
                    </div>
                    <br/>
                    <div>
                        <Input type='submit' value="Add Module"/>
                    </div>
                    <br/>
                    <CheckButton style={{display: 'none'}} ref={(c) => {this.addCheck = c}}/>
                    {addformmsg}
                </Form>

                <h1>Register Students to Module</h1>
                <p>Once you have added a new module, make sure to register the students to the module.</p>
                <Form ref={(c) => {this.registerForm = c}} onSubmit={this.registerStudents}>
                    <div>
                        <InputLabel id="stage">Stage:</InputLabel>
                        <Input labelId="stage" type='text' value={stage} onChange={this.stageInput} validations={[required, number]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="module">Full Module Code (e.g. CSC1032 20/21):</InputLabel>
                        <Input labelId="module" type='text' value={fullModuleCode} onChange={this.fullModuleCodeInput} validations={[required, fullModuleCodeValidation]}/>
                    </div>
                    <br/>
                    <div>
                        <Input type='submit' value="Register Students"/>
                    </div>
                    <br/>
                    <CheckButton style={{display: 'none'}} ref={(c) => {this.registerCheck = c}}/>
                    {regformmsg}
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return{
        user
    };
}

export default connect(mapStateToProps)(AddModulePage);