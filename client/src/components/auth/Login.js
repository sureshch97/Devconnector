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
           <h1 className="large text-primary">Sig-in</h1>
           <p className="lead"><i className="fas fa-user"></i> Sign into your Account</p>
           <form className="form" onSubmit={e=>onsubmit(e)}>
               <div className="form-group">
                 
                 <input type="text"
                 placeholder="email Address"
                 required
                 onChange={e=>onchange(e)}
                 name="email"></input>
               </div>
               <div className="form-group">
                 
                 <input 
                 type="text"
                 placeholder="password"
                 required
                 onChange={e=>onchange(e)}
                 name="password"

                 ></input>
               </div>
               <input type="submit" className="btn btn-primary"/>
               <p className="my-1">Dont have an account?<a href="/register"> Sign Up</a></p> 
            </form>  
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
