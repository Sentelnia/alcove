import React from 'react';
import { Link } from 'react-router-dom';
import productsService from './products-service';
import cartService from '../cart/cart-service';

class Product extends React.Component {
  state = {
    products: [],
    categories: [],
  }

  deleteProductFromDB = (event, id) => {
    event.preventDefault();

    productsService.deleteProduct(id)
      .then(() => {
        this.componentDidMount();
      })
      .catch(err => console.log('error delete product:', err))
  }

  addToCart = (event, id) => {
    event.preventDefault();

    if (this.isAlreadyInCart(id)) {
      console.log(id, ' déjà dans le panier')
      return;                             
    }

    cartService.addToCart(id,1) // Qty de 1 par défaut depuis le component Product
      .then((response) => {
        this.props.updateCart(response)
      })
      .catch(err => console.log('error delete product:', err))
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
  // Fonctions utilitaires
  isAlreadyInCart(id){
    return this.props.cart
      .map(item => item.product._id)        //Retourne un tableau d'id
      .filter(propsId => propsId === id)    //Retourne un tableau avec l'id passée en paramètre
      .length > 0 ? true : false;           //On n'ajoute rien dans le panier
  }

  render() {
    console.log('props product:', this.props)
    return (
      <>
        <h2>Nos Produits</h2>
        {/* {Affichage lien vers création produit seulement pour admin} */}
        {this.props.user.role === "ADMIN" && <Link to="/new-product">Ajouter un produit</Link>}
        {/* {Affichage des catégories} */}
        {this.state.categories.map(category => (
          <div className="product-cateory" key={category}>
            <h2>{category}</h2>
            {/* {Affichage des produits de chaque catégorie} */}
            {this.state.products
              .filter(product => product.category === category)
              .map(product => (
                <div className="product-card" key={product._id}>
                  <img src={product.imageUrl || "https://via.placeholder.com/320x250"} alt="product-pic" />
                  <h3>{product.name}</h3>
                  <p>{product.unitPrice} €</p>
                  <div className="btn-container">
                    <Link to={`/details-product/${product._id}`}>Détails</Link>
                    {/* {Affichage edit et delete seulement pour admin} */}
                    {this.props.user.role === "ADMIN" ? (
                      <>
                        <Link to={`/edit-product/${product._id}`}>Modifier</Link>
                        <button className="btn" onClick={(e) => this.deleteProductFromDB(e, product._id)}>Supprimer</button>
                      </>
                    ) : (
                      <>
                        {/* {Masquer btn ajouter au panier si déjà dans le panier} */}
                        {this.isAlreadyInCart(product._id) ? 
                        <p>Produit déjà dans le panier</p> : 
                        <button className="btn" onClick={(e) => this.addToCart(e, product._id)}>Ajouter au panier</button>}
                      </>)}
                  </div>
                </div>
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