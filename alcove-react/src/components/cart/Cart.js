import React from 'react';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import cartService from './cart-service';
import orderService from '../orders/order-service';

class Cart extends React.Component {
  state = {

    addDelivery: {
      deliveryCivility: this.props.user.civility || '',
      deliveryFirstName: this.props.user.firstName || '',
      deliveryLastName: this.props.user.lastName || '',
      deliveryStreet: this.props.user?.street || '',
      deliverySupp: this.props.user?.supp || '',
      deliveryZip: this.props.user?.zip || '',
      deliveryCity: this.props.user?.city || '',
      deliveryTelephone: this.props.user.telephone || '',
    },

    deliveryMode: '',
    deliveryCost:0,
    addBillingSameAsDelivery: true,

    addBilling: {
      billingCivility: this.props.user.civility || '',
      billingFirstName: this.props.user.firstName || '',
      billingLastName: this.props.user.lastName || '',
      billingStreet: this.props.user?.street || '',
      billingSupp: this.props.user?.supp || '',
      billingZip: this.props.user?.zip || '',
      billingCity: this.props.user?.city || '',
    },
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.props.user !== prevProps.user) {
      this.setState({

        addDelivery: {
          deliveryCivility: this.props.user?.civility || '',
          deliveryFirstName: this.props.user?.firstName || '',
          deliveryLastName: this.props.user?.lastName || '',
          deliveryStreet: this.props.user?.street || '',
          deliverySupp: this.props.user?.supp || '',
          deliveryZip: this.props.user?.zip || '',
          deliveryCity: this.props.user?.city || '',
          deliveryTelephone: this.props.user?.telephone || '',
        },

        addBilling: {
          billingCivility: this.props.user?.civility || '',
          billingFirstName: this.props.user?.firstName || '',
          billingLastName: this.props.user?.lastName || '',
          billingStreet: this.props.user?.street || '',
          billingSupp: this.props.user?.supp || '',
          billingZip: this.props.user?.zip || '',
          billingCity: this.props.user?.city || '',
        },
      })
    }
  }

  removeProductFromCart = (event, id) => {
    event.preventDefault();

    cartService.removeProduct(id)
      .then((response) => {
        this.props.updateCart(response)
      })
      .catch(err => console.log('error delete product:', err))
  }

  cartToOrder = (event) => {

    orderService.getOrders()
      .then((response) => {
        //Génération n° de commande selon logique userNumber + incrémentation du n° de commande par User
        let fourDigitsUserNumber = this.props.user.userNumber;
        let fourDigitsOderNumber = response.length + 1;

        while (fourDigitsUserNumber.toString().length < 4) {
          fourDigitsUserNumber = "0" + fourDigitsUserNumber.toString();
        }

        while (fourDigitsOderNumber.toString().length < 4) {
          fourDigitsOderNumber = "0" + fourDigitsOderNumber.toString();
        }

        let OrderNumber = fourDigitsUserNumber + '-' + fourDigitsOderNumber;

        //Création de la commande
        cartService.validateCart(this.state.addDelivery, this.state.addBilling, this.state.deliveryMode, this.state.deliveryCost, OrderNumber)
          .then(() => {
            this.props.updateCart({ cart: [] })
          })
          .catch(err => console.log('err:', err))
      })
      .catch(err => console.log('err:', err))
  }

  handleChangeProductQuantity = (event, id) => {
    let regEx = /^[0-9\b]+$/; //autorise chiffre de 0 à 9
    if (regEx.test(event.target.value) && Number(event.target.value) !== 0) {
      this.props.updateProductQuantity(id, event.target.value);
    }
  }

  handleChangeDeliveryOption = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    // Gestion changement de mode de livraison
    if ((name === 'deliveryMode') && (value === 'Livraison à domicile')) {
      this.setState({
        deliveryCost:3.95,
        addDelivery: {
          deliveryCivility: this.props.user?.civility || '',
          deliveryFirstName: this.props.user?.firstName || '',
          deliveryLastName: this.props.user?.lastName || '',
          deliveryStreet: this.props.user?.street || '',
          deliverySupp: this.props.user?.supp || '',
          deliveryZip: this.props.user?.zip || '',
          deliveryCity: this.props.user?.city || '',
          deliveryTelephone: this.props.user.telephone || '',
        },
        addBilling: {
          billingCivility: this.props.user?.civility || '',
          billingFirstName: this.props.user?.firstName || '',
          billingLastName: this.props.user?.lastName || '',
          billingStreet: this.props.user?.street || '',
          billingSupp: this.props.user?.supp || '',
          billingZip: this.props.user?.zip || '',
          billingCity: this.props.user?.city || '',
        },
      });
    } else if ((name === 'deliveryMode') && (value === 'Retrait en boutique')) {
      this.setState({
        deliveryCost:0,
        addDelivery: {
          deliveryCivility: this.props.user?.civility || '',
          deliveryFirstName: this.props.user?.firstName || '',
          deliveryLastName: this.props.user?.lastName || '',
          deliveryStreet: '229, avenue Jean Jaurès',
          deliverySupp: '',
          deliveryZip: '92140',
          deliveryCity: 'Clamart',
          deliveryTelephone: this.props.user.telephone || '0146381117',
        },
        addBilling: {
          billingCivility: this.props.user?.civility || '',
          billingFirstName: this.props.user?.firstName || '',
          billingLastName: this.props.user?.lastName || '',
          billingStreet: '229, avenue Jean Jaurès',
          billingSupp: '',
          billingZip: '92140',
          billingCity: 'Clamart',
        }
      });
    }
  }

  handleChangeCheckbox = (event) => {
    const { name, checked } = event.target;
    this.setState({ [name]: checked });

    if (checked) {
      this.setState({
        addBilling: {
          billingCivility: this.state.addDelivery.deliveryCivility,
          billingFirstName: this.state.addDelivery.deliveryFirstName,
          billingLastName: this.state.addDelivery.deliveryLastName,
          billingStreet: this.state.addDelivery.deliveryStreet,
          billingSupp: this.state.addDelivery.deliverySupp,
          billingZip: this.state.addDelivery.deliveryZip,
          billingCity: this.state.addDelivery.deliveryCity,
        }
      })
    } else {
      this.setState({
        addBilling: {
          billingCivility: '',
          billingFirstName: '',
          billingLastName: '',
          billingStreet: '',
          billingSupp: '',
          billingZip: '',
          billingCity: '',
        }
      })
    }
  }

  handleChangeAdressDelivery = (event) => {
    const { name, value } = event.target;
    this.setState({ addDelivery: { ...this.state.addDelivery, [name]: value } });  //https://www.geeksforgeeks.org/how-to-update-nested-state-properties-in-reactjs/
  }

  handleChangeAdressBilling = (event) => {
    const { name, value } = event.target;
    this.setState({ addBilling: { ...this.state.addBilling, [name]: value } });  //https://www.geeksforgeeks.org/how-to-update-nested-state-properties-in-reactjs/
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

  isReadyToValidate() {
    //1. si deliveryMode = "" => empêcher validation
    if (this.state.deliveryMode === "") {
      return true;
    }
    //2. deliveryMode = "Retour en boutique" => autoriser validation
    if (this.state.deliveryMode === 'Retour en boutique') {
      return false;
    }
    //3. deliveryMode = "Livraison à domicile" && Adresse livraison = adresse facturation
    if ((this.state.deliveryMode === 'Livraison à domicile') && (this.state.addBillingSameAsDelivery)) {
      // => check sur les state adress delivery
      for (let [key, value] of Object.entries(this.state.addDelivery)) {
        if (key !== "deliverySupp" && value === "") {
          return true;
        }
      }
    }
    //4. deliveryMode = "Livraison à domicile" && Adresse livraison != adresse facturation
    // => check sur les state adress delivery && adress billing
    if ((this.state.deliveryMode === 'Livraison à domicile') && (!this.state.addBillingSameAsDelivery)) {
      for (let [key, value] of Object.entries(this.state.addDelivery)) {
        if (key !== "deliverySupp" && value === "") {
          return true;
        }
      }

      for (let [key, value] of Object.entries(this.state.addBilling)) {
        if (key !== "billingSupp" && value === "") {
          return true;
        }
      }
    }
  }

  render() {
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
                    <div className="delivery-option" onChange={e => this.handleChangeDeliveryOption(e)}>
                      <label>
                        <input type="radio" name="deliveryMode" value="Retrait en boutique" />
                        Retrait en boutique
                      </label>
                      <label>
                        <input type="radio" name="deliveryMode" value="Livraison à domicile" />
                        Livraison à domicile
                      </label>
                    </div>

                    {/* {Gestion de l'affichage en fonction du mode de livraison choisi} */}
                    {this.state.deliveryMode === '' ?
                      (<p>Selectionner mode de livraison</p>) :
                      (this.state.deliveryMode === 'Livraison à domicile' &&
                        (
                          <>
                            <h1>Adresse de livraison</h1>
                            <form>
                              <p>
                                <label>
                                  <em>Civilité</em>
                                  <input type="text" name="deliveryCivility" value={this.state.addDelivery.deliveryCivility} onChange={e => this.handleChangeAdressDelivery(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Prénom</em>
                                  <input type="text" name="deliveryFirstName" value={this.state.addDelivery.deliveryFirstName} onChange={e => this.handleChangeAdressDelivery(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Nom de Famille</em>
                                  <input type="text" name="deliveryLastName" value={this.state.addDelivery.deliveryLastName} onChange={e => this.handleChangeAdressDelivery(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Adresse</em>
                                  <input type="text" name="deliveryStreet" value={this.state.addDelivery.deliveryStreet} onChange={e => this.handleChangeAdressDelivery(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Complément d'adresse</em>
                                  <input type="text" name="deliverySupp" value={this.state.addDelivery.deliverySupp} onChange={e => this.handleChangeAdressDelivery(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Code postal</em>
                                  <input type="text" name="deliveryZip" value={this.state.addDelivery.deliveryZip} onChange={e => this.handleChangeAdressDelivery(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Ville</em>
                                  <input type="text" name="deliveryCity" value={this.state.addDelivery.deliveryCity} onChange={e => this.handleChangeAdressDelivery(e)} />
                                </label>
                              </p>

                              <p>
                                <label>
                                  <em>Téléphone</em>
                                  <input type="tel" name="deliveryTelephone" value={this.state.addDelivery.deliveryTelephone} onChange={e => this.handleChangeAdressDelivery(e)} />
                                </label>
                              </p>

                              <div>
                                <label>
                                  <input type="checkbox" name="addBillingSameAsDelivery" onChange={e => this.handleChangeCheckbox(e)} checked={this.state.addBillingSameAsDelivery} />
                                  Adresse de facturation identique à adresse de livraison
                                </label>
                              </div>
                            </form>
                          </>
                        )
                      )
                    }

                    {/* {Gestion de l'affichage en fonction du choix sur l'adresse de facturation} */}
                    {(this.state.deliveryMode === 'Livraison à domicile' && !this.state.addBillingSameAsDelivery) && (
                      <>
                        <h1>Adresse de facturation</h1>
                        <form>
                          <p>
                            <label>
                              <em>Civilité</em>
                              <input type="text" name="billingCivility" value={this.state.addBilling.billingCivility} onChange={e => this.handleChangeAdressBilling(e)} />
                            </label>
                          </p>

                          <p>
                            <label>
                              <em>Prénom</em>
                              <input type="text" name="billingFirstName" value={this.state.addBilling.billingFirstName} onChange={e => this.handleChangeAdressBilling(e)} />
                            </label>
                          </p>

                          <p>
                            <label>
                              <em>Nom de Famille</em>
                              <input type="text" name="billingLastName" value={this.state.addBilling.billingLastName} onChange={e => this.handleChangeAdressBilling(e)} />
                            </label>
                          </p>

                          <p>
                            <label>
                              <em>Adresse</em>
                              <input type="text" name="billingStreet" value={this.state.addBilling.billingStreet} onChange={e => this.handleChangeAdressBilling(e)} />
                            </label>
                          </p>

                          <p>
                            <label>
                              <em>Complément d'adresse</em>
                              <input type="text" name="billingSupp" value={this.state.addBilling.billingSupp} onChange={e => this.handleChangeAdressBilling(e)} />
                            </label>
                          </p>

                          <p>
                            <label>
                              <em>Code postal</em>
                              <input type="text" name="billingZip" value={this.state.addBilling.billingZip} onChange={e => this.handleChangeAdressBilling(e)} />
                            </label>
                          </p>

                          <p>
                            <label>
                              <em>Ville</em>
                              <input type="text" name="billingCity" value={this.state.addBilling.billingCity} onChange={e => this.handleChangeAdressBilling(e)} />
                            </label>
                          </p>

                        </form>
                      </>
                    )}

                    <h1>Ma commande</h1>
                    <p>{this.sumItemsCart()} Articles</p>
                    <p>Sous-total:<span> {this.sumCart()} €</span></p>
                    <p>Frais de livraison:<span> {this.state.deliveryCost}</span> €</p>
                    <p>Total à payer TVA incluse:<span> {(this.sumCart() +  this.state.deliveryCost)}</span> €</p>

                    <button className="btn" disabled={this.isReadyToValidate()} onClick={(e) => this.cartToOrder(e)}>Valider et payer via Paypal</button>
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