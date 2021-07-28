import React from 'react';


import orderService from './order-service.js';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


// eslint-disable-next-line import/no-anonymous-default-export
class DetailsOrder extends React.Component {

  render() {
    if (this.props.user === false) return <Redirect to="/" />

    return (
      <div className='orderDetails'>
        DetailsOrder
      </div>
    )
  }
}
export default DetailsOrder;