const express = require('express');
const productsRoutes = express.Router();
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');
const Product = require('../models/Product.model')

const passport = require('passport');

//////////////////////////////// GET LISTING OF SERVICES ///////////////////////////////
productsRoutes.get('/services', (req, res, next) => {

  
});

//////////////////////////////// GET LISTING OF Product ///////////////////////////////
productsRoutes.get('/productlist', (req, res, next) => {
  Product.find()
    .then(allProductFromDB => {
      res.status(200).json({allProductFromDB})
    })
    .catch(err => {
      res.status(400).json({message:err})
    })
  
});


///////////////////////////////// CREATION PRODUCT ////////////////////////////////////////
productsRoutes.post('/products', checkRoles("ADMIN"), (req, res, next) => {
  if(!req.isAuthenticated()){
    res.status(401).json({message: 'Accès non authorisé'});
    return;
  }

  const {unitPrice, name, description, advice, ingredients, category} = req.body;
  Product.create({
    unitPrice,
    name,
    description,
    advice,
    ingredients,
    category
  })
  .then(newproduct => {
    res.status(201).json(newproduct);
  })
  .catch(err => {
    res.status(400).json({ message: "Une erreur lors de la création du produit s'est produite."});
  });
});

///////////////////////////////// GET PRODUCT DETAILS ////////////////////////////////////////
productsRoutes.get('/products/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findById(req.params.id)
  .then(product => {
    res.status(200).json(product);
  })
  .catch(error => {
    res.json(error)
  })
});

///////////////////////////////// UPDATE PRODUCT DETAILS ////////////////////////////////////////
productsRoutes.put('/products/:id', checkRoles("ADMIN"), (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() =>{
      res.json({ message: `le produit ${req.params.id} a bien été mis à jour.` })
    })
    .catch(error => {
      res.json(error)
    });

});

///////////////////////////////// DELETE PRODUCT  ////////////////////////////////////////
productsRoutes.delete('/products/:id', checkRoles("ADMIN"),  (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `le produit ${req.params.id} a ben été supprimé` });
    })
    .catch(error => {
      res.json(error);
    });
});

///////////////////////FONCTION POUR LES ROLES////////////////////

function checkRoles(role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === "ADMIN") {
      return next();
    } else {
      res.status(400).json({ message: "Seul l'administrateur peut acceder à ce contenu"});
    }
  };
}

module.exports = productsRoutes;