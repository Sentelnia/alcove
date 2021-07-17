const express = require('express');

const ordersRoutes = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');

const passport = require('passport');

//////////////////////////////// GET LISTING OF ORDERS ///////////////////////////////
ordersRoutes.get('/orders', (req, res, next) => {

});

//////////////////////////////// GET DETAILS OF ORDERS ///////////////////////////////
ordersRoutes.get('/orders/:id', (req, res, next) => {

});

//////////////////////////////// UPDATE STATUS OF ORDERS ///////////////////////////////
ordersRoutes.put('/orders/:id', (req, res, next) => {

});