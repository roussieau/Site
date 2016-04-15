'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var enfant = require('../models/enfant.js').enfant;
var section = require('../models/section.js').section;
var user = require('../models/user.js').user;
var error = require('../../error.js');

//L'utilisateur doit être connecté
router.use(function(req, res, next){
    if(!req.user){
        res.redirect('/');
    }
    next();
});

router.get('/', function(req, res, next){
	if(req.user.grade > 2){ //Il faut être admin pour voir tous les enfants
		enfant.find().sort({nom:1}).exec(function(err, enfant){
			if(err) error(res, err);
			res.render('enfant',{
				titre : "Les sections",
				log : req.user,
				section : req.section,
				enfant : enfant
			});
		});
	}
	next();
});

router.get('/add', function(req, res,next) {
    res.render('addEnfant',{
        titre : "Ajouter un enfant",
        log : req.user,
        section : req.section
    });
});

router.post('/add', function(req, res, next) {
    var current = new enfant({});
    current.nom = req.body.nom;
    current.prenom = req.body.prenom;
    current.totem = req.body.totem;
    current.commentaire = req.body.commentaire;
    current.section = req.body.sec;
    user.findByIdAndUpdate(req.user._id,{$push : {enfants : current._id}},{'new': true},function(err, user){
        if (err) error(res, err);
    });
    current.save(function(err, enfant){
        if(err) error(res, err);
        console.log("Nouvel enfant : \n" + enfant);
        res.redirect('/');
    });
});

//Modidication d'un enfants
//Il faut être admin ou que ça soit le sien
router.get('/:id', function(req, res, next) {
	if(req.user.grade >2){
		enfant.findById(req.params.id, function(err, enfant){
			if(err) error(res, err);
			if(!enfant){
				res.redirect('/dashboard');
			}
			res.render('editEnfant',{
				titre : "Enfant",
				log : req.user,
				section : req.section,
				enfant : enfant
			});
		});
	}
	next();
});

router.post('/:id', function(req, res) {
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
    res.redirect('/dashboard');
});

module.exports = router;
