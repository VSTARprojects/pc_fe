import AuthService from "../services/AuthService";


const loggedReducer = (state = AuthService.isLoggedIn(), action) => {
    switch(action.type) {
        case 'SIGN_IN':
            return true;
        case 'SIGN_OUT':
            return false;
        default:
            return state;
    }
}

export default loggedReducer;