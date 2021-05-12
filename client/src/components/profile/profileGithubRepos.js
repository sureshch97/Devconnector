import React ,{useEffect}from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../components/layout/spinner'
import {connect} from 'react-redux'
import {getGithubrepos} from '../../actions/profile'

const ProfileGithubRepos = ({username, repos, getGithubrepos})=>{

   useEffect(()=>{

    getGithubrepos(username);

   },[getGithubrepos]);

  
    return (
        <div class="profile-github">
        <h2 class="text-primary my-1">
          <i class="fab fa-github"></i> Github Repos
        </h2>
           {repos === null ? (<Spinner/>):(
             
             repos.map(repo=>(

              <div key={repo._id} className="repo bg-white p-1 my-1">
                <div>
                  <h4>
                    <a href="repo.html.url"
                    target="_blank"
                    rel='noopener noreferrer'>
                      {repo.name}
                    </a>
                  </h4>
                  <p>{repo.description}</p>
                </div>
                <div>
                  <ul>
                    <li className="badge badge-primary">
                      stars:{repo.stargazers_count}
                    </li>
                    <li className="badge badge-dark">
                      watchers:{repo.watchers_count}
                    </li>
                    <li className="badge badge-light">
                      forks:{repo.forks_count}
                    </li>
                  </ul>
                </div>
                
              </div>

             ))

           )}
      </div>
   
    )
}

ProfileGithubRepos.propTypes = {
    getGithubrepos:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    repos:PropTypes.object.isRequired,
    username:PropTypes.string.isRequired


};
const mapStateToProps=state=>({
  repos:state.profile.repos
})

export default connect(mapStateToProps , {getGithubrepos})(ProfileGithubRepos);
