import { AuthStates } from "../../consts/authStates";

const initialState = {
    authError: null
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthStates.LOGIN_REQUEST:
            return {
                ...state,
                authError: null,
            }
        case AuthStates.LOGIN_ERROR:
            return {
                ...state,
                authError: 'Login failed'
            };
        case AuthStates.LOGIN_SUCCESS:
            return {
                ...state,
                authError: null
            };
        case AuthStates.SIGNOUT_SUCCESS:
            return state;

        case AuthStates.SIGNUP_SUCCESS:
            return {
                ...state,
                authError: null
            };
        case AuthStates.SIGNUP_ERROR:
            return {
                ...state,
                authError: action.error.message
            };
        default:
            return state;
    }
};

export default authReducer;
