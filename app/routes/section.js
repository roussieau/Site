'use strict';

var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var section  = require('../models/section.js').section;
var blog     = require('../models/blog.js').blog;
var error    = require('../../error.js');

//Obtenir la liste des sections
router.get('/', function(req, res,next) {
    section.find()
    .sort({nom : -1})
    .exec(function(err, section){
        if(err) error(res, err);
        console.log("On envoi "+ section);
        res.json(section);
    });
});

//Ajouter une section
router.post('/add', function(req, res, next){
	if(req.user && req.user.grade >2){
		var current = new section({});
		current.nom = req.body.nom;
		current.abr = req.body.abr;
		current.description = req.body.description;
		current.save(function(err, section){
			if(err) console.log(err);
			console.log(section);
		});
	}
	res.end()
});

//Récupération des 10 derniers articles
router.get('/all', function(req, res, next){
	blog.find({})
	.limit(10)
	.sort({date : -1})
	.exec(function(err, blog){
		res.json(blog);
	});
});

//Récupération des articles d'une section
router.get('/:nom', function(req, res, next){
	section.findOne({'abr':req.params.nom})
	.select('_id nom description')
	.exec(function(err, reponse){
		blog.find({ section : reponse.id})
		.limit(10).sort({date : -1})
		.exec(function(err, blog){
			if(err) console.log(err);
			var local = {};
			local.blog = blog;
			local.nom = reponse.nom;
			local.description = reponse.description;
			res.json(local);
		});
	});
});

//Ajout d'un article
router.post('/:nom', function(req, res, next){
	if(!req.user || req.user.grade < 3)
		res.end();
	else {
		section.findOne({'abr':req.params.nom})
		.select('_id nom')
		.exec(function(err, reponse){
			var current = new blog({});
			current.section = reponse._id;
			current.nom = reponse.nom;
			current.titre = req.body.titre;
			current.body = req.body.body;
			current.save(function(err){
				if(err) error(res, err);
				else console.log("Nouveau blog -> OK !");
				res.end();
			});
		});
	}
});

//Modifier la description d'une section
router.put('/:nom', function(req, res, next){
	if(req.user && req.user.grade > 2){
		section.findOne({'abr':req.params.nom})
		.select('_id')
		.exec(function(err, reponse){
			console.log(req.body.description);
			section.findByIdAndUpdate(reponse.id, {$set :{ description: req.body.description}},
			function(err, section){
				if(err) console.log(err);
				console.log(section);
			});
			res.end();
		});
	}
});

module.exports = router;
