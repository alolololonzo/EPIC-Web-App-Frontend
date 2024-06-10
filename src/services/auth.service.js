import axios from "axios";
import authToken from "./auth.token";

/**
 * A service class to make HTTP requests using axios
 * maps to the controllers on the backend
 *
 * @author Charlotte McVicar
 * @version 1.0
 */

// Backend mappings for different controllers
const BACKEND_CONNECTION_API = "http://localhost:8080/api/auth/";
const STAFF_CONNECTION_API = "http://localhost:8080/api/staff/";

class AuthService {

    // Posting the username and password to the backend for authentication (Login)
    // Storing the JWT response in local storage
    login(username, password) {
        return axios.post(BACKEND_CONNECTION_API + "signin", {
            username, 
            password
        }).then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    // removing the stored 'user' item when a user logs out
    logout() {
        localStorage.removeItem("user");
    }

    // Posting data to the backend to stored in the database, when a user registers
    register(name, username, password, role, firstLogin, stage) {
        return axios.post(BACKEND_CONNECTION_API + "signup", {
            name, 
            username,
            password,
            role,
            firstLogin, 
            stage
        },
        {headers: authToken()}, );
    }

    // Posting data to the backend to stored in the database, when a staff user creates and announcement
    announcement(announcementName, content, stage, moduleCode) {
        return axios.post(STAFF_CONNECTION_API + "announcements/add", {
            announcementName, 
            content, 
            stage, 
            moduleCode
        },
        {headers: authToken()}, );
    }

    // Posting data to the backend to stored in the database, when a staff user adds a result for a student
    addResults(username, quizName, moduleCode, stage, result, date){
        return axios.post(STAFF_CONNECTION_API + "modules/results/add",{
            username,
            quizName, 
            moduleCode,
            stage,
            result,
            date
        },
        {headers: authToken()},
        );
    }

    // Posting data to the backend to stored in the database, when a user changes their password
    passwordChange(newPassword, oldPassword){
        return axios.post(BACKEND_CONNECTION_API + "changePassword", {
            newPassword,
            oldPassword
        },
        {headers: authToken()},
        );
    }

    // Posting data to the backend to stored in the database, when an admin user deletes a user
    deleteUser(username){
        return axios.post(BACKEND_CONNECTION_API + "deleteUsers", {
            username
        },
        {headers: authToken()},
        );
    }

    // Posting data to the backend to stored in the database, when a staff user adds a module
    addModule(moduleCode, moduleName, academicYear, stage){
        return axios.post(STAFF_CONNECTION_API + "module/addModule",{
            moduleCode,
            moduleName,
            academicYear,
            stage
        },
        {headers: authToken()},
        );
    }

    // Posting the moduleCode to the backend and getting the result by module in return
    getModuleResults(moduleCode){
        return axios.post("http://localhost:8080/api/student/resultsByModule", {
        moduleCode
        },
        {headers: authToken()},
        );
    }

    // Changing the users password and first login value to true, if the user done their first login
    firstLogin(newPassword){
        return axios.post(BACKEND_CONNECTION_API + "firstLogin", {
            newPassword
        },
        {headers: authToken()},
        );
    }

    //posting the students stage to the backend and getting the students registered to that stage in return
    getStudentByStage(stage){
        return axios.get(STAFF_CONNECTION_API +  "getStudentByStage", {
            stage
        },
        {headers: authToken()},
        );
    }
    
    //adding all the students from a stage to a module, based on the stage and module code provided
    addStudentsByStage(stage, moduleCode) {
        return axios.post(STAFF_CONNECTION_API + "module/addStudentsByStage", {
            stage, 
            moduleCode
        },
        {headers: authToken()}, );
    }

    //Staff users able to get the modules by posting the academic year
    modulesByYear(academicYear){
        return axios.post(STAFF_CONNECTION_API + "module/byYear",{ 
            academicYear
        },
        {headers: authToken()},
        )
    }

    //Adding students to a module based on their username
    addStudentsByUsername(username, moduleCode){
        return axios.post(STAFF_CONNECTION_API + "module/addStudentsByUsername", {
            username, 
            moduleCode
        },
        {headers: authToken()},
        );
    }

    //Getting students by module based on their module code
    getStudentsByModule(moduleCode){
        return axios.get(STAFF_CONNECTION_API + "modules/getStudentsByModule", {
            moduleCode
        },
        {headers: authToken()},
        );
    }

    //Getting the module average from the module code
    getModuleAverage(moduleCode){
        return axios.post(STAFF_CONNECTION_API + "results/average", {
            moduleCode
        },
        {headers: authToken()},
        );
    }

    // Getting students results from posting their module code and username
    getStudentModuleResults(username, moduleCode){
        return axios.post(STAFF_CONNECTION_API + "results/student/module", {
            username, 
            moduleCode
        },
        {headers: authToken()},
        );
    } 

    // Getting the students stage results based on their username and stage
    getStudentStageResults(username, stage){
        return axios.post(STAFF_CONNECTION_API + "results/student/stage", {
            username, 
            stage
        },
        {headers: authToken()},
        );
    }
    
    //Returning a student from their user ID
    findStudentById(username) {
        return axios.post(STAFF_CONNECTION_API + "findStudentModules", {
            username
        },
        {headers: authToken()},
        );
    } 

}



export default new AuthService();