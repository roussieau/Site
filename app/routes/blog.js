'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var blog = require('../models/blog.js').blog;

router.delete('/:id', function(req, res, next){
	if(req.user && (req.user.grade > 2 || req.params.id && req.user.section)){
		blog.findOneAndRemove({ _id : req.params.id}, function(err){
			if(err) console.log(err);
			else
				console.log("Supprimé !");
		});
	}
	res.end();
});

module.exports = router;