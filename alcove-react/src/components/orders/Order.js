import React from "react";

import orderService from "./order-service.js";
// import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import './Order.css'

// eslint-disable-next-line import/no-anonymous-default-export
class Order extends React.Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    orderService
      .getOrders()
      .then((allOrders) => {
        this.setState({
          orders: allOrders,
        });
      })
      .catch((err) => console.log("err getOrders:", err));
  }

  //fonction utilitaire
  formatDate(myDate) {
    let formatDate = myDate.split("T")[0]; // => AAAA-MM-JJ
    return (
      formatDate.slice(8, 10) +
      "." +
      formatDate.slice(5, 7) +
      "." +
      formatDate.slice(0, 4)
    );
  }

  render() {
    return (
      <>
        {this.state.orders.length === 0 && (
          <>
            <article className="order">
              <p>
               Vous n'avez pas encore effectué d'achat.
              </p>
            </article>
          </>
        )}
        <div className="orderList">
          {this.state.orders.map((order) => {
            return (
              <article className="order" key={order._id}>
                <p>
                  Commande web n°{order.orderNumber}{" "}
                  <span>{this.formatDate(order.orderDate)}</span> -{" "}
                  <span>{order.status}</span>
                </p>

                <Link to={`details-order/${order._id}`}>
                  Détails
                </Link>
              </article>

            );
          })}
        </div>
      </>
    );
  }
}
export default Order;
