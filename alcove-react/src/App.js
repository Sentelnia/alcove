import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import Signup from './components/auth/Signup';
import authService from './components/auth/auth-service.js';
import cartService from './components/cart/cart-service';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import CreateProduct from './components/products/CreateProduct';
import EditProduct from './components/products/EditProduct';
import DetailsProduct from './components/products/DetailsProduct';
import Cart from './components/cart/Cart';
import Footer from './components/Footer';
import Services from './components/Services';


class App extends Component {

  state = {
    user: {},
    cart: []
  }


  ///////////////LOGGEDIN/////////////////////////////
  fetchUser() {
    if (!this.state.user._id) {
      authService.loggedin()
        .then(response => {
          this.setState({ user: response })
        })
        .catch(err => {
          this.setState({ user: false })
        })
    }
  }

  ///////////////GET CART/////////////////////////////
  fetchCart() {
    cartService.getCart()
      .then(response => {
        this.setState({cart:response.cart})
      })
      .catch(err => {
        console.log(err)
        // next(err) // Demander ce que ça fait...
      })
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchCart();
  }

  updateUser = (data) => {
    console.log('data user:',data)
    this.setState({ user: data });
  };

  updateCart = (data) => {
    console.log('data:',data)
    this.setState({ cart: data.cart });
  };

  updateProductQuantity = (id, quantity) => {

    let stateCartCopy = [...this.state.cart]; //copy

    const updatedCart = stateCartCopy.map(obj => {
      if (obj.product._id === id){
        obj.quantity = Number(quantity)
      }
      return obj;
    })
  
    this.setState({cart:updatedCart})
  };

  render() {
    return (
      <div className='App'>
        <Navbar user={this.state.user} />
        <Switch>
          {/////////////////////* HOMEPAGE *////////////////////////
          }
          <Route exact path="/" render={() => (
            <Homepage user={this.state.user} cart={this.state.cart} updateCart={this.updateCart}/>
          )} />

          {/////////////////////* SIGNUP *////////////////////////
          }
          <Route exact path="/signup" render={() => (
            <Signup updateUser={this.updateUser} />
          )} />


          {/////////////////////* LOGIN *////////////////////////
          }
          <Route exact path="/login" render={(props) => (
            <Login updateUser={this.updateUser} />
          )} />

          {/////////////////////*PROFIL *////////////////////////
          }
          <Route exact path="/profile" render={(props) => (
            <Profile user={this.state.user} updateUser={this.updateUser} history={props.history} />
          )} />

          {/////////////////////*SERVICES *////////////////////////
          }
          <Route exact path="/services" render={(props) => (
            <Services />
          )} />

          {/////////////////////* PRODUCTS *////////////////////////
          }
          <Route exact path="/new-product" render={(props) => (
            <CreateProduct user={this.state.user} />
          )} />

          <Route exact path="/edit-product/:id" render={(props) => (
            <EditProduct {...props} user={this.state.user} />
          )} />

          <Route exact path="/details-product/:id" render={(props) => (
            <DetailsProduct {...props} user={this.state.user} cart={this.state.cart} updateProductQuantity={this.updateProductQuantity} updateCart={this.updateCart}/>
          )} />

          {/////////////////////* CART *////////////////////////
          }
          <Route exact path="/cart" render={(props) => (
            <Cart user={this.state.user} cart={this.state.cart} updateProductQuantity={this.updateProductQuantity} updateCart={this.updateCart}/>
          )} />

        </Switch>
        <Footer />
      </div>
    )
  }


}

export default App;

