import React from 'react';
import burger from '../images/menu_burger_icon.svg'
import icon from '../images/Alcove_ss_blanc.png'
import avatar from '../images/avatar.svg'
import cart from '../images/shopping-cart.svg'

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <img src={burger} alt="burger" />
        <img src={icon} alt="alcoveIcon" />
        <div className="navbar-container">
          <img src={avatar} alt="avatar" />
          <img src={cart} alt="cart" />
        </div>
      </nav>
    )
  }
}

export default Navbar;