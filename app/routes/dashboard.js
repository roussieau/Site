'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var enfant = require('../models/enfant.js').enfant;

//L'utilisateur doit être connecté
router.use(function(req, res, next){
    if(!req.user){
        res.redirect('/');
    }
    next();
});

router.get('/',function(req, res, next){
    var local = {};
    console.log(req.user);
    enfant.find({ _id : { $in : req.user.enfants}})
    .select('nom prenom _id')
    .sort({prenom : 1})
    .exec(function(err, enfant){
        if (err) console.log(err);
        local.enfant = enfant;
        console.log(local.enfant);
        res.render('dashboard', {
            titre : "Dashboard",
            log : req.user,
            section : req.section,
            local : local
        })
    });
});



module.exports = router;
