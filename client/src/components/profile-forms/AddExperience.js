import React, {useState}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addExperience} from '../../actions/profile'
import { Link } from 'react-router-dom'



 const AddExperience = ({addExperience , setAlert , history}) => {

    const [formData,setformdata]= useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''

    });

    const { company, title, location, from, to, current, description } = formData;

    const onchange=(e)=>{

        setformdata({...formData, [e.target.name]:e.target.value});

    }

    const onsubmit=(e)=>{
        e.preventDefault();
        addExperience(formData , history);
   

    }
    return (
        <section className="container">
        <h1 className="large text-primary">
         Add An Experience
        </h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={onsubmit}>
          <div className="form-group">
            <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onchange} required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Company" name="company" value={company} onChange={onchange}  required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Location" name="location"  value={location} onChange={onchange}  />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from"   value={from} onChange={onchange} />
          </div>
           <div className="form-group">
            <p><input type="checkbox" name="current" value={current} onChange={onchange} /> Current Job</p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to"   value={to} onChange={onchange}/>
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              value={description} 
              onChange={onchange}
            ></textarea>
          </div>
          <input type="submit" class="btn btn-primary my-1"/>
          <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
      </section>
    )
};
AddExperience.propTypes={
    addExperience:PropTypes.func.isRequired,
  
}
export default connect(null,{addExperience })(AddExperience);
