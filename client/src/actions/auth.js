import axios from 'axios'
import {setAuthToken} from './../utils/setauthToken';
import {setAlert} from '../actions/alert'

import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    LOGOUT,
    CLEAR_PROFILE,
    AUTH_ERROR
} from './types'

//USER REGISTRATION

export const register=({name,email,password})=>async dispatch=>{

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body =JSON.stringify({name,email,password});

    
    try {

        const res = await axios.post('/api/users' , body , config);

          dispatch({
              type:REGISTER_SUCCESS,
              payload:res.data
          });

          dispatch(setAlert('Successfully Rigestered' , 'success'));
        
    } catch (error) {

        dispatch({
            type:REGISTER_FAIL
        })
        
    }
};

//USER LOGIN

export const login =({email,password})=> async dispatch=>{

     const body = ({email,password});

     try {
         
        const res = await axios.post('/api/auth' ,body);
           dispatch({
               type:LOGIN_SUCCESS,
               payload:res.data
           });
           dispatch(setAlert('Login Success' , 'success'));
     } catch (error) {

        dispatch({
            type:LOGIN_FAIL
        })
         
     }
    };

    //LOGOUT 

    export const logout =()=>dispatch=>{

        dispatch({
            type:LOGOUT
        })
        dispatch({
            type:CLEAR_PROFILE
        })

    }

    //LOAD USER

    export const loaduser=()=> async dispatch=>{

         if(localStorage.token){
             setAuthToken(localStorage.token)
         }

         try {
             const res = await axios.get('/api/auth');
            
             dispatch({
                 type:USER_LOADED,
                 payload:res.data
             })
         } catch (error) {

            dispatch({
                type:AUTH_ERROR,
            })
             
         }
    };
