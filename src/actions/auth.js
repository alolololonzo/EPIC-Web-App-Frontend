
import {SUCC_REGISTER, UNSUCC_REGISTRATION, SUCC_LOGIN, UNSUCC_LOGIN, LOGOUT, SET} from "./type";
import AuthService from "../services/auth.service";
/**
 * An action class calling AuthService
 * used to do requests and dispatched when necessary
 *
 * @author Charlotte McVicar
 * @version 1.0
 */

export const announcement = (announcementName, content, moduleCode, stage, staffName) => () => {
  return AuthService.announcement(announcementName, content, moduleCode, stage, staffName)
};

export const addResults = (username, quizName, moduleCode, stage, result, date) => () => {
    return AuthService.addResults(username, quizName, moduleCode, stage, result, date)
}

export const addModule = (moduleCode, moduleName, academicYear, stage) => () => {
    return AuthService.addModule(moduleCode, moduleName, academicYear, stage)
}

export const getModuleResults = (moduleCode) => () => {
    return AuthService.getModuleResults(moduleCode)
}
export const firstLogin = (newPassword) => () => {
    return AuthService.firstLogin(newPassword)
}

export const getStudentByStage = (stage) => () => {
    return AuthService.getStudentByStage(stage)
}

export const addStudentsByStage = (stage, moduleCode) => () => {
    return AuthService.addStudentsByStage(stage, moduleCode)
}

export const modulesByYear = (academicYear) => () => {
    return AuthService.modulesByYear(academicYear)
}

export const getStudentsByModule = (moduleCode) => () => {
    return AuthService.getStudentsByModule(moduleCode)
}

export const getModuleAverage = (moduleCode) => () => {
    return AuthService.getModuleAverage(moduleCode)
}

export const getStudentModuleResults =(username, moduleCode) => () => {
    return AuthService.getStudentModuleResults(username, moduleCode)
}

export const getStudentStageResults = (username, stage) => () => {
    return AuthService.getStudentStageResults(username, stage)
}

export const findStudentById = (username) => () => {
    return AuthService.findStudentById(username)
}

//Will dispatch an unsuccessful registration message if registration failed
//Will dispatch a successful registration message if registration is successful
export const register = (name, username, password, role, firstLogin, stage) => (dispatch) => {
    return AuthService.register(name, username, password, role, firstLogin, stage).then((response) => {
        dispatch(
            {type: SUCC_REGISTER}, 
        );
  
        dispatch(
            {
                type: SET,
                payload: response.data.message
            }
        );
 
        return Promise.resolve();
    },

    (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
  
        dispatch(
            {type: UNSUCC_REGISTRATION}
        );
  
        dispatch(
            {
                type: SET,
                payload: message
            }
        );
  
        return Promise.reject();
    });
};

//Will dispatch an unsuccessful login message if login failed
//Will dispatch a successful login message if login is successful
export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then((data) => {
        dispatch(
            {
                type: SUCC_LOGIN,
                payload: {user: data}
            }
        );
 
        return Promise.resolve();
    },

    (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
  
        dispatch(
            {type: UNSUCC_LOGIN}
        );
  
        dispatch(
            {
                type: SET,
                payload: message
            }
        );
  
        return Promise.reject();
    });
};
  
export const logout = () => (dispatch) => {
    AuthService.logout();
 
    dispatch(
        {type: LOGOUT}
    );
};

//if the old password does not match the password on the database an error message will be dispatched
//if the old password is correct the password will change on th database and a success message will be dispatched
export const passwordChange = (newPassword, oldPassword) => (dispatch) => {
    return AuthService.passwordChange(newPassword, oldPassword).then((response) => {
        dispatch(
            {
                type: SET,
                payload: response.data.message
            }
        );
 
        return Promise.resolve();
    },

    (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
  
        dispatch(
            {
                type: SET,
                payload: message
            }
        );
  
        return Promise.reject();
    });
};

//Will delete a user if the user is in the database
//Will throw dispatch an error message if the user does not exist
export const deleteUser = (username) => (dispatch) => {
    return AuthService.deleteUser(username).then((response) => {
        dispatch(
            {
                type: SET,
                payload: response.data
            }
        );
 
        return Promise.resolve();
    },

    (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
  
        dispatch(
            {
                type: SET,
                payload: message
            }
        );
  
        return Promise.reject();
    });
};

//Will add a user to the module if the user is on the database
//Will throw dispatch an error message if the user does not exist
export const addStudentsByUsername = (username, moduleCode) => (dispatch) => {
    return AuthService.addStudentsByUsername(username, moduleCode).then((response) => {
        dispatch(
            {
                type: SET,
                payload: response.data
            }
        );
 
        return Promise.resolve();
    },

    (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
  
        dispatch(
            {
                type: SET,
                payload: message
            }
        );
  
        return Promise.reject();
    });
};

