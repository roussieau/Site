'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user.js').user;
var error = require('../../error.js');

//Récupération du nom de l'utilisateur courant

router.get('/me', function(req, res){
    if(req.user){
        user = req.user;
        user.password = "";
        res.json(user);
    }
    res.end();
});

module.exports = router;
