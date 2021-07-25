import React from 'react';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import cartService from './cart-service';

class Cart extends React.Component {
  state = {
    firstName: this.props.user.firstName || "",
    lastName: this.props.user.lastName || "",
    email: this.props.user.email || "",
    telephone: this.props.user.telephone || "",
    civility: this.props.user.civility || "",

    addDelivery: {
      street: this.props.user?.street || '',
      supp: this.props.user?.supp || '',
      zip: this.props.user?.zip || '',
      city: this.props.user?.city || '',
    },

    deliveryMode: ''
  }

  removeProductFromCart = (event, id) => {
    event.preventDefault();

    cartService.removeProduct(id)
      .then((response) => {
        this.props.updateCart(response)
      })
      .catch(err => console.log('error delete product:', err))
  }

  handleChangeProductQuantity = (event, id) => {
    let regEx = /^[0-9\b]+$/; //autorise chiffre de 0 à 9
    if (regEx.test(event.target.value) && Number(event.target.value) !== 0) {
      this.props.updateProductQuantity(id, event.target.value);
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleChangeAdress = (event) => {
    const { name, value } = event.target;
    this.setState({ addDelivery: { ...this.state.addDelivery, [name]: value } });  //https://www.geeksforgeeks.org/how-to-update-nested-state-properties-in-reactjs/
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit event:', event)
  }

  decreaseQty = (event, id) => {
    let qty = this.props.cart
      .map(obj => obj.product._id === id ? obj.quantity - 1 : 0) // -1 sur le produit du panier cliqué - 0 pour les autres
      .reduce((a, b) => a + b, 0);                               // somme de chaque valeur du tableau

    this.props.updateProductQuantity(id, qty);
  }

  increaseQty = (event, id) => {
    let qty = this.props.cart
      .map(obj => obj.product._id === id ? obj.quantity + 1 : 0) // +1 sur le produit du panier cliqué - 0 pour les autres
      .reduce((a, b) => a + b, 0);                               // somme de chaque valeur du tableau

    this.props.updateProductQuantity(id, qty);
  }

  // Fonctions utilitaires
  sumCart() {
    //Somme € de tous les éléments du panier
    return Number(
      this.props.cart
        .map(obj => obj.product.unitPrice * obj.quantity) // Retourne un tableau le montant total par produit [10, 20, 8.99]
        .reduce((a, b) => a + b, 0)                       // Retourne la somme totale
        .toFixed(2)                                       // 2 décimales
    )
  }

  sumItemsCart() {
    //Somme de tous les articles du panier
    return Number(
      this.props.cart
        .map(obj => obj.quantity)   // Retourne un tableau du nombres commandés [1, 3, 1]
        .reduce((a, b) => a + b, 0) // Retourne la somme totale
    )
  }

  deliveryCost(deliveryMode) {
    return deliveryMode === "home" ? 3.95 : 0;
  }

  render() {
    console.log('props cart', this.props)
    return (
      <>
        {/* {Gestion de l'affichage si utilisateur connecté} */}
        {this.props.user ?
          (
            <>
              <h1>Panier</h1>
              {/* {Gestion de l'affichage si panier vide} */}
              {this.sumItemsCart() === 0 ?
                (<p>Panier vide</p>) :
                (
                  <>
                    <div className="cart-recap-container">
                      <div className="cart-recap-total">
                        <p>Total</p>
                        <p>{this.sumCart()} €</p>
                      </div>
                      <div className="cart-recap-detail">
                        <p>{this.sumItemsCart()} Articles</p>
                        <p>Hors frais de livraison</p>
                      </div>
                    </div>

                    {this.props.cart.map(item => (
                      <div className="cart-container" key={item.product._id}>
                        <img src="https://via.placeholder.com/100x100" alt="product-pict" />
                        <div className="cart-product">
                          <h4>{item.product.name}</h4>
                          <button className="btn" disabled={(item.quantity === 1 || item.quantity === 0) && true} onClick={e => this.decreaseQty(e, item.product._id)}>-</button>
                          <input type="text" name="quantity" value={item.quantity} onChange={e => this.handleChangeProductQuantity(e, item.product._id)} />
                          <button className="btn" onClick={e => this.increaseQty(e, item.product._id)}>+</button>
                          <button className="btn" onClick={(e) => this.removeProductFromCart(e, item.product._id)}>Supprimer</button>
                          <p>{item.quantity * item.product.unitPrice}€</p>
                        </div>
                      </div>
                    ))}

                    <h1>Livraison</h1>
                    <div className="delivery-option" onChange={e => this.handleChange(e)}>
                      <label>
                        <input type="radio" name="deliveryMode" value="shop" />
                        Retrait en boutique
                      </label>
                      <label>
                        <input type="radio" name="deliveryMode" value="home" />
                        Livraison à domicile
                      </label>
                    </div>

                    {/* {Gestion de l'affichage en fonction du mode de livraison choisi} */}
                    {this.state.deliveryMode === '' ?
                      (<p>Selectionner mode de livraison</p>) :
                      (this.state.deliveryMode === 'home' &&
                        (
                          <>
                            <h1>Adresse de livraison</h1>
                            <form>
                              <p>
                                <label>
                                  <em>Civilité</em>
                                  <input type="text" name="civility" value={this.state.civility} onChange={e => this.handleChange(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Prénom</em>
                                  <input type="text" name="firstName" value={this.state.firstName} onChange={e => this.handleChange(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Nom de Famille</em>
                                  <input type="text" name="lastName" value={this.state.lastName} onChange={e => this.handleChange(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Adresse</em>
                                  <input type="text" name="street" value={this.state.addDelivery.street} onChange={e => this.handleChangeAdress(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Complément d'adresse</em>
                                  <input type="text" name="supp" value={this.state.addDelivery.supp} onChange={e => this.handleChangeAdress(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Code postal</em>
                                  <input type="text" name="zip" value={this.state.addDelivery.zip} onChange={e => this.handleChangeAdress(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Ville</em>
                                  <input type="text" name="city" value={this.state.addDelivery.city} onChange={e => this.handleChangeAdress(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Email</em>
                                  <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Téléphone</em>
                                  <input type="tel" name="telephone" value={this.state.telephone} onChange={e => this.handleChange(e)} />
                                </label>
                              </p>
                            </form>
                          </>
                        )
                      )
                    }

                    <h1>Ma commande</h1>
                    <p>{this.sumItemsCart()} Articles</p>
                    <p>Sous-total:<span>{this.sumCart()} €</span></p>
                    <p>Frais de livraison:<span>{this.deliveryCost(this.state.deliveryMode)}</span></p>
                    <p>Total à payer TVA incluse:<span>{this.sumCart() + this.deliveryCost(this.state.deliveryMode)}</span></p>
                  </>
                )}
            </>
          ) :
          <Redirect to="/login" />}
      </>
    )
  }
}

export default Cart;