import React from 'react';
import { Link } from 'react-router-dom';
import productsService from './products-service';

class Product extends React.Component {
  state = {
    products: [],
    categories: [],
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('props',this.props)
    //NOT WORKING YET
    // productsService.deleteProduct()
    //   .then(() => console.log('produit supprimé'))
    //   .catch(err => console.log('error delete product:', err))
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
                    <img src={product.imageUrl || "https://via.placeholder.com/375x250"} alt="product-pic" />
                    <h3>{product.name}</h3>
                    <p>{product.unitPrice} €</p>
                    <div className="btn-container">
                      <Link to={`/details-product/${product._id}`}>Détails</Link>
                      {
                        //Affichage edit et delete seulement pour admin
                        this.props.user.role === "ADMIN" && (
                          <>
                            <Link to={`/edit-product/${product._id}`}>Modifier</Link>
                            <button className="btn" onClick={this.handleSubmit}>Supprimer</button>
                          </>
                        )}
                    </div>
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