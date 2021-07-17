const express = require('express');
const cartsRoutes = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');


const passport = require('passport');


//////////////////////////////// EDIT THE CART ///////////////////////////////
cartsRoutes.put('/cart/add', (req, res, next) => {  
  const {productId} = req.body
  if(!productId){
    res.status(400).json({message:'please provide product id to add to the cart'})
    return;
  }
  req.session.cart.push(productId)
  res.status(200).json({cart: req.session.cart})
})


//////////////////////////////// GET LISTING OF ITEM IN THE CART ///////////////////////////////
cartsRoutes.get('/cart', (req, res, next) => {

});

//////////////////////////////// CREATION OF AN ORDER ///////////////////////////////
cartsRoutes.put('/cart/checkout', (req, res, next) => {

});

module.exports = cartsRoutes;