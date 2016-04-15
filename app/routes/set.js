'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var section = require('../models/section.js').section;

//On va charger les différentes sections, pour les mettre dans le menu
router.use(function(req, res, next){
    section.find().sort({nom : 1}).exec(function(err, section){
        if(err) return handleError(err);
        req.section = section;
        next();
    });
});

module.exports = router;
