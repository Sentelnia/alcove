const express = require('express');
const ordersRoutes = express.Router();

const bcrypt = require('bcryptjs');

const Order = require('../models/Order.model');

const passport = require('passport');
const transporter = require('../mailer')

//////////////////////////////// GET LISTING OF ORDERS ///////////////////////////////
ordersRoutes.get('/orders', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: 'Accès non authorisé' });
    return;
  }
  
  let cond;
  
  if (req.user.role === "ADMIN") {
    cond = {}
  } else {
    cond = { userId: req.user._id.toString() }
  }
  console.log('condition user:',cond)
  Order.find(cond)
  .then(ordersFromDB => {
    console.log('orderst touvées en base:',ordersFromDB)
    res.status(201).json(ordersFromDB);
  })
  .catch(err => {
    res.status(400).json({ message: "Une erreur lors de la création du produit s'est produite." });
  })
});

//////////////////////////////// GET DETAILS OF ORDERS ///////////////////////////////
ordersRoutes.get('/orders/:id', (req, res, next) => {
  
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: 'Accès non authorisé' });
    return;
  }
  
  let cond;
  
  if (req.user.role === "ADMIN") {
    cond = {_id: req.params.id.toString()}
  } else {
    cond = {_id: req.params.id.toString(), userId: req.user._id.toString() }
  }
  
  Order.find(cond)
  .then(order => {
    res.status(200).json(order[0]);
  })
  .catch(err => {
    res.status(400).json({ message: err.message });
  })
});

//////////////////////////////// UPDATE STATUS OF ORDERS ///////////////////////////////
ordersRoutes.put('/orders/:id', (req, res, next) => {
  if (!req.isAuthenticated() || !req.user.role === "ADMIN") {
    res.status(401).json({ message: 'Unauthorized' });
  }
  
  Order.findById(req.params.id)
  .then(order => {
    order.status = req.body.status;
    
    order.save()
    .then(() => {
      res.status(200).json(order);
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
  })
  .catch(err => {
    res.status(400).json({ message: err.message });
  })
});

//////////////////////////////// SEND E-MAIL CONFIRMATION ///////////////////////////////
ordersRoutes.post('/email-confirmation', (req, res, next) => {

  let { emailSender, emailReceiver, subject, content } = req.body;

  transporter.sendMail({
    from: emailSender, // sender address
    to: emailReceiver, // list of receivers
    subject: subject, // Subject line
    text: content
  })
  .then(() => res.status(200).json({ message: 'E-mail de confirmation envoyé' }))
  .catch(err => next(err))  
});

module.exports = ordersRoutes;