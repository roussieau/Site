'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var page = require('../models/page.js').page;
var blog = require('../models/blog.js').blog;
var error = require('../../error.js');

//On charge la page d'accueil
router.get('/', function(req, res,next) {
    page.findOne({nom : '/'},function(err, page){
        if(err) error(res, err);
        res.json(page);
    });
});

//Edition de la page d'accueil
router.post('/', function(req, res, next){
	if(!req.user || req.user.grade < 3) //Accès refusé
		res.end();
	else {
	    page.findOne({nom: '/' }, function (err, doc){
	        doc.titre = req.body.titre;
	        doc.body = req.body.body;
	        doc.save(function(err, page){
				if(err) console.log(err);
				res.json(doc);
			});
		});
	}

});

module.exports = router;
