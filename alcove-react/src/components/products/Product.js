import React from 'react';
import { Link } from 'react-router-dom';

class Product extends React.Component {
  render() {
    return (
      <>
        <h1>Nos Produits</h1>
        <Link to="/new-product">Ajouter un produit</Link>
        {/* 
        //1. Requête à DB pour obtenir tous les produits
        //2. Remplir dynamiquement info des produits
        //3. Gérer l'affichage en fonction du rôle de l'utilisateur
        */}
        <div className="product-card">
          <img src="https://via.placeholder.com/375x250" alt="product-pic" />
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