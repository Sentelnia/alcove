import React from "react";
import burger from "../images/menu_burger.png";
import icon from "../images/logo_alcove.svg";
import avatar from "../images/profil.png";
import cart from "../images/shopping-bag.svg";
// import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import { HashLink as Link } from "react-router-hash-link";
import "./Navbar.css";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <MediaQuery maxWidth={1224}>
          <img className="burger" src={burger} alt="burger" />
        </MediaQuery>

        <Link to="/">
          <img src={icon} className="icon" alt="alcoveIcon" />
        </Link>

        <ul className="navbar-container">
          <MediaQuery minWidth={1225}>
            <li>
              <Link
                to={{ pathname: "https://www.planity.com/" }}
                target="_blank"
              >
                <p>Prendre rendez-vous</p>
              </Link>
            </li>
            <li>
              <Link to="/services"><p>Nos tarifs</p></Link>
            </li>
            <li>
              <Link to="/#store"><p>La boutique</p></Link>
            </li>
          </MediaQuery>
          <li>
          {this.props.user ? (
            <Link to="/profile">
              <img className="avatar" src={avatar} alt="avatar" />
            </Link>
          ) : (
            <Link to="/signup">
              <img className="avatar" src={avatar} alt="avatar" />
            </Link>
          )}
          </li>
          <li>
          <Link to="/cart">
            <img className="cart" src={cart} alt="cart" />
          </Link>
          </li>
          
          {/* {this.props.user ? <Link to="/cart"><img src={cart} alt="cart" /></Link> : <Link to="/signup"><img src={cart} alt="cart" /></Link>} */}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
