const initialState = {
    authError: null
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Login failed'
            };
        case 'LOGIN_SUCCESS':
            console.log('success');
            return {
                ...state,
                authError: null
            };
        case 'SIGNOUT_SUCCESS':
            return state;

        case 'SIGNUP_SUCCESS':
            console.log('success');
            return {
                ...state,
                authError: null
            };
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.error.message
            };
        default:
            return state;
    }
};

export default authReducer;
