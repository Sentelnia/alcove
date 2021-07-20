const express = require('express');
const authRoutes = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');

const passport = require('passport');

///////////////////////////////////////////////////// CREATION USER ACCOUNT //////////////////////////////////////////////////

authRoutes.post('/users', (req, res, next) => {
  
  const {email, password} = req.body;

  // 1. Check username and password are not empty
  if (!email || !password) {
    res.status(400).json({ message: 'Merci de saisir une adresse E-mail et un mot de passe' });
    return;
  }

  const regexEmail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;

  if (!regexEmail.test(email)) {
    res.status(403).json({ message: "L'adresse E-mail saisie n'est pas valide" });
    return;
  }

  const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (!regexPassword.test(password)) {
    res.status(403).json({ message: 'Le mot de passe doit contenir au moins 6 charactères, un chiffre et une minuscule et une majuscule' });
    return;
  }

  User.findOne({ email })
    .then(foundUser => {
      if (foundUser) {
        res.status(409).json({ message: 'Cette adresse E-mail est déjà utilisée' });
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
          req.session.currentUser = aNewUser

          res.status(201).json(aNewUser);
        })
        .catch(err => {
          res.status(400).json({ message: "Une erreur lors de la création du compte s'est produite." });
        });
    })
    .catch(err => {
      res.status(500).json({ message: "Adresse E-mail non reconnue." });
    });
})


///////////////////////////////////////////////////// CREATION SESSION //////////////////////////////////////////////////
authRoutes.post('/sessions', (req, res, next) => {

  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      // Something went wrong authenticating user
      res.status(400).json({ message: err });
      return;
    }

    if (!theUser) {
      // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      res.status(403).json({ message: "L'adresse E-mail et le mot de passe ne correspondent pas." });
      return;
    }

    // save user in session: req.user
    req.login(theUser, err => {
      if (err) {
        // Session save went bad
        res.status(400).json({ message: err });
        return;
      }

      // All good, we are now logged in and `req.user` is now set
      res.status(201).json(theUser);;
    });
  })(req, res, next);
});

//////////////////////////////////// CHECK IF LOGGED IN ////////////////////////////////

authRoutes.get('/session', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
    return;
  }
  res.status(401).json({ message: 'Unauthorized' });
});

///////////////////////////////////// DELETE SESSION ///////////////////////////////////

authRoutes.delete('/session', (req, res, next) => {
  req.logout();
  res.status(204).send();
});

////////////////////////////////// UPDATE USER DATA ////////////////////////////////////
authRoutes.put('/user', (req, res, next) => {

  if (req.isAuthenticated()) {
    
    User.findOne(req.user._id)
      .then(foundUser => {

        foundUser.firstName = req.body.firstName;
        foundUser.lastName = req.body.lastName;
        foundUser.email = req.body.email;
        foundUser.civility = req.body.civility;
        foundUser.telephone = req.body.telephone;
        foundUser.adresses = req.body.adresses;

        foundUser.save()
          .then(() => {
            res.status(200).json(foundUser);
          })
          .catch(err => {
            res.status(400).json({ message: "Une erreur lors de la MAJ de l'utilisateur s'est produite." });
          });
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ message: "User non trouvé" });
      });

    return;
  }
  res.status(401).json({ message: 'Unauthorized' });
});

//////////////////////////////// UPDATE USER PWD ////////////////////////////////////////
authRoutes.put('/user/password', (req, res, next) => {

});

module.exports = authRoutes;