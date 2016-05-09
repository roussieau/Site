'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var user = require('../models/user.js').user;
var error = require('../../error.js');
var validator = require('validator');


//Connexion via passportjs, la configuration se trouve dans ../../config/passport.js
router.post('/login',passport.authenticate('local'), function(req, res, next){
	var user = req.user;
	user.password = "";
	res.json(user);
});

//Déconnexion de passportjs
router.get('/logout', function(req, res,next) {
  req.logout();
  res.end();
});


//Inscription
router.post('/signup', function(req, res,next) {
	if(req.body.nom && req.body.prenom && req.body.mail &&
	req.body.password && validator.isEmail(req.body.mail)){
		var current = new user({});
		current.nom = req.body.nom;
		current.prenom = req.body.prenom;
		current.email = validator.normalizeEmail(req.body.mail,{lowercase: true});
		current.password = current.generateHash(req.body.password);

		current.save(function(err, user){
			if(err) error(res, err);
			console.log(user);
			res.json(user);
		});
	}
	console.log("Il n'est pas rentré dans vérification coté serveur");
});
module.exports = router;
