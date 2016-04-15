'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var page = require('../models/page.js').page;

router.get('/', function(req, res,next) {
    page.findOne({nom : '/contact/'},function(err, page){
        if(err) return handleError(err);
        res.render('showPage',{
            titre : "Contact",
            log : req.user,
            section : req.section,
            page : page
        });
    });
});

//Edition de la page contact
//Il faut être admin (grade 3)
router.get('/edit', function(req, res, next){
	if(!req.user || req.user.grade<3){
		res.redirect('/');
	}
    page.findOne({nom : '/contact/'},function(err, page){
        if(err) return handleError(err);
        res.render('editPage',{
            titre : "Edition",
            log : req.user,
            section : req.section,
            page : page
        });
    });
});

router.post('/edit', function(req, res, next){
	if(!req.user || req.user.grade<3){
		res.redirect('/');
	}
    page.findOne({nom: '/contact/' }, function (err, doc){
        doc.titre = req.body.titre;
        doc.body = req.body.contenu;
        doc.save();
        res.redirect('/contact');
    });

});

module.exports = router;
