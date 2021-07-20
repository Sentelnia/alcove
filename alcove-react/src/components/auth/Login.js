import React from "react";

import { Link } from "react-router-dom";

import authService from "./auth-service.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
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
        this.props.history.push('/');
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
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>
              <em>Email</em>
              <input type="email" name="email" value={this.state.username} onChange={this.handleChange} />
            </label>
          </p>

          <p>
            <label>
              <em>Mot de passe</em>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </label>
          </p>
        </form>

        <button className="btn" onClick={this.handleSubmit}>Je me connecte</button>

        {this.state.error && (
          <p className="error">{this.state.error}</p>
        )}
        <p>
          <small>
            <Link to="/signup">Créer un compte</Link>
          </small>
        </p>
      </>
    );
  }
}
