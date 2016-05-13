'use strict';
var express = require('express');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/db');
var section = require('./app/models/section.js').section;
var pageM = require('./app/models/page.js').page;
var user = require('./app/models/user.js').user;
var blog = require('./app/models/blog.js').blog;

var page = new pageM({nom : "/", titre : "Bienvenue sur la page d'accueil !"});
page.body = '<div class="row"><div class="col-md-6"><img src="/img/scout.png" height="400px " class="center-block"/></div><div class="col-md-6">Bienvenue sur le site web développé par Julian Roussieau et Sébastien Strebelle <br />Si vous avez des questions ou des requêtes. <br />Vous pouvez les faire à l\'adresse suivante : <br />julian@roussieau.com <br /> <br />Bonne visite</div></div>'
page.save(function(err, page){
	if(err) console.log(err);
	console.log("Création de la page d'accueil -> OK !");
});

var page = new pageM({nom : "/contact/", titre : "Contact"});
page.body = "Pour nous contacter : <br /> julian@roussieau.com";
page.save(function(err, page){
	if(err) console.log(err);
	console.log("Création de la page de contact -> OK !");
});


var section = new section({nom:"Troupe de l'Harmonie Insolite"});
section.abr = 'thi';
section.description = "La Troupe de l'Harmonie Insolite est composée de fille de 12 à 16 ans !"
section.save(function(err,section){
    if(err) console.log(err);
    var current = new blog({});
    current.titre = "Test des articles";
    current.body = "Waw j'adore ce site !";
    current.nom = "Troupe de l'Harmonie Insolite";
    current.section = section._id;
    current.save();
	console.log("Création d'une section -> OK !");
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
