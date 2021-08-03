import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import Signup from './components/auth/Signup';
import authService from './components/auth/auth-service.js';
import cartService from './components/cart/cart-service';
import Login from './components/auth/Login';
import ResetPassword from './components/auth/ResetPassword';
import Profile from './components/auth/Profile';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import CreateProduct from './components/products/CreateProduct';
import EditProduct from './components/products/EditProduct';
import DetailsProduct from './components/products/DetailsProduct';
import Cart from './components/cart/Cart';
import DetailsOrder from './components/orders/DetailsOrder';
import ConfirmedOrder from './components/orders/ConfirmedOrder';
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
        this.setState({ cart: response.cart })
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
    // console.log('data user:', data)
    this.setState({ user: data });
  };

  updateCart = (data) => {
    console.log('data:', data)
    this.setState({ cart: data.cart });
  };  

  render() {
    // console.log('API URL',process.env.REACT_APP_APIURL)
    return (
      <div className='App'>
        <Navbar user={this.state.user} />
        <Switch>
          {/////////////////////* HOMEPAGE *////////////////////////
          }
          <Route exact path="/" render={() => (
            <Homepage user={this.state.user} cart={this.state.cart} updateCart={this.updateCart} />
          )} />

          {/////////////////////* SIGNUP *////////////////////////
          }
          <Route exact path="/signup" render={(props) => (
            <Signup {...props} user={this.state.user} updateUser={this.updateUser} />
          )} />

          {/////////////////////* LOGIN *////////////////////////
          }
          <Route exact path="/login" render={(props) => (
            <Login {...props} user={this.state.user} updateUser={this.updateUser} />
          )} />

          {/////////////////////*PROFIL *////////////////////////
          }
          <Route exact path="/profile" render={(props) => (
            <Profile user={this.state.user} updateUser={this.updateUser} />
          )} />

          {/////////////////////*RESET PASSWORD *////////////////////////
          }
          <Route exact path="/reset-password" render={(props) => (
            <ResetPassword user={this.state.user} updateUser={this.updateUser} />
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
            <DetailsProduct {...props} user={this.state.user} cart={this.state.cart} updateCart={this.updateCart} />
          )} />

          {/////////////////////* CART *////////////////////////
          }
          <Route exact path="/cart" render={(props) => (
            <Cart {...props} user={this.state.user} cart={this.state.cart} updateCart={this.updateCart} />
          )} />
          {/////////////////////* ORDER *////////////////////////
          }
          <Route exact path="/details-order/:id" render={(props) => (
            <DetailsOrder {...props} user={this.state.user} />
          )} />
          <Route exact path="/confirmation-order" render={(props) => (
            <ConfirmedOrder {...props} user={this.state.user} />
          )} />

        </Switch>
        <Footer />
      </div>
    )
  }


}

export default App;

