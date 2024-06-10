import React from 'react';
import Form from 'react-validation/build/form';
import Select from 'react-select';
import {InputLabel} from '@material-ui/core';
import {Line} from "react-chartjs-2";

/**
 * A prototype of the progress tracking page.
 *
 * @author Lucy Williams
 * @version 1.0
 */

// colours from the USB building:
// yellow #E4EBA0 (darker #D2DE62)
// blue #4FB8D9 (lighter #B9DCE7)
// green #D2E7BA (darker #A3DC62)
// white #F0F3F7 (darker #CDCED1)
// black #000000 (lighter #6F6E6E)

const csc1031 = {
    labels: ["Alonzo Fong", "Charlotte McVicar", "Jay Carr", "Lucy Williams", "Stuart Liu", "Michael Scott"],
    datasets: [
        {
            label: "Fundamentals of Computing: Coursework 1",
            data:[17, 48, 9, 74, 20, 31],
            fill: true,
            backgroundColor: "#D2E7BA",
            borderColor: "#A3DC62"
        },

        {
            label: "Fundamentals of Computing: Coursework 2",
            data:[56, 11, 28, 84, 43, 67],
            fill: true,
            backgroundColor: "#E4EBA0",
            borderColor: "#D2DE62"
        },

        {
            label: "Fundamentals of Computing: Online Assessment",
            data:[20, 74, 98, 34, 32, 87],
            fill: true,
            backgroundColor: "#B9DCE7",
            borderColor: "#4FB8D9"
        }
    ]
};

const csc1032 = {
    labels: ["Alonzo Fong", "Charlotte McVicar", "Jay Carr", "Lucy Williams", "Stuart Liu", "Michael Scott"],
    datasets: [
        { 
            label: "Architecture and Design: Exam 1",
            data:[99, 21, 40, 6, 100, 78],
            fill: false,
            borderColor: "#D2E7BA"
        },

        {
            label: "Architecture and Design: Exam 2",
            data:[60, 13, 58, 79, 0, 23],
            fill: false,
            borderColor: "#E4EBA0"
        },

        {
            label: "Architecture and Design: Online Assessment",
            data:[23, 67, 55, 55, 18, 12],
            fill: true,
            backgroundColor: "#B9DCE7",
            borderColor: "#4FB8D9"
        }
    ]
};

const csc2031 = {
    labels: ["Alonzo Fong", "Charlotte McVicar", "Jay Carr", "Lucy Williams", "Stuart Liu", "Michael Scott"],
    datasets: [
        {
            label: "Security and Programming: Coursework 1",
            data:[100, 98, 76, 88, 90, 100],
            fill: false,
            borderColor: "#E4EBA0"
        },

        {
            label: "Security and Programming: Coursework 2",
            data:[11, 7, 12, 21, 8, 0],
            fill: false,
            borderColor: "#D2E7BA"
        },

        {
            label: "Security and Programming: Coursework 3",
            data:[100, 100, 98, 99, 94, 97],
            fill: false,
            borderColor: "#4FB8D9"
        }
    ]
};

const csc3031 = {
    labels: ["Alonzo Fong", "Charlotte McVicar", "Jay Carr", "Lucy Williams", "Stuart Liu", "Michael Scott"],
    datasets: [
        {
            label: "Coursework",
            data:[19, 47, 86, 28, 49, 68],
            fill: false,
            borderColor: "#4FB8D9"
        },

        {
            label: "Exam",
            data:[75, 27, 38, 48, 28, 96],
            fill: false,
            borderColor: "#D2E7BA"
        },

        {
            label: "Online Assessment",
            data:[12, 54, 76, 23, 87, 1],
            fill: false,
            borderColor: "#E4EBA0"
        }
    ]
};

class ProgressTrackingPage extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
            stage: {},
            module: {}
        };

        this.stageSelection = this.stageSelection.bind(this);
        this.moduleSelection = this.moduleSelection.bind(this);
    }

    stageSelection = (stage) => {
        this.setState(
            {stage}
        );

        this.setState(
            {module: ''}
        );
    }

    moduleSelection = (stage) => {
        this.setState(
            {module: stage}
        );
    }

    render() {
        const stageOptions = [
            {value: "Stage 1", label: "Stage 1"},
            {value: "Stage 2", label: "Stage 2"},
            {value: "Stage 3", label: "Stage 3"}
        ];

        const modules = [
            {value: "CSC1031", label: "CSC1031", link: "Stage 1"},
            {value: "CSC1032", label: "CSC1032", link: "Stage 1"},
            {value: "CSC1033", label: "CSC1033", link: "Stage 1"},
            {value: "CSC1034", label: "CSC1034", link: "Stage 1"},
            {value: "CSC1035", label: "CSC1035", link: "Stage 1"},
            {value: "CSC2031", label: "CSC2031", link: "Stage 2"},
            {value: "CSC2032", label: "CSC2032", link: "Stage 2"},
            {value: "CSC2033", label: "CSC2033", link: "Stage 2"},
            {value: "CSC2034", label: "CSC2034", link: "Stage 2"},
            {value: "CSC2035", label: "CSC2035", link: "Stage 2"},
            {value: "CSC3031", label: "CSC3031", link: "Stage 3"},
            {value: "CSC3032", label: "CSC3032", link: "Stage 3"},
            {value: "CSC3033", label: "CSC3033", link: "Stage 3"},
            {value: "CSC3034", label: "CSC3034", link: "Stage 3"},
            {value: "CSC3035", label: "CSC3035", link: "Stage 3"},
        ];

        const moduleOptions = modules.filter((s) => s.link === this.state.stage.value);

        return(
            <div>
                <h1>Progress Tracking</h1>
                <Form>
                    <div>
                        <InputLabel id="stage">Select Stage:</InputLabel>
                        <Select labelId="stage" value={this.state.stage} onChange={this.stageSelection} options={stageOptions}/>
                    </div>
                    <div>
                        <InputLabel id="module">Select Module:</InputLabel>
                        <Select labelId="module" value={this.state.module} onChange={this.moduleSelection} options={moduleOptions}/>
                    </div>
                </Form>

                <div>
                    <h3>{this.state.stage.value}</h3>
                    <h4>{this.state.module.value}</h4>
                    {(this.state.stage.value === "Stage 1") && (this.state.module.value === "CSC1031") && (<Line data={csc1031} width={"55%"} options={{maintainAspectRatio: false}}/>)}
                    {(this.state.stage.value === "Stage 1") && (this.state.module.value === "CSC1032") && (<Line data={csc1032} width={"55%"} options={{maintainAspectRatio: false}}/>)}
                    {(this.state.stage.value === "Stage 2") && (this.state.module.value === "CSC2031") && (<Line data={csc2031} width={"55%"} options={{maintainAspectRatio: false}}/>)}
                    {(this.state.stage.value === "Stage 3") && (this.state.module.value === "CSC3031") && (<Line data={csc3031} width={"55%"} options={{maintainAspectRatio: false}}/>)}
                </div>
            </div>
        );
    }
}

export default ProgressTrackingPage;