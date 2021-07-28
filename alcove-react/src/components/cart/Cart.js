import React from 'react';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import cartService from './cart-service';
import orderService from '../orders/order-service';

class Cart extends React.Component {
  state = {
    firstName: this.props.user.firstName || '',
    lastName: this.props.user.lastName || '',
    email: this.props.user.email || '',
    telephone: this.props.user.telephone || '',
    civility: this.props.user.civility || '',

    addDelivery: {
      deliveryStreet: this.props.user?.street || '',
      deliverySupp: this.props.user?.supp || '',
      deliveryZip: this.props.user?.zip || '',
      deliveryCity: this.props.user?.city || '',
    },

    deliveryMode: '',
    addBillingSameAsDelivery: true,

    billingFirstName: '',
    billingLastName: '',
    billingCivility: '',

    addBilling: {
      billingStreet: this.props.user?.street || '',
      billingSupp: this.props.user?.supp || '',
      billingZip: this.props.user?.zip || '',
      billingCity: this.props.user?.city || '',
    },
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate cart prevProps:', prevProps);
    // console.log('componentDidUpdate cart props:', this.props);

    // console.log('componentDidUpdate cart prevState:', prevState);
    // console.log('componentDidUpdate cart state:', this.state);

    if (this.props.user !== prevProps.user) {
      this.setState({
        firstName: this.props.user.firstName || '',
        lastName: this.props.user.lastName || '',
        email: this.props.user.email || '',
        telephone: this.props.user.telephone || '',
        civility: this.props.user.civility || '',

        addDelivery: {
          deliveryStreet: this.props.user?.street || '',
          deliverySupp: this.props.user?.supp || '',
          deliveryZip: this.props.user?.zip || '',
          deliveryCity: this.props.user?.city || '',
        },

        addBilling: {
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

        while (fourDigitsUserNumber.toString().length < 4){
          fourDigitsUserNumber = "0" + fourDigitsUserNumber.toString();
        }

        while (fourDigitsOderNumber.toString().length < 4){
          fourDigitsOderNumber = "0" + fourDigitsOderNumber.toString();
        }

        let OrderNumber = fourDigitsUserNumber + '-' + fourDigitsOderNumber;

        //Création de la commande
        cartService.validateCart(this.state.addDelivery, this.state.addBilling, this.state.deliveryMode,OrderNumber)
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if ((name === 'deliveryMode') && (value === 'Livraison à domicile')) {
      this.setState({
        addDelivery: {
          deliveryStreet: this.props.user?.street || '',
          deliverySupp: this.props.user?.supp || '',
          deliveryZip: this.props.user?.zip || '',
          deliveryCity: this.props.user?.city || '',
        },
        addBilling: {
          billingStreet: this.props.user?.street || '',
          billingSupp: this.props.user?.supp || '',
          billingZip: this.props.user?.zip || '',
          billingCity: this.props.user?.city || '',
        }
      });
    } else if ((name === 'deliveryMode') && (value === 'Retrait en boutique')) {
      this.setState({
        addDelivery: {
          deliveryStreet: '229, avenue Jean Jaurès',
          deliverySupp: '',
          deliveryZip: '92140',
          deliveryCity: 'Clamart',
        },
        addBilling: {
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
          billingStreet: this.state.addDelivery.deliveryStreet,
          billingSupp: this.state.addDelivery.deliverySupp,
          billingZip: this.state.addDelivery.deliveryZip,
          billingCity: this.state.addDelivery.deliveryCity,
        }
      })
    } else {
      this.setState({
        addBilling: {
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
    return deliveryMode === "Livraison à domicile" ? 3.95 : 0;
  }

  render() {
    console.log('props cart', this.props)
    console.log('state cart', this.state)
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
                              <input type="text" name="billingCivility" value={this.state.billingCivility} onChange={e => this.handleChange(e)} />
                            </label>
                          </p>

                          <p>
                            <label>
                              <em>Prénom</em>
                              <input type="text" name="billingFirstName" value={this.state.billingFirstName} onChange={e => this.handleChange(e)} />
                            </label>
                          </p>

                          <p>
                            <label>
                              <em>Nom de Famille</em>
                              <input type="text" name="billingLastName" value={this.state.billingLastName} onChange={e => this.handleChange(e)} />
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
                    <p>Frais de livraison:<span> {this.deliveryCost(this.state.deliveryMode)}</span> €</p>
                    <p>Total à payer TVA incluse:<span> {(this.sumCart() + this.deliveryCost(this.state.deliveryMode)).toFixed(2)}</span> €</p>

                    {/* {Gestion affichage btn valider} */}
                    {/* {this.state.deliveryMode === 'Retrait en boutique' &&                     */}

                    <button className="btn" onClick={(e) => this.cartToOrder(e)}>Valider et payer via Paypal</button>
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