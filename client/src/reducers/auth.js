import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    AUTH_ERROR,
    USER_LOADED
} from '../actions/types'

const intialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}
function authReducer(state=intialState , action){
    const {type,payload} = action;
    switch(type){

       case USER_LOADED:
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: payload
          };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token' ,payload.token)
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case AUTH_ERROR:    
        case LOGIN_FAIL:
        case LOGOUT:        
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                isAuthenticated:false,
                loading:false
            }
            default:
                return state
    }


} export default authReducer;