import React from 'react';

import { Redirect } from 'react-router-dom';
import authService from './auth-service.js';
import "./Signup.css";


//le commentaire qui suit est pour enlever les petites lignes jaunes sur mon vs code car c'est très desagréable !
// eslint-disable-next-line import/no-anonymous-default-export
class Signup extends React.Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    redirect: false,
    error: true,
    msg: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // 1. Signup
    authService.signup(this.state.email, this.state.password, this.state.firstName, this.state.lastName)
      .then((response) => {
        //Redirection après 3s
        this.setState({
          msg: response.message,
          error: false
        });
        setTimeout(() => {
          this.setState({
            redirect: true
          })
        }, 15000);
      })
      .catch(err => {
        this.setState({ msg: err.response.data.message })
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    if (this.props.user._id) return <Redirect to="/" />
    if (this.state.redirect) return <Redirect to='/login' />

    return (
      <>
        <div className='signup'>
          {this.state.error &&
            (<>
              <h3>NOUVEL UTILISATEUR</h3>
              <form onSubmit={this.handleSubmit} className='signup'>
                <label>Adresse email:
                  <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />
                </label>

                <label>Mot de passe:
                  <input type='password' name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
                </label>

                <label>
                  Prénom:
                  <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                </label>

                <label>
                  Nom:
                  <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                </label>

                <button className="btn btnsignup">Je créé mon compte</button>
                <button className="btn btncreate" onClick={() => { this.props.history.replace('/login') }}>J'ai déjà un compte</button>
              </form>
            </>)}

          {this.state.msg && (
            <p className="error">{this.state.msg}</p>
          )}
        </div>

      </>
    )
  }
}

export default Signup;