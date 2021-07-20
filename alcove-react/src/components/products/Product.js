import React from 'react';
import { Link } from 'react-router-dom';

class Product extends React.Component {
  render() {
    return (
      <>
        <Link to="/">Ajouter un produit</Link>
        <div className="product-card">
          <img src="https://via.placeholder.com/400x250" alt="product-pic" />
          <h2>Nom du produit</h2>
          <p>20,00 €</p>
          <div className="btn-container">
            <button>Modifier</button>
            <button>Supprimer</button>
          </div>
        </div>
      </>
    )
  }
}

export default Product;