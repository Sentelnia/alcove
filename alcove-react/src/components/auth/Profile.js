import React from 'react';


import authService from './auth-service.js';
import { Redirect } from 'react-router-dom';



export default class extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    civility:"",
    adresses:[],

    error: ""
  }


  handleSubmit = (event) => {
    event.preventDefault();

  /////////////////EDIT/////////////

    authService.edit(this.state.firstName, this.state.lastName, this.state.email, this.state.civility, this.state.telephone, this.state.adresses)
      .then(response => {
        this.setState({error: ""});

        this.props.updateUser(response)
      })
      .catch(err => this.setState({error: err.response.data.message}))
  }

  render() {
    if (this.props.user === false) return <Redirect to="/" />

    return (
      <>
      </>
    )
  }
}
