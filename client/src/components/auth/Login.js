import React, { Fragment ,useState } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {setAlert} from '../../actions/alert'
import {login} from '../../actions/auth'
import PropTypes from 'prop-types'

 const Login = ({setAlert , login , isAuthenticated}) => {

    const [formData , setFormData] =  useState({
        email:'',
        password:''
    });
    const{email,password} = formData
    const onchange=e=>{

        setFormData({...formData , [e.target.name]:e.target.value});
    }
    const onsubmit=e=>{
        e.preventDefault();
       
        login({email,password});
      
         };
         if (isAuthenticated) {
            return <Redirect to='/dashboard' />;
          }
        
    return (
        <Fragment>
            <div className="form">
            <h1 className="large text-primary">Sign In</h1>
           <p className="lead"><i className="fas fa-user"></i> Sign into your Account</p>
           <form className="form" onSubmit={e=>onsubmit(e)}>
               <div className="form-group">
                 
                 <input type="email"
                 placeholder="Email Address"
                
                 required
                 onChange={e=>onchange(e)}
                 name="email"></input>
               </div>
               <div className="form-group">
                 
                 <input 
                 type="password"
                 placeholder="Password"
                 required
                 onChange={e=>onchange(e)}
                 name="password"

                 ></input>
               </div>
               <button type="submit" className="btn btn-primary">Login</button>
               <p className="my-1">Dont have an account? <a href="/register">Create your account </a></p> 
            </form>  
            </div>
          
        </Fragment>
    )
};
Login.propTypes={
    setAlert:PropTypes.func.isRequired,
    login:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool

}
const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps , {setAlert , login}) (Login);
