const express = require('express');
const productsRoutes = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');

const passport = require('passport');

//////////////////////////////// GET LISTING OF SERVICES ///////////////////////////////
productsRoutes.get('/services', (req, res, next) => {

});

///////////////////////////////// CREATION PRODUCT ////////////////////////////////////////
productsRoutes.post('/products', (req, res, next) => {

});

///////////////////////////////// GET PRODUCT DETAILS ////////////////////////////////////////
productsRoutes.get('/products/:id', (req, res, next) => {

});

///////////////////////////////// UPDATE PRODUCT DETAILS ////////////////////////////////////////
productsRoutes.put('/products/:id', (req, res, next) => {

});

///////////////////////////////// DELETE PRODUCT  ////////////////////////////////////////
productsRoutes.delete('/products/:id', (req, res, next) => {

});

module.exports = productsRoutes;