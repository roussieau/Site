'use strict';

var express = require('express');
var router = express.Router();

//Déconnexion de passportjs
router.get('/', function(req, res,next) {
  req.logout();
  res.end();
});

module.exports = router;
