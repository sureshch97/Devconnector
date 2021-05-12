import axios from 'axios';
import{setAlert} from '../actions/alert'

import {
    GET_POSTS,
    ADD_POST,
    DELETE_POST,
    GET_POST,
    UPDATE_LIKES,
    ADD_COMMENT,
    DELETE_COMMENT,
    POSTS_ERROR
}
from './types';

//GET ALL POSTS

export const getPosts =()=> async dispatch =>{

    try {
        const res =  await axios.get('/api/post')
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (error) {

        dispatch({
            type:POSTS_ERROR
        })
        
    }
};

//GET POST

export const getPost =(id)=> async dispatch =>{

  try {
      const res =  await axios.get(`/api/post/${id}`);
      console.log(res.data);
      dispatch({
          type:GET_POST,
          payload:res.data
      })
  } catch (error) {

      dispatch({
          type:POSTS_ERROR
      })
      
  }
};

//ADD POST

export const addPost =(formData)=> async dispatch =>{

        const config = {
          headers:{
            'Content-Type':'application/json'
          }
        };

    try {
        const res =  await axios.post('/api/post' , formData ,  config)
        dispatch({
            type:ADD_POST,
            payload:res.data
        });
        dispatch(setAlert('Post Created', 'success'));
    } catch (error) {

        dispatch({
            type:POSTS_ERROR
        })
        
    }
};

//delete post

export const deletePost =(id)=> async dispatch =>{

    try {
        const res =  await axios.delete(`/api/post/${id}` )
        dispatch({
            type:DELETE_POST,
            payload:res.data
        });
        dispatch(setAlert('Post Deleted', 'success'));
    } catch (error) {

        dispatch({
            type:POSTS_ERROR
        })
        
    }
};

//ADD LIKE

export const addLike =(id)=> async dispatch =>{

    try {
        const res =  await axios.put(`/api/post/like/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        });
       
    } catch (error) {

        dispatch({
            type:POSTS_ERROR
        })
        
    }
};

//remove like
export const removeLike = id => async dispatch => {
    try {
      const res = await axios.put(`/api/post/unlike/${id}`);
  
      dispatch({
        type: UPDATE_LIKES,
        payload: { id, likes: res.data }
      });
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }

//ADD COMMENT
export const addComment = (postId, formData) => async dispatch => {

      const config = {
        headers:{
          'Content-Type':'application/json'
        }
      };
    try {
      const res = await axios.post(`/api/post/comment/${postId}`, formData , config);
  
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });
  
      dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

//REMOVE COMMENT

export const deleteComment = (postId, commentId) => async dispatch => {
    try {
      await axios.delete(`/api/post/comment/${postId}/${commentId}`);
  
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId
      });
  
      dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload:( { msg:  'errrror'})
      });
    }
  };