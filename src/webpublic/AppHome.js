import React from 'react';
import {Carousel} from 'react-bootstrap';

import "./AppHome.css";
import Campus from './Campus.jpg';
import USB from './USB.jpg';
import Interior from './Interior.jpg';

/**
 * The application launch and public home page.
 *
 * @author Lucy Williams
 * @version 1.0
 */

class AppHomePage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        }
    }

    render() {
        return(
            <div>
                <Carousel interval={10000}>
                    <Carousel.Item>
                        <img className="d-block w-100" src={Campus} alt="The EPiC Learning and Engagement Tool"/>
                        <Carousel.Caption>
                            <h1>The EPiC Learning and Engagement Tool</h1>
                            <p>The EPiC Learning and Engagement Tool is in association with EPiC to give the staff and students of Newcastle University a place to track course progress and give feedback on the learning and engagement within University.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={USB} alt="Staff"/>
                        <Carousel.Caption>
                            <h1>Staff</h1> 
                            <p>Staff are able to view student course progress, create announcements, surveys, polls and quizzes, resources and also receive feedback from the students.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={Interior} alt="Students"/>
                        <Carousel.Caption>
                            <h1>Students</h1>
                            <p>Students are able to view their course progress, complete surveys, polls and quizzes created by the staff and view resources to help them during their course.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}

export default AppHomePage;