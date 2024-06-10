export default function authToken() {
    // returning jwt token in the authorization header
    // This is used to authorise the user (e.g. allowing staff onto staff pages)
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user && user.token) {
        return {Authorization: "Bearer " + user.token};
    } else {
        return {};
    }
}
    