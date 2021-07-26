const express = require('express');
const cartsRoutes = express.Router();

const bcrypt = require('bcryptjs');

const Product = require('../models/Product.model')
const Order = require('../models/Order.model')

const passport = require('passport');


//////////////////////////////// EDIT THE CART ///////////////////////////////
cartsRoutes.put('/cart/add', (req, res, next) => {  
  const {productId, quantity} = req.body
  if(!productId || Number(quantity) === 0){
    res.status(400).json({message:'please provide product id and quantity to add to the cart'})
    return;
  }

  Product.findById(productId)
  .then(productFromDB => {
        const item = {
          product : productFromDB,
          quantity: quantity
        }
        req.session.cart.push(item)
        res.status(200).json({cart: req.session.cart})
  })
  .catch(err => next(err))
})


//////////////////////////////// GET LISTING OF ITEM IN THE CART ///////////////////////////////
cartsRoutes.get('/cart', (req, res, next) => {
  res.status(200).json({cart: req.session.cart})
});

//////////////////////////////// REMOVE ITEM FROM THE CART ///////////////////////////////
cartsRoutes.put('/cart/remove', (req, res, next) => {
  const {productId} = req.body;
  req.session.cart = req.session.cart.filter(obj => obj.product._id !== productId)
  res.status(200).json({cart: req.session.cart })
});

//////////////////////////////// CREATION OF AN ORDER ///////////////////////////////
cartsRoutes.post('/cart/checkout', (req, res, next) => {
  if(!req.isAuthenticated()){
    res.status(401).json({message: 'Veuillez vous connecter pour valider la commande'});
    return;
  }

 

  const {addBilling, addDelivery} = req.body
  const userId = req.user.id
  const items = req.session.cart;
 

 
  Order.create({
    userId,
    items,
    addDelivery,
    addBilling, 
    
  })
  .then(newOrder => {    
    req.session.cart=[];      //On vide le panier suite à la passation de la commande
    res.status(200).json(newOrder)
  })
  .catch(err => res.status(400).json({message:err.message}))
});

module.exports = cartsRoutes;