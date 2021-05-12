import axios from 'axios';
import {setAlert} from '../actions/alert'
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS
    
} from './types'

//GET PROFILE

 export const getprofile=()=> async dispatch=>{
         
     try {
         const res = await  axios.get('/api/profile/me');
         dispatch({
             type:GET_PROFILE,
             payload:res.data
         })
        
     } catch (err) {
         dispatch({
             type:PROFILE_ERROR,
             payload: { err}
         })

         
     }
};
 export default getprofile;

//GET PROFILES

export const getProfiles=()=> async dispatch=>{

    try {
        const res =  await axios.get('/api/profile');
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR
        })

        
    }
};



// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
   
   try {
        const res = await axios.get(`/api/profile/user/${userId}`);
       
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
   } catch (error) {

    dispatch({
        type:PROFILE_ERROR,
        payload:{msg:'profile ID Error'}
    })
       
   }
};

//guthub repos

export const getGithubrepos=(username)=> async dispatch=>{
         
    try {
        const res = await  axios.get(`/api/profile/github/${username}`);
        console.log(res.data);
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
       
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: { err}
        })

        
    }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
    dispatch
  ) => {
    try {
      const res = await axios.post('/api/profile', formData);
      console.log(res.data);
  
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
       history.push('/dashboard');
  
      if (edit) {
        history.push('/dashboard');
      }
    } catch (err) {
      
  
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: "profile error" }
      });
    }
  };

//ADD EXPERIENCE

export const addExperience=(formData,history)=> async dispatch=>{

    

    try {
         
        const res = await axios.put('/api/profile/experience' , formData);
       
         dispatch({
             type:UPDATE_PROFILE,
             payload:res.data
         });
          dispatch(setAlert('Experience is Added' , 'success'));
        history.push('/dashboard');
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
        
    }

};

//DELETE EXPERIENCE

export const deleteExperience=(id)=> async dispatch=>{

    try {

        const res = await axios.delete(`/api/profile/experience/${id}`);

         dispatch({
             type:UPDATE_PROFILE,
             payload:res.data
         });
        
          dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {

       dispatch({
           type:PROFILE_ERROR
       })
        
    }

}

//ADD Education

export const addEducation = (formData , history) =>async dispatch=>{
     try {
         const config = {
             headers:{
                 'Content-Type':'application/json'
             }
         }
        const res = await axios.put('/api/profile/education' , formData , config);
    
         dispatch({
             type:UPDATE_PROFILE,
             payload:res.data
         });
         dispatch(setAlert('Educatio is Added' , 'success'));

         history.push('/dashboard')
     } catch (error) {
         dispatch({
             type:PROFILE_ERROR,
             payload:{msg:'profile error'}
         })
         
     }
};


//delete Education

export const deleteEducation=(id)=> async dispatch=>{

    try {

        const res = await axios.delete(`/api/profile/education/${id}`);

         dispatch({
             type:UPDATE_PROFILE,
             payload:res.data
         })
        
    } catch (err) {

       dispatch({
           type:PROFILE_ERROR
       })
        
    }

};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await axios.delete('/api/profile');
  
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED });
  
        dispatch(setAlert('Your account has been permanently deleted'));
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
  };