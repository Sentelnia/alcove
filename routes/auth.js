const express = require('express');
const authRoutes = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');

///////////////////////////////////////////////////// CREATION USER ACCOUNT //////////////////////////////////////////////////

authRoutes.post('/users', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // 1. Check username and password are not empty
  if (!email || !password) {
    res.status(400).json({ message: 'Merci de saisir une adresse E-mail et un mot de passe' });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (!regex.test(password)) {
    res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 charactères, un chiffre et une minuscule et une majuscule' });
    return;
  }

  User.findOne({ email })
    .then(foundUser => {
      if (foundUser) {
        res.status(400).json({ message: 'Cette adresse E-mail est déjà utilisée' });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
        email: email,
        password: hashPass
      });

      aNewUser.save()
        .then(() => {
          // Persist our new user into session
          // req.session.currentUser = aNewUser

          res.status(201).json(aNewUser);
        })
        .catch(err => {
          res.status(400).json({ message: "Une erreur lors de la création du compte s'est produite."});
        });
    })
    .catch(err => {
      res.status(500).json({ message: "Adresse E-mail non reconnue."});
    });
})

/********************************* CREATION USER ACCOUNT *********************************/

module.exports = authRoutes;