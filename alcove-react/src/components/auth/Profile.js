import React from 'react';


import authService from './auth-service.js';
import { Redirect } from 'react-router-dom';



// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  state = {
    firstName:  this.props.user.firstName || "",
    lastName:   this.props.user.lastName || "",
    email:      this.props.user.email || "",
    telephone:  this.props.user.telephone || "",
    civility:   this.props.user.civility || "",
    //Verifie si adresse[0] est undefined
    street:     this.props.user.adresses && this.props.user.adresses[0]?.street || "",
    supp:       this.props.user.adresses && this.props.user.adresses[0]?.supp || "",
    zip:        this.props.user.adresses && this.props.user.adresses[0]?.zip || "",
    city:       this.props.user.adresses && this.props.user.adresses[0]?.city || "",

    error: ""
  }
  componentDidUpdate(prevProps, prevState) {
    // executée qd n'importe quelle props + nimporte quel state change !!

    if (prevProps.user !== this.props.user) {
      // la props user vient de changer
      this.setState({
        
      })
    }
  }


  handleSubmit = (event) => {
    event.preventDefault();

  /////////////////EDIT/////////////

    authService.edit(
      this.state.firstName, 
      this.state.lastName, 
      this.state.email, 
      this.state.civility, 
      this.state.street,
      this.state.supp,
      this.state.zip,
      this.state.city,
      this.state.telephone 
    )
      .then(response => {
        this.setState({error: ""});

        this.props.updateUser(response)
      })
      .catch(err => this.setState({error: err.response.data.message}))
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  } 

  render() {
    if (this.props.user === false) return <Redirect to="/" />

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>
              <em>Prénom</em>
              <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
            </label>
          </p>

          <p>
            <label>
              <em>Nom de Famille</em>
              <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
            </label>
          </p>

          <p>
            <label>
              <em>Email</em>
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
            </label>
          </p>

          <p>
            <label>
              <em>Téléphone</em>
              <input type="tel" name="telephone" value={this.state.password} onChange={this.handleChange} />
            </label>
          </p>

          <p>
            <label>
              <em>Civilité</em>
              <input type="password" name="civility" value={this.state.password} onChange={this.handleChange} />
            </label>
          </p>

          <p>
            <label>
              <em>Adresse</em>
              <input type="text" name="sreet" value={this.state.street} onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              <em>Complément d'adresse</em>
              <input type="text" name="supp" value={this.state.sup} onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              <em>Code postal</em>
              <input type="text" name="zip" value={this.state.zip} onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              <em>Ville</em>
              <input type="text" name="city" value={this.state.city} onChange={this.handleChange} />
            </label>
          </p>
        </form>

        <button className="btn" onClick={this.handleSubmit}>Editer mes infos perso</button>

      </>
    )
  }
}