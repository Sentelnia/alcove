import React from 'react';
// import { Link } from 'react-router-dom';
// import cartService from './cart-service';

class Cart extends React.Component {

  handleChange = (event, id) => {
    this.props.updateProductQuantity(id, event.target.value)
  }

  render() {
    console.log('props cart', this.props.cart)
    return (
      <>
        <h1>Panier</h1>
        <div className="cart-recap-container">
          <div className="cart-recap-total">
            <p>Total</p>
            <p>{//Somme de tous les éléments du panier
              this.props.cart
                .map(obj => obj.product.unitPrice * obj.quantity) // Retourne un tableau le montant total par produit [10, 20, 8.99]
                .reduce((a, b) => a + b, 0) // Retourne la somme totale
                .toFixed(2) // 2 décimales
            } €</p>
          </div>
          <div className="cart-recap-detail">
            <p>{//Somme de tous les éléments du panier
              this.props.cart
                .map(obj => obj.quantity) // Retourne un tableau le montant total par produit [10, 20, 8.99]
                .reduce((a, b) => a + b, 0) // Retourne la somme totale
            } Articles</p>
            <p>Hors frais de livraison</p>
          </div>
        </div>

        {////////// A maper sur le contenu du panier /////////
        }
        {this.props.cart.map(item => (
          <div className="cart-container" key={item.product._id}>
            <img src="https://via.placeholder.com/100x100" alt="product-pict" />
            <div className="cart-product">
              <h4>{item.product.name}</h4>
              <label>Quantity</label>
              <input type="text" name="quantity" value={item.quantity} onChange={e => this.handleChange(e, item.product._id)} />
              <p>{item.quantity * item.product.unitPrice}€</p>
            </div>
          </div>
        ))}
        {/////////// A maper sur le contenu du panier /////////
        }
        <h1>Livraison</h1>
        <div className="delivery-option">
          <label>
            <input type="radio" name="contact" value="shop" onChange={e => this.handleChange(e)} />
            Retrait en boutique
          </label>
          <label>
            <input type="radio" name="contact" value="home" checked onChange={e => this.handleChange(e)} />
            Livraison à domicile
          </label>
        </div>

        {// A afficher en fn du choix ci dessus
        }
        <h1>Adresse de livraison</h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>
              <em>Civilité</em>
              <input type="text" name="civility" value="" onChange={e => this.handleChange(e)} />
            </label>
          </p>

          <p>
            <label>
              <em>Prénom</em>
              <input type="text" name="firstName" value="" onChange={e => this.handleChange(e)} />
            </label>
          </p>

          <p>
            <label>
              <em>Nom de Famille</em>
              <input type="text" name="lastName" value="" onChange={e => this.handleChange(e)} />
            </label>
          </p>

          <p>
            <label>
              <em>Adresse</em>
              <input type="text" name="street" value="" onChange={e => this.handleChange(e)} />
            </label>
          </p>

          <p>
            <label>
              <em>Complément d'adresse</em>
              <input type="text" name="supp" value="" onChange={e => this.handleChange(e)} />
            </label>
          </p>

          <p>
            <label>
              <em>Code postal</em>
              <input type="text" name="zip" value="" onChange={e => this.handleChange(e)} />
            </label>
          </p>

          <p>
            <label>
              <em>Ville</em>
              <input type="text" name="city" value="" onChange={e => this.handleChange(e)} />
            </label>
          </p>

          <p>
            <label>
              <em>Email</em>
              <input type="email" name="email" value="" onChange={e => this.handleChange(e)} />
            </label>
          </p>

          <p>
            <label>
              <em>Téléphone</em>
              <input type="tel" name="telephone" value="" onChange={e => this.handleChange(e)} />
            </label>
          </p>

          <button className="btn" onClick={this.handleSubmit}>Enregistrer</button>
        </form>

        <h1>Ma commande</h1>

      </>
    )
  }
}

export default Cart;