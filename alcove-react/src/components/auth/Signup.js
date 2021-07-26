import React from 'react';

import { Link } from 'react-router-dom';

import authService from './auth-service.js';


//le commentaire qui suit est pour enlever les petites lignes jaunes sur mon vs code car c'est très desagréable !
// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  state = {
    email: "",
    password: '',
    error: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();


    // 1. Signup
    authService.signup(this.state.email, this.state.password)
      .then(() => {
        this.setState({ error: "" });
        
      })
      .catch(err => {
        this.setState({ error: err.response.data.message })
      })
      ;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  render() {
    return (
      <>
        <form onSubmit={this.handleFormSubmit} className='signup'>
          <label>Adresse email:</label>
          <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />

          <label>Mot de passe:</label>
          <input type ='password' name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

        </form>

        <button className="btn" onClick={this.handleSubmit}>Je créé mon compte</button>

        <p>
          <Link to="/login">J'ai déja un compte </Link>
        </p>

        {this.state.error && (
          <p className="error">{this.state.error}</p>
        )}
      </>
    )
  }
}

