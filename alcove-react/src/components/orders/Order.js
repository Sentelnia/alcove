import React from 'react';


import orderService from './order-service.js';
// import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


// eslint-disable-next-line import/no-anonymous-default-export
class Order extends React.Component {
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
    return (
      <div className='orderList'>
        <h2>Mes achats</h2>
        {this.state.orders.map(order => {
          return (
            <div className='order' key={order._id}>
              <p>Commande web n°{order.orderNumber}</p>
              <span>{order.orderDate.split("T")[0]}</span> - <span>{order.status}</span>
              <Link to={`details-order/${order._id}`}>Voir les détails de la commande</Link>
            </div>
          )
        })}
      </div>
    )
  }
}
export default Order;