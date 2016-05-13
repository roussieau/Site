'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var page = require('../models/page.js').page;
var error = require('../../error.js');

//Pour récupérer la page de contact
router.get('/', function(req, res,next) {
    page.findOne({nom : '/contact/'},function(err, page){
        if(err) error(res, err);
        res.json(page);
    });
});

//Modification de la page de contact
router.post('/edit', function(req, res, next){
    if(req.user && req.user.grade > 2){
        page.findOne({nom: '/contact/' }, function (err, doc){
            doc.titre = req.body.titre;
            doc.body = req.body.body;
            doc.save();
            res.end();
        });
    }
    else 
        res.end();
});

module.exports = router;
