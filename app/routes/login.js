'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

//Connexion via passportjs, la configuration se trouve dans ../../config/passport.js
router.post('/',passport.authenticate('local'), function(req, res, next){
	res.json(req.user);
});

module.exports = router;
