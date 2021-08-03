import React from "react";
import { Redirect } from 'react-router-dom';

import authService from "./auth-service.js";

class ResetPassword extends React.Component {
  state = {
    email: '',
    msg: ''
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    authService.resetPassword(this.state.email)
      .then(response => {
        this.setState({ msg: '' });
      })
      .catch(err => {
        this.setState({  msg: err.response.data.message  })
      });
  }


  render() {

    if (this.props.user._id) return <Redirect to="/" />

    return (
      <>
        <h1>Mot de passe oublié?</h1>
        <form onSubmit={(e)=> this.handleSubmit(e)}>
          <label>
            Email
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <button className="btn">Valider</button>
        </form>

        {this.state.msg && (
          <p className="msg">{this.state.msg}</p>
        )}
      </>
    )
  }
}

export default ResetPassword;