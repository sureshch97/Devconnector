import React,{ Fragment,useState , useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {createProfile,getprofile} from '../../actions/profile'



const Editprofile = ({
    profile:{profile , loading},
    createProfile ,
     getprofile,
    history}) => {


      useEffect(() => {
       
      getprofile();

          setformdata({
              company: loading || !profile.company ? '': profile.company,
              website: loading || !profile.website ? '': profile.website,
              location: loading || !profile.location ? '': profile.location,
              bio: loading || !profile.bio ? '': profile.bio,
              status: loading || !profile.status ? '': profile.status,
              githubusername: loading || !profile.githubusername ? '': profile.githubusername,
              skills: loading || !profile.skills ? '': profile.skills.join(','),
              facebook: loading || !profile.social ? '': profile.social.facebook,
              twitter: loading || !profile.social ? '': profile.social.twitter,
              linkedin: loading || !profile.social ? '': profile.social.linkedin,
              instagram: loading || !profile.social ? '': profile.social.instagram,
              youtube: loading || !profile.social ? '': profile.social.youtube,
          })
      }, [loading])

    const [formData,setformdata] = useState({

        company:'',
        website:'',
        location:'',
        bio:'',
        status:'',
        githubusername:'',
        skills:'',
        facebook:'',
        twitter:'',
        linkedin:'',
        instagram:'',
        youtube:''

    });

    const[displaySocialInputs , toggleSocialInputs] = useState(false);

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        facebook,
        twitter,
        linkedin,
        instagram,
        youtube
    }=formData

    const onChange=(e)=>setformdata({
        ...formData,
        [e.target.name]:e.target.value
    });

    const onsubmit=(e)=>{

        e.preventDefault();
          console.log(formData);
          createProfile(formData, history, true);

    }

    return (
        <Fragment>

<section className="container">
      <h1 className="large text-primary">
        Edit Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onsubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={onChange}/>
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange}/>
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange}/>
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={onChange}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio"></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" onClick={()=>{toggleSocialInputs(!displaySocialInputs)}} class="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
         {displaySocialInputs && <Fragment>

            <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin"value={linkedin} onChange={onChange}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram"  value={instagram} onChange={onChange}/>
        </div>
             
             </Fragment>}
       
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </section>
            
        </Fragment>
    )
}

Editprofile.propTypes = {
    createProfile:PropTypes.func.isRequired,
    getprofile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,

};
const mapStateToProps=state=>({
    profile:state.profile
});
export default connect(mapStateToProps , {createProfile,getprofile})(Editprofile);

