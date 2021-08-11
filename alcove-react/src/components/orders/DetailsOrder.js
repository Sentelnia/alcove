import React from "react";

import orderService from "./order-service.js";
// import { Link } from "react-router-dom";

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

        <table id="table-status" class="table-status">
          <tr>
            <th colspan="2">Commande n° {this.state.orderNumber}</th>
          </tr>
          <tr>
            <td class="title">Date:</td>
            <td class="info">{this.formatDate(this.state.orderDate)}</td>
          </tr>
          <tr>
            <td class="title">Statut:</td>
            <td class="info">
              {/* Affichage select input pour ADMIN*/}
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
                <>{this.state.status}</>
              )}
            </td>
          </tr>
          <tr>
            <td class="title">Livraison:</td>
            <td class="info">{this.state.deliveryMode}</td>
          </tr>
        </table>

        {this.state.items.map((item) => (
          <article className="productDetails" key={item._id}>
            <p>{item.product.name}</p>
            <span>Qté: {item.quantity} </span>
            <span>{item.product.unitPrice} € </span>
            <span>Total: {item.quantity * item.product.unitPrice} €</span>
          </article>
        ))}

        <table id="table-total" class="table-total">
          {this.state.deliveryMode === "Livraison à domicile" && (
            <>
              <tr>
                <td class="title">Sous-total:</td>
                <td class="info">{this.sumOrder()} €</td>
              </tr>
              <tr>
                <td class="title">Frais de livraison:</td>
                <td class="info">{this.state.deliveryCost} €</td>
              </tr>
            </>
          )}
          <tr>
            <td class="title total">Total TVA incluse:</td>
            <td class="info total">{this.sumOrder() + this.state.deliveryCost} €</td>
          </tr>
        </table>

        {/* Affichage en fonction du mode de livraison */}
        {this.state.deliveryMode === "Livraison à domicile" && (

          <div className='deliveryOtions'>
            <div className="adress">
              <h5>Adresse de livraison</h5>
              <p>
                {this.state.addDelivery.firstName} {this.state.addDelivery.lastName}
              </p>
              <p>
                {this.state.addDelivery.street} {this.state.addDelivery.supp}
              </p>
              <p>
                {this.state.addDelivery.zip} {this.state.addDelivery.city}
              </p>
            </div>

            <div className="adress">
              <h5>Adresse de facturation</h5>
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
          </div>

        )}
      </div>
    );
  }
}
export default DetailsOrder;
