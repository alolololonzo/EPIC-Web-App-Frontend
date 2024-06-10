import {SUCC_REGISTER, UNSUCC_REGISTRATION, SUCC_LOGIN, UNSUCC_LOGIN, LOGOUT} from "../actions/type";

//Updating the state of the user (e.g. if signed in or not)

const user = JSON.parse(localStorage.getItem("user"));

const stateInitial = user ? {signedIn: true, user, error: null,} : {signedIn: false, user: null};
  
export default function authfunction (state = stateInitial, action) {
    const {type, payload} = action;
  
    switch (type) {
        case SUCC_REGISTER:
            return {
                ...state,
                signedIn: false
            };
        case UNSUCC_REGISTRATION:
            return {
                ...state,
                signedIn: false
            };
        case SUCC_LOGIN:
            return {
                ...state,
                signedIn: true,
                user: payload.user
            };
        case UNSUCC_LOGIN:
            return {
                ...state,
                signedIn: false,
                user: null
            };
        case LOGOUT:
            return {
                ...state,
                signedIn: false,
                user: null
            };
        default:
            return state;
    }
}