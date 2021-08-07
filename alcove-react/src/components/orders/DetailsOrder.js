import React from "react";

import orderService from "./order-service.js";
import { Link } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
class DetailsOrder extends React.Component {
  state = {
    addDelivery: {
      firstName: "",
      lastName: "",
      street: "",
      supp: "",
      zip: "",
      city: "",
      email: "",
    },
    addBilling: {
      firstName: "",
      lastName: "",
      street: "",
      supp: "",
      zip: "",
      city: "",
    },
    items: [],
    orderDate: "",
    status: "",
  };

  componentDidMount() {
    orderService
      .getOrder(this.props.match.params.id)
      .then((response) => this.setState(response))
      .catch((err) => {
        console.log(err);
      });
  }

  handleChangeStatus = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    //Update status de la commande
    orderService
      .updateOrder(value, this.props.match.params.id)
      .then(() => {
        console.log("Commande mise à jour");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fonctions utilitaires
  sumOrder() {
    //Somme € de tous les éléments de la commande
    return Number(
      this.state.items
        .map((obj) => obj.product.unitPrice * obj.quantity) // Retourne un tableau le montant total par produit [10, 20, 8.99]
        .reduce((a, b) => a + b, 0) // Retourne la somme totale
        .toFixed(2) // 2 décimales
    );
  }

  sumItemsOrder() {
    //Somme de tous les articles de la commande
    return Number(
      this.state.items
        .map((obj) => obj.quantity) // Retourne un tableau du nombres commandés [1, 3, 1]
        .reduce((a, b) => a + b, 0) // Retourne la somme totale
    );
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
    console.log("state detail order:", this.state);
    return (
      <div className="orderDetails">
        <h3>Commande n° {this.state.orderNumber}</h3>
        <div className="status">
          <span>{this.state.orderDate.split("T")[0]} - </span>
          {/* Affichage select inout pour ADMIN*/}
          {this.props.user.role === "ADMIN" ? (
            <>
              <select
                name="status"
                value={this.state.status}
                onChange={(e) => this.handleChangeStatus(e)}
              >
                <option value="En attente de validation">
                  En attente de validation
                </option>
                <option value="Validée">Validée</option>
                <option value="Expédiée">Expédiée</option>
              </select>
            </>
          ) : (
            <span>{this.state.status}</span>
          )}

          <p>{this.sumItemsOrder()} Articles</p>
        </div>
        {this.state.items.map((item) => (
          <article className="productDetails" key={item._id}>
            <p>{item.product.name}</p>
            <span>Qté: {item.quantity} </span>
            <span>{item.product.unitPrice} € </span>
            <span>Total: {item.quantity * item.product.unitPrice} €</span>
          </article>
        ))}
        <div className="totalOrderDetails">
          <p>
            Sous-total:<span> {this.sumOrder()} €</span>
          </p>
          <p>
            Frais de livraison:<span> {this.state.deliveryCost}</span> €
          </p>
          <p>
            Total TVA incluse:
            <span> {this.sumOrder() + this.state.deliveryCost}</span> €
          </p>
        </div>
          <div className='deliveryOtions'>
        {/* Affichage en fonction du mode de livraison */}
        {this.state.deliveryMode === "Livraison à domicile" ? (
          <>
            <div className="deliveryAdress">
              <h3>Adresse de livraison</h3>
              <p>
                {this.state.addDelivery.firstName}{" "}
                {this.state.addDelivery.lastName}
              </p>
              <p>
                {this.state.addDelivery.street} {this.state.addDelivery.supp}
              </p>
              <p>
                {this.state.addDelivery.zip} {this.state.addDelivery.city}
              </p>
              
            </div>
            <hr/>
            <div className="billingAdress">
              <h3>Adresse de facturation</h3>
              <p>
                {this.state.addBilling.firstName}{" "}
                {this.state.addBilling.lastName}
              </p>
              <p>
                {this.state.addBilling.street} {this.state.addBilling.supp}
              </p>
              <p>
                {this.state.addBilling.zip} {this.state.addBilling.city}
              </p>
            </div>
          </>
        ) : (
          <h4>Retrait en boutique</h4>
        )}
        </div>
      </div>
    );
  }
}
export default DetailsOrder;
