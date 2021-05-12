
import './App.css';
import {BrowserRouter as Router , Route ,Switch } from 'react-router-dom'
import Navbar from './components/layout/navbar'
import Landing from './components/layout/landing'
import Devlopers from './components/layout/devlopers'
import Dashboard from './components/Dashboard/dashboard'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { Fragment, useEffect } from 'react';
import {Provider} from 'react-redux'
import store from './store'
import Alert from './components/layout/alert';
import {loaduser} from './actions/auth';
import {setAuthToken} from './utils/setauthToken'
import Private from './components/routing/privateroute'
import createprofile from'./components/profile-forms/createprofileform'
import editprofile from'./components/profile-forms/editprofile'
import AddExperience from'./components/profile-forms/AddExperience'
import AddEducation from'./components/profile-forms/AddEducation'
import Notfound from './components/layout/notfound'
import Profiles from'./components/profiles/profiles'
import Profile from'./components/profile/profile'
import Posts from'./components/posts/posts'
import Post from'./components/post/post'


if(localStorage.token){
  setAuthToken(localStorage.token)
}
const App = () => {
  useEffect(()=>{
    
      store.dispatch(loaduser());
  
  })
  return (
    <Provider store={store}>
      <Router>
      <Fragment>
        <Navbar/>
       
        <div className="container">
        <Alert/> 
          <Switch>
          
          <Route exact path='/' component={Landing}/>
           <Route exact path='/login' component={Login}/> 
           <Route exact path='/register' component={Register}/>
           <Route exact path='/devlopers' component={Devlopers}/>
           < Route exact path='/profiles' component={Profiles}/>
           < Route exact path='/profile/:id' component={Profile}/>
           < Route exact path='/posts' component={Posts}/>
           
          
          

           <Private Route exact path='/dashboard' component={Dashboard}/>
           <Private Route exact path='/create-profile' component={createprofile}/>
           <Private Route exact path='/edit-profile' component={editprofile}/>
           <Private Route exact path='/add-experience' component={AddExperience}/>
           <Private Route exact path='/add-education' component={AddEducation}/>
           <  Private Route exact path='/post/:id' component={Post}/>
           <Route exact component={Notfound}/>
           
          </Switch>
        </div>
        
     </Fragment>
    </Router>
    </Provider>
    
    
  );
}

export default App;
