import React from 'react';
import burger from '../images/menu_burger.png'
import icon from '../images/logo_alcove.svg'
import avatar from '../images/profil.png'
import cart from '../images/shopping-bag.svg'
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive'
import './Navbar.css';

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
        <div className="navbar-container">
          {this.props.user ? 
            <Link to="/profile">
              <img className="avatar" src={avatar} alt="avatar" />
            </Link> : 
            <Link to="/signup">
              <img className="avatar" src={avatar} alt="avatar" />
            </Link>}
          <Link to="/cart">
            <img className="cart" src={cart} alt="cart" />
          </Link>
          {/* {this.props.user ? <Link to="/cart"><img src={cart} alt="cart" /></Link> : <Link to="/signup"><img src={cart} alt="cart" /></Link>} */}
        </div>
      </nav>
    )
  }
}

export default Navbar;