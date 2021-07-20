import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import Signup from './components/auth/Signup';
import authService from './components/auth/auth-service.js';
import Login from './components/auth/Login';

class App extends Component {

  state = {
    user: {}
  }

  //////////////////////////LOGGEDIN/////////////////////////////
  fetchUser = () => {
    if (!this.state.user._id) {
      authService.loggedin()
        .then(data => this.setState({ user: data }))
        .catch(err => this.setState({ user: false }))
        ;
    } else {
      console.log('user already in the state')
    }
  };

  updateUser = (data) => {
    this.setState({ user: data });
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div className='App'>
        <Switch>
          {/////////////////////* SIGNUP *////////////////////////
          }
          <Route exact path="/signup" render={() => (
            <Signup />
          )} />


          {/////////////////////* LOGIN *////////////////////////
          }
          <Route exact path="/login" render={(props) => (
            <Login updateUser={this.updateUser} history={props.history} />
          )} />



        </Switch>

      </div>
    )
  }


}

export default App;

