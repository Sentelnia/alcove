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
import Product from './components/products/Product';

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
        console.log('response de get Cart',response.cart)
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
    this.setState({ user: data });
  };

  updateCart = (data) => {
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
            <Homepage user={this.state.user} updateCart={this.updateCart}/>
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

          {/////////////////////* PRODUCTS *////////////////////////
          }
          <Route exact path="/new-product" render={(props) => (
            <CreateProduct user={this.state.user} />
          )} />

          <Route exact path="/edit-product/:id" render={(props) => (
            <EditProduct {...props} user={this.state.user} />
          )} />

          <Route exact path="/details-product/:id" render={(props) => (
            <DetailsProduct {...props} user={this.state.user} />
          )} />

          {/////////////////////* CART *////////////////////////
          }
          <Route exact path="/cart" render={(props) => (
            <Cart user={this.state.user} cart={this.state.cart} updateProductQuantity={this.updateProductQuantity}/>
          )} />

        </Switch>
        <Footer />
      </div>
    )
  }


}

export default App;

