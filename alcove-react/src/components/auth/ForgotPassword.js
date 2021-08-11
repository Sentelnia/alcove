import React from "react";
import { Redirect } from 'react-router-dom';
import './Signup.css'
import authService from "./auth-service.js";

class ForgotPassword extends React.Component {
  state = {
    email: '',
    msg: '',
    error: true
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    authService.forgotPassword(this.state.email)
      .then((response) => {
        this.setState({
          msg: response.message,
          error: false
        });
      })
      .catch(err => {
        this.setState({ msg: err.response.data.message })
      });
  }

  render() {

    if (this.props.user._id) return <Redirect to="/" />

    return (
      <div className='forgot'>
        {this.state.error &&
          (
            <div>
              <h3>Mot de passe oublié?</h3>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <label>
                  Votre Email:
                  <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                </label>
                <button className="btn btnforgot">Valider</button>
              </form>
            </div>
          )}

        {this.state.msg && (
          <p className="error">{this.state.msg}</p>
        )}
      </div>

    )
  }
}

export default ForgotPassword;