import React from 'react';


// import authService from './auth-service.js';
import { Redirect } from 'react-router-dom';
import ProfilEdit from './ProfilEdit';
import Order from '../orders/Order'

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {


  render() {
    if (this.props.user === false) return <Redirect to="/" />

    return (
      <>
      
       {/////////////////////* ORDER *////////////////////////
       }
      <Order />

       {/////////////////////* PROFIL EDIT *////////////////////////
       }
      <ProfilEdit user={this.props.user} updateUser={this.updateUser} history={this.props.history} />
      
      </>
    )
  }
}
