import React from 'react';
import { Link } from 'react-router-dom';
import Product from './products/Product';

class Homepage extends React.Component {
  render() {
    return (
      <>
        <Link to="/signup">Créer un compte</Link>
        <Link to="/profile">Profile</Link>
        <h1>L'Alcôve</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra id turpis ac rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus</p>
        <img src="https://via.placeholder.com/375x250" alt="home-pic" />   
        <Product />
      </>
    )
  }
}

export default Homepage;
