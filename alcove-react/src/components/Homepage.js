import React from "react";
// import { Link } from 'react-router-dom';
import Product from "./products/Product";
import institut from "../images/institut.jpeg";
import { HashLink as Link } from "react-router-hash-link";
import "./Homepage.css";

class Homepage extends React.Component {
  render() {
    console.log("props HP", this.props);
    return (
      <div className="homepage">
        <h1>L'Alcôve</h1>
        <p>
          L’Alcôve est un espace dédié à la beauté de votre regard et de vos
          ongles, un véritable cocon où l'esthétique côtoie la sérénité.{" "}
        </p>
        <img className="imgIntro" src={institut} alt="institut" />
        <div id="store">
          <Product
            user={this.props.user}
            cart={this.props.cart}
            updateCart={this.props.updateCart}
          />
        </div>
        <div className="servicesShort">
          <h2>NOS PRESTATIONS</h2>
          <div className="servicesLash">
            <h3>BEAUTÉ DES CILS</h3>
            <div className="articleBox">
              <article>
                <p>Pose d'extension de cils Volume Russe</p>
                <span>200 €</span>
              </article>
              <article>
                <p>Rehaussement de cils</p>
                <span>70 €</span>
              </article>
            </div>
            <Link to="/services/#servicesLash">Plus de prestations</Link>
          </div>
          <hr className="servicesHr" />
          <div className="servicesNail">
            <h3>BEAUTÉ DES ONGLES</h3>
            <div className="articleBox">
              <article>
                <p>Rallongement au gel, méthode Chablons</p>
                <span>60 €</span>
              </article>
              <article>
                <p>Pose de vernis semi-permanent</p>
                <span>40 €</span>
              </article>
            </div>
            <Link to="/services/#servicesNail">Plus de prestations</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
