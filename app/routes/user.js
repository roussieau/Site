'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user.js').user;
var error = require('../../error.js');

//Récupération du nom de l'utilisateur courant

router.get('/me', function(req, res){
    if(req.user){
        var usr = req.user;
        usr.password = "";
        res.json(usr);
    }
    res.end();
});

module.exports = router;
