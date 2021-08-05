import React from "react";

import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import "./Login.css";
import authService from "./auth-service.js";

// eslint-disable-next-line import/no-anonymous-default-export
class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    authService.login(this.state.email, this.state.password)
      .then(response => {
        this.setState({ error: "" });

        this.props.updateUser(response);
        this.props.history.push('/')
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
      <div className='login'>
        <h3>JE ME CONNECTE</h3>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>
              <em>Email:</em>
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
            </label>
          </p>

          <p>
            <label>
              <em>Mot de passe:</em>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </label>
          </p>
         
          <button className="btn btnconnect">Je me connecte</button>
          <button className="btn btncreate" onClick={()=> {this.props.history.replace('/signup')}}>Créer un compte</button>
        </form>

        {this.state.error && (
          <p className="error">{this.state.error}</p>
        )}
  
        <Link to="/forgot-password">Mot de passe oublié?</Link> {/* https://itnext.io/password-reset-emails-in-your-react-app-made-easy-with-nodemailer-bb27968310d7*/}
        
      </div>
    );
  }
}

export default Login;