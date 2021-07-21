import React from 'react';
import burger from '../images/menu_burger_icon.svg'
import icon from '../images/Alcove_ss_blanc.png'
import avatar from '../images/avatar.svg'
import cart from '../images/shopping-cart.svg'
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <img src={burger} alt="burger" />
        <Link to="/"><img src={icon} alt="alcoveIcon" /></Link>
        <div className="navbar-container">
          <Link to="/signup"><img src={avatar} alt="avatar" /></Link>
          <img src={cart} alt="cart" />
        </div>
      </nav>
    )
  }
}

export default Navbar;