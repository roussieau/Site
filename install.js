'use strict';
var express = require('express');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/db');
var section = require('./app/models/section.js').section;
var pageM = require('./app/models/page.js').page;
var user = require('./app/models/user.js').user;

var page = new pageM({nom : "/", titre : "Accueil"});
page.save(function(err, page){
	if(err) console.log(err);
	console.log("Création de la page d'accueil -> OK !");
});

var page = new pageM({nom : "/contact/", titre : "Contact"});
page.save(function(err, page){
	if(err)console.log(err);
	console.log("Création de la page de contact -> OK !");
});

var user = new user({});
user.nom = "Admin";
user.prenom = "Tux";
user.grade = 3;
user.email = "admin@gmail.com";
user.password = user.generateHash("ingi");
user.save(function(err, user){
	if(err) console.log(err);
	console.log("Admin -> OK !");
	console.log("email : admin@gmail.com");
	console.log("password : ingi");
});
var section = new section({nom:"Troupe de l'Harmonie Insolite"});
section.save(function(err){
    if(err) return handleError(err);
	console.log("Création d'une section -> OK !")
});
