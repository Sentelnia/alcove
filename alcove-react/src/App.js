import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import Signup from './components/auth/Signup';
import Navbar from './components/Navbar';


class App extends Component {

  state = {
    user: {}
  }

  ////////////////////////////LOGGEDIN/////////////////////////////
  // fetchUser = () => {
  //   if (!this.state.user._id) {
  //     authService.loggedin()
  //       .then(data => this.setState({user: data}))
  //       .catch(err => this.setState({user: false}))
  //     ;
  //   } else {
  //     console.log('user already in the state')
  //   }
  // };

  updateUser = (data) => {
    this.setState({ user: data });
  };

  // componentDidMount() {
  //   this.fetchUser();
  // }

  render() {
    return (
      <div className='App'>
        <Navbar />
        <Switch>

          {/////////////////////* SIGNUP *////////////////////////}
          }
          <Route exact path="/users" render={(props) => (
            <Signup updateUser={this.updateUser} history={props.history} />
          )} />

        </Switch>
      </div>
    )
  }


}

export default App;

