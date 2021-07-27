import React from 'react';


import orderService from './order-service.js';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  state= {
    orders: []
  }
  
  componentDidMount() {
    this.getAllOrders();
  }

  getAllOrders = () =>{
    orderService.getOrders()
    .then((allOrders) => {
      this.setState({
        orders: allOrders
      })
    })
  }


  render() {
    if (this.props.user === false) return <Redirect to="/" />

    return (
      <div className='orderList'>
        <h2>Mes achats</h2>
        {this.state.orders.map (order => {
          return (
            <div ClassName='order' key={order._id}>
              <p>Commande web n°{order._id}</p>
              <span>{order.orderDate}</span> - <span>{order.status}</span>
              <Link to={`orders/${order._id}`}>Voir les détails de la commande</Link>
            </div>
          )
        })}
      </div>
    )
  }
}