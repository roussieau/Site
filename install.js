var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db');
var section = require('./app/models/section.js').section;

var page = new section({nom:"THI"});
page.save(function(err){
    if(err) return handleError(err);
    console.log("Page d'accueil -> OK !");
});
