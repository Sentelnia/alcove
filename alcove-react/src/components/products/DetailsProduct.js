import React from 'react';
import { Link } from 'react-router-dom';
import productsService from './products-service';
import cartService from '../cart/cart-service';

class DetailsProduct extends React.Component {
  state = {
    name: "",
    unitPrice: "",
    category: "BASIC",
    advice: "",
    ingredients: "",
    description: "",
    imageUrl: "",
    quantity: 1
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleChangeProductQuantity = (event) => {
    let regEx = /^[0-9\b]+$/; //autorise chiffre de 0 à 9
    if (regEx.test(event.target.value) && Number(event.target.value) !== 0 && event.target.value.length < 3) {
      this.setState({ quantity: Number(event.target.value) });
    }
  }

  decreaseQty = (event) => {
    let qty = Number(this.state.quantity) - 1;
    this.setState({ quantity: qty });
  }

  increaseQty = (event) => {
    let qty = Number(this.state.quantity) + 1;
    this.setState({ quantity: qty });
  }

  addToCart = (event, id) => {
    event.preventDefault();

    if (this.isAlreadyInCart(id)) {
      console.log(id, ' déjà dans le panier')
      return;
    }

    cartService.addToCart(id, this.state.quantity)
      .then((response) => {
        this.props.updateCart(response)
        console.log('produit ajouté au panier')
        this.props.history.push('/')      // Redirection vers home
      })
      .catch(err => console.log('error delete product:', err))
  }

  componentDidMount() {
    productsService.getProduct(this.props.match.params.id)
      .then(response => this.setState(response))
      .catch(err => {
        console.log(err)
      });
  }

  handleFocus = (event) => {
    event.target.select();
  }

  // Fonctions utilitaires
  isAlreadyInCart(id) {
    return this.props.cart
      .map(item => item.product._id)        //Retourne un tableau d'id
      .filter(propsId => propsId === id)    //Retourne un tableau avec l'id passée en paramètre
      .length > 0 ? true : false;           //On n'ajoute rien dans le panier
  }

  render() {
    return (
      <>
        <Link to="/">Retour aux produits</Link>
        <img src={this.state.imageUrl || "https://via.placeholder.com/375x250"} alt="product_pict" />
        <h1>{this.state.name}</h1>
        {/* {Affichage quantité seulement pour USER si pas déja dans le panier} */}
        {this.props.user.role !== "ADMIN" && !this.isAlreadyInCart(this.props.match.params.id) && (
          <>
            <label>Quantity:</label>
            <button
              className="btn"
              disabled={(this.state.quantity === 1 || this.state.quantity === 0) && true}
              onClick={e => this.decreaseQty(e)}>-</button>
            <input
              type="text"
              name="quantity"
              value={this.state.quantity}
              onFocus={this.handleFocus}
              onChange={e => this.handleChangeProductQuantity(e)} />
            <button
              className="btn"
              disabled={this.state.quantity === 99 && true}
              onClick={e => this.increaseQty(e)}>+</button>
          </>
        )}
        <div>
          <span>{this.state.unitPrice * this.state.quantity} €</span>
          {/* {Affichage du btn en fn du role} */}
          {this.props.user.role === "USER" && !this.isAlreadyInCart(this.props.match.params.id) ?
            (<button
              className="btn"
              onClick={e => this.addToCart(e, this.props.match.params.id)}>Ajouter au panier</button>):
              (<p>Produit déjà dans le panier</p>)}

          {this.props.user.role === "ADMIN" &&
            (<>
              <Link to={`/edit-product/${this.props.match.params.id}`}>Modifier</Link>
              <button
                className="btn"
                onClick={(e) => this.deleteProductFromDB(e, this.props.match.params.id)}>Supprimer</button>
            </>)}
        </div>
        <div className="info-container">
          <h2>Description</h2>
          <p>{this.state.description}</p>
        </div>
        <div className="info-container">
          <h2>Conseil d'utilisation</h2>
          <p>{this.state.advice}</p>
        </div>
        <div className="info-container">
          <h2>Ingrédients</h2>
          <p>{this.state.ingredients}</p>
        </div>
      </>
    )
  }
}

export default DetailsProduct;