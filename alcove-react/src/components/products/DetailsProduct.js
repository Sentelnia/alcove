import React from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import productsService from './products-service';

class DetailsProduct extends React.Component {
  state = {
    name: "",
    unitPrice: "",
    category: "BASIC",
    advice: "",
    ingredients: "",
    description: "",
    imageUrl: "",
    quantity: 0
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Gérer l'ajout au panier
  }

  componentDidMount() {
    productsService.getProduct(this.props.match.params.id)
      .then(response => this.setState(response))
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    return (
      <>
        <Link to="/">Retour aux produits</Link>
        <img src={this.state.imageUrl || "https://via.placeholder.com/375x250"} alt="product_pict" />
        <h1>{this.state.name}</h1>
        <label>Quantity:</label>
        <input type="number" min="0" name="quantity" value={this.state.quantity} onChange={e => this.handleChange(e)} />
        <div>
          <span>{this.state.unitPrice} €</span>
          <button>Ajouter au panier</button>
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