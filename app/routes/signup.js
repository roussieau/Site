var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user.js').user;

router.get('/', function(req, res,next) {
  res.render('signup', {
      titre: "Inscription",
      log : req.log,
      section: req.section
    });
});

router.post('/', function(req, res,next) {
    var current = new user({});
    current.nom = req.body.nom;
    current.prenom = req.body.prenom;
    current.email = req.body.email;
    current.password = current.generateHash(req.body.pwd);

    current.save(function(err, user){
        if(err)return handleError(err);
        console.log(user);
    });
    res.redirect('/');
});
module.exports = router;
