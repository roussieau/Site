'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var section = require('../models/section.js').section;
var error = require('../../error.js');

//Il faut être admin
router.use(function(req, res, next){
	if(!req.user || req.user.grade <3){
		res.redirect('/');
	}
	next();
});
router.get('/', function(req, res,next) {
    if(!req.user){
        res.redirect('/');
    }
    res.render('section',{
        titre : "Les sections",
        log : req.user,
        section : req.section,
    });
});

router.get('/add', function(req, res,next) {
    res.render('addSection',{
        titre : "Créer une section",
        log : req.user,
        section : req.section
    });
});

router.post('/add', function(req, res,next) {
    var current = new section({nom : req.body.section});
    current.save(function(err,section){
        if(err) error(res, err);
       	res.redirect('/section');
    });
});

module.exports = router;
