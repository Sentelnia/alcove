import React from "react";
import { Redirect } from 'react-router-dom';

import authService from "./auth-service.js";

class Verify extends React.Component {
  state = {
    msg:''
  }

  componentDidMount() {
    authService.verify(this.props.match.params.id)
      .then(() => this.props.history.push('/login'))
      .catch(err => {
        this.setState({ msg: err.response.data.message })
      });
  }
  
  render() {
    return (
      <>
        {this.state.msg && (
          <p className="msg">{this.state.msg}</p>
        )}
      </>
    )
  }
}

export default Verify;