'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user.js').user;
var error = require('../../error.js');

//Il faut être admin
router.use(function(req, res, next){
    if(!req.user || req.user.grade<3){
        res.redirect('/');
    }
	next();
});

router.get('/', function(req, res,next) {
    user.find().sort({nom:1}).exec(function(err, user){
        if (err) error(res, err);
        res.render('user',{
            titre : "User",
            log : req.user,
            section : req.section,
            user : user
        });
    });
});

router.get('/:id', function(req, res) {
    user.findById(req.params.id, function(err, user){
        if(err) error(res, err);
        if(!user){
            res.redirect('/user');
        }
        res.render('editUser',{
            titre : "User",
            log : req.user,
            section : req.section,
            user : user
        });
    });
});

router.post('/:id', function(req, res) {
    user.findById(req.params.id, function(err, user){
        if(err) error(res, err);
        user.nom = req.body.nom;
		user.grade = req.body.grade;
		if(req.body.sec){
			user.section = req.body.sec;
		}else{
			user.section = null;
		}
        user.save(function(err, user){
			if(err)error(res, err);
			console.log(user);
		});
    });
    res.redirect('/user');
});

module.exports = router;
