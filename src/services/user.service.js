import axios from "axios";
import authToken from "./auth.token";

/**
 * A service class to get HTTP responses using axios
 * maps to the controllers on the backend
 *
 * @author Charlotte McVicar
 * @version 1.0
 */

 // Backend mappings for different controllers
const BACKEND_STUDENT_CONNECTION_API = "http://localhost:8080/api/student/";
const BACKEND_STAFF_CONNECTION_API = "http://localhost:8080/api/staff/";

class UserService {

    //Getting announcements, only students authorised
    getAnnouncements(){
        return axios.get(BACKEND_STUDENT_CONNECTION_API + "announcements", {headers: authToken()});
    }

    //Getting modules, only students authorised
    getModules(){
        return axios.get(BACKEND_STUDENT_CONNECTION_API + "modules", {headers: authToken()});
    }

    //Getting results, only students authorised
    getAllResults(){
        return axios.get(BACKEND_STUDENT_CONNECTION_API + "getAllResults", {headers: authToken()});
    }

    //Getting all modules, only staff authorised
    getAllModules(){
        return axios.get(BACKEND_STAFF_CONNECTION_API + "modules/all", {headers: authToken()});
    }

    //Getting posted announcements, only staff authorised
    getPostedAnnouncements(){
        return axios.get(BACKEND_STAFF_CONNECTION_API + "announcements/posted", {headers: authToken()});
    }

}

export default new UserService();