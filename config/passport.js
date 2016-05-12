'use strict';
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user.js').user;

module.exports = function(){
	passport.serializeUser(function(user, done) {
	    done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
	    	done(err, user);
		});
	});

	passport.use(new LocalStrategy({
	    usernameField: 'email',
	    passwordField: 'password'
	},
	function(email, password, done) {
	    User.findOne({ email: email }, function(err, user) {
	    	if (err) { return done(err); }
	        if (!user) {
	        	return done(null, false, { message: 'Adresse mail invalide' });
	      	}
	        if (!user.validPassword(password)) {
	        	return done(null, false, { message: 'Mot de passe invalide' });
	      	}
	        return done(null, user);
	    });
	}
	));
};
