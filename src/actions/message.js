import {SET, CLEAR} from "./type";
//Setting the payload messages to the messages from the api
export const setMessage = (message) => (
    {
        type: SET,
        payload: message
    }
);

export const clearMessage = () => (
    {type: CLEAR}
);