var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var section = require('../models/section.js').section;

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
    if(!req.user){
        res.redirect('/');
    }
    res.render('addSection',{
        titre : "Créer une section",
        log : req.user,
        section : req.section
    });
});

router.post('/add', function(req, res,next) {
    if(!req.user){
        res.redirect('/');
    }
    var current = new section({nom : req.body.section});
    current.save(function(err,section){
        if(err) return handleError(err);
        console.log("Nouvelle section : \n" + section);
        res.redirect('/section');
    });
});

module.exports = router;
