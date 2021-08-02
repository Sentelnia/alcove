import React from "react";
import { Link } from "react-router-dom";
import productsService from "./products-service";
import cartService from "../cart/cart-service";
import "./Products.css";



class Product extends React.Component {
  state = {
    products: [],
    categories: [],
  };

  deleteProductFromDB = (event, id) => {
    event.preventDefault();

    productsService
      .deleteProduct(id)
      .then(() => {
        this.componentDidMount();
      })
      .catch((err) => console.log("error delete product:", err));
  };

  addToCart = (event, id) => {
    event.preventDefault();

    if (this.isAlreadyInCart(id)) {
      console.log(id, " déjà dans le panier");
      return;
    }

    cartService
      .addToCart(id, 1) // Qty de 1 par défaut depuis le component Product
      .then((response) => {
        this.props.updateCart(response);
      })
      .catch((err) => console.log("error delete product:", err));
  };

  componentDidMount() {
    productsService
      .getProducts()
      .then((response) => {
        this.setState({
          products: response.allProductFromDB,
          categories: [
            ...new Set(
              response.allProductFromDB.map((product) => product.category)
            ),
          ], // Récupère les catégories à partir des produits saisis en base puis supp les doublons
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Fonctions utilitaires
  isAlreadyInCart(id) {
    return this.props.cart
      .map((item) => item.product._id) //Retourne un tableau d'id
      .filter((propsId) => propsId === id).length > 0 //Retourne un tableau avec l'id passée en paramètre
      ? true
      : false; //On n'ajoute rien dans le panier
  }

  render() {
    console.log("props product:", this.props);
    
    return (
      <div className='productStore'>
        <h2>NOS PRODUITS</h2>
        {/* {Affichage lien vers création produit seulement pour admin} */}
        {this.props.user.role === "ADMIN" && (
          <Link to="/new-product">Ajouter un produit</Link>
        )}
        {/* {Affichage des catégories} */}
        {this.state.categories.map((category) => (
          <div className="product-category" key={category}>
            {category === "CARTE" && <h2>NOS CARTES CADEAUX</h2>}
            {category === "LASH" && <h2>NOS SOINS DES CILS</h2>}
            {category === "NAIL" && <h2>NOS SOINS DES ONGLES</h2>}
            {category === "BASIC" && <h2>NOS BASIQUES</h2>}

            <ul className="carousel-items">
          
            {/* {Affichage des produits de chaque catégorie} */}
            {this.state.products
              .filter((product) => product.category === category)
              .map((product) => (
                
                <li className="product-card" key={product._id}>
                  
                    <img
                      src={
                        product.imageUrl ||
                        "https://via.placeholder.com/320x250"
                      }
                      alt="product-pic"
                    />
                    {/*Les cartes cadeaux*/}
                    {product.category === "CARTE" ? (
                      <p>Offrez un moment de détente </p>
                    ) : (
                      <>
                        <h3>{product.name}</h3>
                        <p>{product.unitPrice} €</p>
                      </>
                    )}
                    <div className="btn-container">
                      <Link to={`/details-product/${product._id}`}>
                        Détails
                      </Link>
                      {/* {Affichage edit et delete seulement pour admin} */}
                      {this.props.user.role === "ADMIN" ? (
                        <>
                          <Link to={`/edit-product/${product._id}`}>
                            Modifier
                          </Link>
                          <button
                            className="btn"
                            onClick={(e) =>
                              this.deleteProductFromDB(e, product._id)
                            }
                          >
                            Supprimer
                          </button>
                        </>
                      ) : (
                        <>
                          {/* {Masquer btn ajouter au panier si déjà dans le panier} */}
                          {this.isAlreadyInCart(product._id) ? (
                            <p>Produit déjà dans le panier</p>
                          ) : (
                            <button
                              className="btn"
                              onClick={(e) => this.addToCart(e, product._id)}
                            >
                              Ajouter au panier
                            </button>
                          )}
                        </>
                      )}
                  
                    </div>
                  
                  
                </li>
                
              ))}
            
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default Product;
