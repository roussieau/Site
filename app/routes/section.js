'use strict';

var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var section  = require('../models/section.js').section;
var blog     = require('../models/blog.js').blog;
var error    = require('../../error.js');

//Obtenir la liste des sections
router.get('/', function(req, res,next) {
    section.find().sort({nom : 1}).exec(function(err, section){
        if(err) error(res, err);
        res.json(section);
    });
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
	.select('_id')
	.exec(function(err, reponse){
		blog.find({ section : reponse.id})
		.limit(10).sort({date : -1})
		.exec(function(err, blog){
			if(err) console.log(err);
			res.json(blog);
		});
	});
});

//Ajout d'un article
router.post('/:nom', function(req, res, next){
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
});

module.exports = router;
