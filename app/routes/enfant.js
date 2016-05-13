'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var enfant = require('../models/enfant.js').enfant;
var section = require('../models/section.js').section;
var user = require('../models/user.js').user;
var error = require('../../error.js');


//On renvoi les enfants de l'utilisateur courant
router.get('/my', function(req, res, next){
	if(!req.user)
		res.end();
	else {
		user.findOne({_id : req.user._id})
		.populate('enfants')
		.exec(function(err, user){
			if(err) console.log(err);
			res.json(user.enfants);
		});
	}
});


//Renvoi tous les enfants du site
router.get('/', function(req, res, next){
	if(req.user && req.user.grade > 2){
		enfant.find().sort({nom:1}).exec(function(err, enfant){
			if(err) error(res, err);
			res.json(enfant);
		});
	}
});


//Ajouter un enfant
router.post('/add', function(req, res, next) {
	var current = new enfant({});
	current.nom = req.body.nom;
	current.prenom = req.body.prenom;
	current.totem = req.body.totem;
	current.date = new Date(req.body.annee+"-"+req.body.mois+"-"+req.body.jour);
	current.sexe = req.body.sexe;
	current.commentaire = req.body.commentaire;
	current.section = req.body.sec;
	user.findByIdAndUpdate(req.user._id,{$push : {enfants : current._id}},{'new': true},function(err, user){
		if (err) error(res, err);
	});
	current.save(function(err, enfant){
		if(err) error(res, err);
		console.log("Nouvel enfant : \n" + enfant);
	});
	res.end();
});



//Check si id est dans le tableau d'objectId
function inTab(tab, id) {
	var isInArray = tab.some(function (el) {
    	return el.equals(id);
	});
	return isInArray;
}

module.exports = router;
