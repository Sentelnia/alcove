const express = require('express');
const cartsRoutes = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');
const Product = require('../models/Product.model')
const Order = require('../models/Order.model')

const passport = require('passport');


//////////////////////////////// EDIT THE CART ///////////////////////////////
cartsRoutes.put('/cart/add', (req, res, next) => {  
  const {productId} = req.body
  if(!productId){
    res.status(400).json({message:'please provide product id to add to the cart'})
    return;
  }

  Product.findById(productId)
  .then(product => {
        req.session.cart.push(product)
        res.status(200).json({cart: req.session.cart})
  })
  .catch(err => next(err))
})


//////////////////////////////// GET LISTING OF ITEM IN THE CART ///////////////////////////////
cartsRoutes.get('/cart', (req, res, next) => {
  res.status(200).json({cart: req.session.cart})
});

//////////////////////////////// CREATION OF AN ORDER ///////////////////////////////
cartsRoutes.post('/cart/checkout', (req, res, next) => {
  if(!req.isAuthenticated()){
    res.status(401).json({message: 'Veuillez vous connecter pour valider la commande'});
    return;
  }

  

  const {addBilling, addDelivery} = req.body

  
  const userId = req.user.id
  const items = []
  const orderDate = Date()

  Order.create({
    userId,
    items,
    orderDate,
    addDelivery,
    addBilling
  })
  .then(newOrder => {
    newOrder.items= req.session.cart
    req.session.cart=[]
    res.status(200).json(newOrder)
  })
  .catch(err => res.status(400).json({message:err.message}))

});

module.exports = cartsRoutes;