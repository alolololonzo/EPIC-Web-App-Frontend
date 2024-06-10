import React from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import CheckButton from 'react-validation/build/button';
import {InputLabel} from '@material-ui/core';
import {Link} from 'react-router-dom';

/**
 * Allows the staff to create a new 
 * resource for the students.
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

class CreateResourcePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            content: '',
            filecontent: '',
            imagecontent: '',
            imageurl: '',
            formmsg: ''
        }

        this.titleInput = this.titleInput.bind(this);
        this.contentInput = this.contentInput.bind(this);
        this.fileInput = this.fileInput.bind(this);
        this.imageInput = this.imageInput.bind(this);
        this.getImageUrl = this.getImageUrl.bind(this);
        this.isImage = this.isImage.bind(this);
        this.selectImage = this.selectImage.bind(this);
        this.clearFormMsg = this.clearFormMsg.bind(this);
        this.createResource = this.createResource.bind(this);
    }

    titleInput = (titleInputEvent) => {
        this.setState(
            {title: titleInputEvent.target.value}
        );
    }

    contentInput = (contentInputEvent) => {
        this.setState(
            {content: contentInputEvent.target.value}
        );
    }

    fileInput = (fileInputEvent) => {
        this.setState(
            {filecontent: fileInputEvent.target.value}
        );
    }

    imageInput = (imageInputEvent) => {
        this.setState(
            {imagecontent: imageInputEvent.target.value}
        );

        let image = imageInputEvent.target.files[0];
        let index = image.name.lastIndexOf(".");
        let ext = image.name.substr(index + 1);

        if (!(this.isImage(ext))) {
            alert("Please select an image (for example: .jpeg, .png).");
        } else {
            let url = this.getImageUrl(image);
            document.querySelector("#img").style.visibility='hidden';
            this.setState(
                {imageurl: url}
            );
            // Please write back-end logic, here is only for display, not the real echo picture
        }
    }
    //Get the temporary path of the uploaded picture according to the corresponding browser
    getImageUrl = (file) => {
        let url = null;

        if (window.createObjectURL !== undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL !== undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL !== undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }

        return url;
    }
    //Determine whether the uploaded file is a picture format, if not, give a prompt.
    isImage = (ext) => {
        return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
    }
    //Select the corresponding event of the image file
    selectImage = () => {
        let imageDiv = document.getElementById("imageFile");
        imageDiv.click();
    }

    clearFormMsg = () => {
        this.setState(
            {formmsg: ''}
        );
    }

    createResource = (createResourceEvent) => {
        createResourceEvent.preventDefault();

        this.clearFormMsg();

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            this.setState(
                {
                    formmsg: <div className="alert alert-success" role='alert'>
                        Resource successfully created.
                    </div>
                }
            );
        } else {
            this.setState(
                {
                    formmsg: <div className="alert alert-danger" role='alert'>
                        Resource could not be created. Check fields.
                    </div>
                }
            );
        }
    }

    render() {
        const {title, content, formmsg, filecontent, imagecontent, imageurl} = this.state;

        return (
            <div>
                <h1>Create New Resource</h1>
                <Form ref={(c) => this.form = c} onSubmit={this.createResource}>
                    <div>
                        <InputLabel id="title">Resource Title:</InputLabel>
                        <Input labelId="title" type='text' value={title} onChange={this.titleInput}
                               validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="content">Resource Content:</InputLabel>
                        <Textarea labelId="content" value={content} onChange={this.contentInput}
                                  validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="image">Upload an image:</InputLabel>
                        <Input labelId="image" id="imageFile" type='file' style={{display:'none'}} value={imagecontent} onChange={this.imageInput} validations={[required]}/>
                        <div style={{width: "200px", height: "200px", backgroundColor:"#e7e7e7"}} onClick={this.selectImage}>
                            <p id="img" style={{position:'absolute', paddingTop:"90px", paddingLeft:"20px"}}>Click to Select Image</p>
                            <img src={imageurl} alt="" style={{width: "200px", height:"200px"}}></img>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <InputLabel id="file">Upload a file:</InputLabel>
                        <Input labelId="file" type='file' value={filecontent} onChange={this.fileInput} validations={[required]}/>
                    </div>
                    <br/>
                    <div>
                        <Input type='submit' value="Create Resource"/>
                    </div>
                    <br/>
                    <CheckButton ref={(c) => this.checkBtn = c} style={{display: 'none'}}/>
                    {formmsg}
                </Form>

                <h5><Link to="/staff/resources">Return</Link></h5>
            </div>
        );
    }
}

export default CreateResourcePage;