import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, UPDATE_USER } from '../actions/types';

const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated : false,
    loading : true,
    user : {}
}

export default function ( state = initialState, action ) {

    const { type, payload } = action;

    switch(type){ 

        case USER_LOADED:
        case UPDATE_USER: 
            return {
                ...state,
                isAuthenticated : true,
                loading : false,
                user : payload
            }

        case REGISTER_SUCCESS :
            return {
                ...state,
                loading : false
            }
        case LOGIN_SUCCESS : 
            localStorage.setItem('token', payload.token); 
            return {
                ...state,
                ...payload,
                isAuthenticated : false,
                loading : false
            }

        case REGISTER_FAIL : 
        case AUTH_ERROR : 
        case LOGIN_FAIL :
        case LOGOUT :
            localStorage.removeItem('token');
            return {
                ...state,
                token : null,
                isAuthenticated : false,
                loading : false,
                user : null
            }
        default : 
            return state;
    }

}