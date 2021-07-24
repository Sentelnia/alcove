import React from 'react';


import authService from './auth-service.js';
import { Redirect } from 'react-router-dom';
import ProfilEdit from './ProfilEdit'

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {


  render() {
    if (this.props.user === false) return <Redirect to="/" />

    return (
      <>
      
      <ProfilEdit user={this.props.user} updateUser={this.updateUser} history={this.props.history} />

      </>
    )
  }
}
