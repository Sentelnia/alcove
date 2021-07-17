const express = require('express');

const ordersRoutes = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');
const Order = require('../models/Order.model');

const passport = require('passport');

//////////////////////////////// GET LISTING OF ORDERS ///////////////////////////////
ordersRoutes.get('/orders', (req, res, next) => {
  if (!req.isAuthenticated()){
    res.status(401).json({message: 'Accès non authorisé'});
    return;
  }
  else if (req.user.role === "ADMIN") {
    Order.find()
    .then(ordersFromDB => {
      res.status(201).json(ordersFromDB);
    })      
    .catch(err => {
      res.status(400).json({ message: "Une erreur lors de la création du produit s'est produite."});
    })
  } else if(req.user.role === "USER"){
    Order.find({user_id:req.user._id.toString()})
    .then(ordersFromDB => {
      res.status(201).json(ordersFromDB);
    })      
    .catch(err => {
      res.status(400).json({ message: "Une erreur lors de la création du produit s'est produite."});
    })
  }
});

//////////////////////////////// GET DETAILS OF ORDERS ///////////////////////////////
ordersRoutes.get('/orders/:id', (req, res, next) => {

});

//////////////////////////////// UPDATE STATUS OF ORDERS ///////////////////////////////
ordersRoutes.put('/orders/:id', (req, res, next) => {

});

module.exports = ordersRoutes;