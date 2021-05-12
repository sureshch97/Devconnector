import React ,{useState}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {addEducation} from '../../actions/profile';
import {connect} from 'react-redux'



 const AddEducation = ({addEducation , setAlert , history}) => {

    const [formData,setformData] = useState({
        school:'',
        degree:'',
        fieldofStudy:'',
        from:'',
        to:'',
        current:'',
        description:''

    });

    const {
        school,
        degree,
        fieldofStudy,
        from,
        to,
        current,
        description} = formData

        const onchange=(e)=>{

            setformData({...formData ,[e.target.name]:e.target.value})
        };

        const onsubmit=(e)=>{

            e.preventDefault();
            
            addEducation(formData , history);
          
        }

    return (
        <section className="container">
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onsubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={onchange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={onchange}
            required
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofStudy" value={fieldofStudy}
            onChange={onchange}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from}
            onChange={onchange}/>
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current" value={current} 
            onChange={onchange} /> Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to}
            onChange={onchange}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={onchange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </section>
    )
};
AddEducation.propTypes={
  addEducation:PropTypes.func.isRequired,
 
}
export default connect(null,{addEducation}) (AddEducation);
