'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var section = require('../models/section.js').section;
var error = require('../../error.js');

//Obtenir la liste des sections
router.get('/', function(req, res,next) {
    section.find().sort({nom : 1}).exec(function(err, section){
        if(err) error(res, err);
        res.json(section);
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
