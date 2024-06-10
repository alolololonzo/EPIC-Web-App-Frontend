import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";

//Splitting the data stored so it can be accessed in parts

export default combineReducers(
    {
        auth,
        message

    }
);