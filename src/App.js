import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Songs from './components/songs';
import SongsForm from './components/songsForm';
import RegisterForm from './components/registerForm';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import NavBar from './components/navBar';
import 'react-toastify/dist/ReactToastify.css' 
import './App.css';

class App extends Component {

  state = {};

  componentDidMount() {
    try{
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    this.setState({ user});
    }
    catch (ex) {}
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user= {this.state.user}/>
      <main className="container">
        <Switch>
          <Route path="/newSong/:id" component={SongsForm} />
          <Route path="/registerForm" component={RegisterForm} />
          <Route path="/loginForm" component={LoginForm} />
          <Route path="/logout" component={Logout} />        
          <Route path="/todos" render={props => <Songs {...props} user={this.state.user}/>} />
          <Route path="/" component={LoginForm} />
        </Switch>
      </main>
      </React.Fragment>
    );
  }
}

export default App;
