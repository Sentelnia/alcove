import React from "react";

import authService from "./auth-service.js";

class ResetPassword extends React.Component {
  state = {
    email: '',
    password: '',
    msg: '',
    // redirect: false,
    error: true
  }
  componentDidMount() {

    authService.resetPassword(this.props.match.params.id)
      .then((foundUser) => {
        //Verif requete contenant le Token a retourné un User
        if (!foundUser.email) {
          this.setState({
            msg: foundUser.message,
            error: false
          });
          return
        }

        this.setState({
          email: foundUser.email
        });

      })
      .catch(err => {
        this.setState({
          msg: err.response.data.message,
          error: false
        })
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    authService.updateForgottenPassword(this.state.email, this.state.password)
      .then((response) => {
        this.setState({
          msg: response.message,
          error: false
        });
        //Redirection après 3s
        // setTimeout(() => {
        //   this.setState({
        //     redirect: true
        //   })
        // }, 3000);
      })
      .catch(err => {
        this.setState({ msg: err.response.data.message })
      });
  }

  render() {

   // if (this.state.redirect) return <Redirect to='/login' />

    return (
      <>
        {this.state.error && (
          <>
            <form onSubmit={(e) => this.handleSubmit(e)}>

              <p>
              Bonjour,
              vous avez demandé la réinitialisation du mot de passe associé à l'adresse E-mail: {this.state.email}
              </p>

              <label>
                Mot de passe:
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
              </label>
              <button className="btn">Réinitialiser mon mot de passe</button>
            </form>
          </>
        )}

        {this.state.msg && (
          <p className="error">{this.state.msg}</p>
        )}
      </>
    )
  }
}

export default ResetPassword;