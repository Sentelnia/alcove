import React from 'react';
// import { Link } from 'react-router-dom';
import Product from './products/Product';
import './Homepage.css';

class Homepage extends React.Component {
  render() {
    console.log('props HP',this.props)
    return (
      <>
        <h1>L'Alcôve</h1>
        <p>Lorem ipsum dolor sit amet,
        consectetur adipiscing 
        elit. Curabitur viverra 
        id turpis ac rutrum.
         Interdum et malesuada fames
         ac ante ipsum primis 
         in faucibus</p>
        
        <div id='store'>
        <Product user={this.props.user} cart={this.props.cart} updateCart={this.props.updateCart}/>
        </div>
      </>
    )
  }
}

export default Homepage;
