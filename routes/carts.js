const express = require('express');
const cartsRoutes = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');

const passport = require('passport');

//////////////////////////////// GET LISTING OF ITEM IN THE PANIER ///////////////////////////////
cartsRoutes.get('/cart', (req, res, next) => {

});

//////////////////////////////// CREATION OF AN ORDER ///////////////////////////////
cartsRoutes.put('/cart/checkout', (req, res, next) => {

});