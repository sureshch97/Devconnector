import { Fragment , useState} from "react"
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert'
import {register} from '../../actions/auth'
import React  from 'react'
import PropTypes from 'prop-types'


 const Register = ({setAlert , register}) => {

    const [formData , setFormData]= useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const {name , email , password, password2} = formData
    const onchange=e=>{
        setFormData({...formData , [e.target.name]:e.target.value})
    }
    const onsubmit=e=>{

        e.preventDefault();
        if(password !== password2){
            setAlert('passwords do not match' , 'danger')
        }else{
            
          register({name,email,password})
            setAlert('Successfully Registered' ,'success')
        }
    }
    return (
        <Fragment>
          <div className="form">
          <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form"  onSubmit={e=>onsubmit(e)}>
            <div className="form-group">
              
              <input 
              type="text"
              placeholder="Name"
              name="name"
              className="form-control"
              required
              onChange={(e)=>onchange(e)}/>    
              
            </div> 

            <div className="form-group">
            
              <input 
              type="email"
              name="email"
              className="form-control"
              placeholder="Email-Address"
              onChange={(e)=>onchange(e)}/>  

              
            </div>

          <small className="form-text">This site uses Gravatar if you want a profile Image than use a Gravatar email</small>
            
             <div className="form-group">
              
              <input type="password"
              placeholder="password"
              name="password"
              className="form-control"
              required
              onChange={(e)=>onchange(e)}/> 
            </div> 

             <div className="form-group">
             
              <input type="password"
              name="password2"
              placeholder="Confirm password"
              className="form-control"
              required
              onChange={(e)=>onchange(e)}/> 
            </div> 

              <button type="submit" className="btn btn-primary">Register</button>

              <p className="my-1">Are you have an account?<a href="/login"> Login</a></p>  
         </form>   
          </div>
        
     </Fragment>
    )
};
Register.propTypes={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
}
export default connect(null , {setAlert , register})(Register);
