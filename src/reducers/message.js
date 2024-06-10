import {SET, CLEAR} from "../actions/type";

// For updating the state of the message
const initialState = {};

export default function messagefunction (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SET:
            return {message: payload};
        case CLEAR:
            return {message: ""};
        default:
            return state;
    }
}