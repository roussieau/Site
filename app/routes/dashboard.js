'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var enfant = require('../models/enfant.js').enfant;
var error = require('../../error.js');

//L'utilisateur doit être connecté
router.use(function(req, res, next){
    if(!req.user){
        res.redirect('/');
    }
    next();
});

//On récupère les enfants 
router.get('/',function(req, res, next){
    enfant.find({ _id : { $in : req.user.enfants}})
    .select('nom prenom _id')
    .sort({prenom : 1})
    .exec(function(err, enfant){
        if (err) error(res, err);
		res.json(enfant);
    });
});



module.exports = router;
