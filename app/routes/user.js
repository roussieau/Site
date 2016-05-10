'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user.js').user;
var error = require('../../error.js');

//Récupération du nom de l'utilisateur courant

router.get('/me', function(req, res){
    console.log("/me");
    if(req.user){
        user = {};
        user.nom = req.user.nom;
        user.grade = req.user.grade;
        res.json(user);
    }
    res.end();
});

module.exports = router;
