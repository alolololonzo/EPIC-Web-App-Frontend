import React from 'react';

/**
 * Allows the staff to see the 
 * survey and poll responses.
 *
 * @author Lucy Williams
 * @version 2.0
 */

class FeedbackPage extends React.Component{
    getSurveyResponses() {
        // gets the survey responses

        // example data:
        const surveyResponses = [
            {
                username: "b9024234",
                surveyName: "Stage 1 Survey",
                responses: [
                    {
                        question: "Question 1",
                        answer: "Question 1 answer."
                    },
                    {
                        question: "Question 2",
                        answer: "Question 2 answer."
                    }
                ],
                date: "2020-11-21"
            },
            {
                username: "b9012857",
                surveyName: "Stage 1 Survey",
                responses: [
                    {
                        question: "Question 1",
                        answer: "Another question 1 answer."
                    },
                    {
                        question: "Question 2",
                        answer: "Another question 2 answer."
                    }
                ],
                date: "2020-11-21"
            },
        ]

        return (surveyResponses);
    }

    getPollResponses() {
        // gets the poll responses

        // example data:
        const pollResponses = [
            {
                username: "b9024234",
                pollName: "Computer Science Poll",
                response: "Poll Selection",
                date: "2019-02-04"
            },
            {
                username: "b8012857",
                pollName: "Computer Science Poll Poll",
                response: "A different poll Selection",
                date: "2019-03-20"
            }
        ]

        return (pollResponses);
    }

    render() {
        return(
            <div>
                <h1>Feedback</h1>
                <p>This is where any student feedback from announcements is displayed.</p>

                <h3>Survey Responses</h3>
                {(this.getSurveyResponses().length === 0) ? (<div>
                    No survey responses found.
                </div>) : (<div>
                    {this.getSurveyResponses().map(survey => <div>
                        <h5>{survey.username} completed {survey.surveyName} on {survey.date}</h5>
                        <h5>Questions and Answers:</h5>
                        {survey.responses.map(qA => <div>
                            <h6>{qA.question}</h6>
                            <p>{qA.answer}</p>
                        </div>)}
                    </div>)}
                </div>)}
                <br/>
                <h3>Poll Responses</h3>
                {(this.getPollResponses().length === 0) ? (<div>
                    No poll responses found.
                </div>) : (<div>
                    {this.getPollResponses().map(poll => <div>
                        <h5>{poll.username} answered {poll.response} for {poll.pollName} on {poll.date}</h5>
                    </div>)}
                </div>)}
            </div>
        );
    }
}

export default FeedbackPage;