'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

router.get('/', function(req, res,next) {
  res.render('login', {
      titre: "Connexion",
      log : req.log,
      section: req.section
    });
});

//Connexion via passportjs, la configuration se trouve dans ../../config/passport.js
router.post('/',passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));
module.exports = router;
