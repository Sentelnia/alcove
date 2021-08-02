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
    .catch(err => console.log('err getOrders:', err))
  }

  //fonction utilitaire
  formatDate(myDate){
    let formatDate = myDate.split("T")[0] // => AAAA-MM-JJ
    return formatDate.slice(8,10) + '.' + formatDate.slice(5,7) + '.' + formatDate.slice(0,4);    
  }

  render() {
    return (
      <div className='orderList'>
        <h2>Mes achats</h2>
        {this.state.orders.map(order => {
          return (
            <div className='order' key={order._id}>
              <p>Commande web n°{order.orderNumber}</p>
              <span>{this.formatDate(order.orderDate)}</span> - <span>{order.status}</span>
              <Link to={`details-order/${order._id}`}>Voir les détails de la commande</Link>
            </div>
          )
        })}
      </div>
    )
  }
}
export default Order;