'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var user = require('../models/user.js').user;
var error = require('../../error.js');
var validator = require('validator');

router.get('/', function(req, res,next) {
  res.render('signup', {
      titre: "Inscription",
      log : req.log,
      section: req.section
    });
});

router.post('/', function(req, res,next) {
	if(req.body.nom && req.body.prenom && req.body.email &&
	req.body.password && validator.isEmail(req.body.email)){
		var current = new user({});
		current.nom = req.body.nom;
		current.prenom = req.body.prenom;
		current.email = validator.normalizeEmail(req.body.email,{lowercase: true});
		current.password = current.generateHash(req.body.password);

		current.save(function(err, user){
			if(err) error(res, err);
			console.log(user);
		});
	}
	next();
});

//Connexion automatique après l'inscription
router.post('/',passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

module.exports = router;
