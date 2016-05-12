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


router.get('/', function(req, res, next){
	enfant.find().sort({nom:1}).exec(function(err, enfant){
		if(err) error(res, err);
		res.json(enfant);
	});
});

router.get('/:nom', function(req, res, next){
	section.findOne({nom : req.params.nom})
	.select('_id')
	.exec(function(err, section){
		res.json(section);
	});
});

router.post('/add', function(req, res, next) {
	if(req.body.nom && req.body.prenom && req.body.sec &&
	req.body.jour && req.body.mois && req.body.annee &&
	req.body.sexe) { //Ces champs doivent être complétés
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
	}
	res.redirect('/');
});

//Modidication d'un enfants
//Il faut être admin ou que ça soit le sien
router.get('/:id', function(req, res, next) {
	if(req.user.grade >2 || inTab(req.user.enfants, req.params.id)){
		enfant.findById(req.params.id, function(err, enfant){
			if(err) error(res, err);
			if(enfant){
				res.render('editEnfant',{
					titre : "Enfant",
					log : req.user,
					section : req.section,
					enfant : enfant
				});
			}
			else
				next();
		});
	}
	else 
		next();
});

router.post('/:id', function(req, res) {
	if(req.user.grade >2 || inTab(req.user.enfants, req.params.id)){
		enfant.findByIdAndUpdate(req.params.id,{ $set : {
			nom : req.body.nom,
			prenom : req.body.prenom,
			totem : req.body.totem,
			section : req.body.sec,
			commentaire : req.body.commentaire
		}},{new: true},function(err, enfant){
			if(err) error(res, err);
			console.log("Enfant : \n" +enfant);
		});
	}
    res.redirect('/dashboard');
});


//Check si id est dans le tableau d'objectId
function inTab(tab, id) {
	var isInArray = tab.some(function (el) {
    	return el.equals(id);
	});
	return isInArray;
}

module.exports = router;
