import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getprofile , deleteAccount} from '../../actions/profile'
import Dashboardactions from './dashboardactions'
import Experience from './experience'
import Education from './education'
import Spinner from '../layout/spinner'


const Dashboard = ({getprofile, auth:{user} , deleteAccount, profile:{profile , loading}}) => {

    useEffect(()=>{

        getprofile();

    },[getprofile])


    return  loading && profile === null ? <Spinner/>:<Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead"><i className="fas fa-user"/> Welcome {user && user.name} </p>
          <dashboardactions/>
        {
        profile !== null ?(
        <Fragment>
             <Dashboardactions/>
             <Experience experience={profile.experience}/>
             <Education education={profile.education}/>
            

             <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </Fragment>):( <Fragment>
            <p>you have not set up your profile please add some info </p>
        <Link to="create-profile" className="btn btn-primary my-1">create profile</Link>
       
        </Fragment>
        )}
         
    </Fragment>
    
    
  
};

Dashboard.propTypes = {
    getprofile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    deleteAccount:PropTypes.func.isRequired,

}
const mapStateToProps=state=>({
    auth:state.auth,
    profile:state.profile
})

export default connect(mapStateToProps,{getprofile , deleteAccount})(Dashboard);
