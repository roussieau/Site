var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

router.get('/', function(req, res,next) {
  res.render('login', {
      titre: "Les scouts | Connexion",
      log : req.log,
      section: req.section
    });
});

router.post('/',passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));
module.exports = router;
