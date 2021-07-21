import React from 'react';
import { Link } from 'react-router-dom';
import productsService from './products-service';

class Product extends React.Component {
  state = {
    products: [],
    categories: [],
  }
  componentDidMount() {
    productsService.getProducts()
      .then((response) => {
        this.setState({
          products: response.allProductFromDB,
          categories: [...new Set(response.allProductFromDB.map(product => product.category))] // Récupère les catégories à partir des produits saisis en base puis supp les doublons
        });
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    return (
      <>
        <h1>Nos Produits</h1>
        {console.log("props user role:", this.props.user.role)}
        {
          //Affichage lien vers création produit seulement pour admin
          this.props.user.role === "ADMIN" && <Link to="/new-product">Ajouter un produit</Link>}

        {this.state.categories.map(category => (
          <div className="product-cateory" key={category}>
            <h2>{category}</h2>
            {this.state.products
              .filter(product => product.category === category)
              .map(product => (
                <>
                  <div className="product-card" key={product._id}>
                    <img src="https://via.placeholder.com/375x250" alt="product-pic" />
                    <h3>{product.name}</h3>
                    <p>{product.unitPrice} €</p>
                    {
                      //Affichage btn-container seulement pour admin
                      this.props.user.role === "ADMIN" && (
                        <div className="btn-container">
                          <Link to="/edit-product">Modifier un produit</Link>
                          <button>Supprimer</button>
                        </div>
                      )}
                  </div>
                </>
              ))
            }
          </div>
        ))
        }
      </>
    )
  }
}

export default Product;