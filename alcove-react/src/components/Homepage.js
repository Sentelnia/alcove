import React from 'react';
// import { Link } from 'react-router-dom';
import Product from './products/Product';
import institut from '../images/institut.jpeg'
import './Homepage.css';

class Homepage extends React.Component {
  render() {
    console.log('props HP',this.props)
    return (
      <div className='homepage'>
        <h1>L'Alcôve</h1>
        <p>L’Alcôve est un espace dédié à la beauté de votre regard et de vos ongles, un véritable cocon où l'esthétique côtoie la sérénité. </p>
        <img className='imgIntro' src={institut} alt='institut'/>
        <div id='store'>
        <Product user={this.props.user} cart={this.props.cart} updateCart={this.props.updateCart}/>
        </div>
      </div>
    )
  }
}

export default Homepage;
