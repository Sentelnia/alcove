const express = require('express');
const ordersRoutes = express.Router();
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');
const Order = require('../models/Order.model');

const passport = require('passport');

//////////////////////////////// GET LISTING OF ORDERS ///////////////////////////////
ordersRoutes.get('/orders', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: 'Accès non authorisé' });
    return;
  }
  else if (req.user.role === "ADMIN") {
    Order.find()
      .then(ordersFromDB => {
        res.status(201).json(ordersFromDB);
      })
      .catch(err => {
        res.status(400).json({ message: "Une erreur lors de la création du produit s'est produite." });
      })
  } else if (req.user.role === "USER") {
    Order.find({ user_id: req.user._id.toString() })
      .then(ordersFromDB => {
        res.status(201).json(ordersFromDB);
      })
      .catch(err => {
        res.status(400).json({ message: "Une erreur lors de la création du produit s'est produite." });
      })
  }
});

//////////////////////////////// GET DETAILS OF ORDERS ///////////////////////////////
ordersRoutes.get('/orders/:id', (req, res, next) => {

  if (!req.isAuthenticated()) {
    res.status(401).json({ message: 'Accès non authorisé' });
    return;
  } else {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    if (req.user.role === "ADMIN") {
      Order.findById(req.params.id)
      .then(order => {
        res.status(200).json(order);
      })
      .catch(error => {
        res.json(error)
      })
    } else if (req.user.role === "USER") {
      Order.find({_id:req.params.id.toString(),user_id:req.user._id.toString()})
      .then(order => {
        res.status(200).json(order);
      })
      .catch(err => {
        res.status(400).json({ message: err.message});
      })
    }
  } 
});

//////////////////////////////// UPDATE STATUS OF ORDERS ///////////////////////////////
ordersRoutes.put('/orders/:id', (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "ADMIN") {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    Order.findById(req.params.id)
      .then(order => {

        order.addDelivery.street = req.body.addDelivery.street;
        order.addDelivery.zip = req.body.addDelivery.zip;
        order.addDelivery.city = req.body.addDelivery.city;
        order.addBilling.street = req.body.addBilling.street;
        order.addBilling.zip = req.body.addBilling.zip;
        order.addBilling.city = req.body.addBilling.city;
        order.status = req.body.status;

        order.save()
          .then(()=> {
            res.status(200).json(order);
          })
          .catch(err => {
            res.status(400).json({ message: err.message });
          });        
      })
      .catch(err => {
        res.status(400).json({ message: err.message});
      })
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = ordersRoutes;