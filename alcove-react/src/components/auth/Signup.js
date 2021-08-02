import React from 'react';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import authService from './auth-service.js';


//le commentaire qui suit est pour enlever les petites lignes jaunes sur mon vs code car c'est très desagréable !
// eslint-disable-next-line import/no-anonymous-default-export
class Signup extends React.Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    error: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // 1. Signup
    authService.signup(this.state.email, this.state.password, this.state.firstName, this.state.lastName)
      .then(() => {
        this.setState({ error: "" });
        this.props.history.push('/login')
      })
      .catch(err => {
        this.setState({ error: err.response.data.message })
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    if (this.props.user._id) return <Redirect to="/" />

    return (
      <>
        <h1>Nouvel utilisateur?</h1>
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


          <button className="btn">Je créé mon compte</button>
        </form>

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

export default Signup;