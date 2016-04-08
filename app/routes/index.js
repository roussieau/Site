var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var page = require('../models/page.js').page;

router.all('/', function(req, res,next) {
    page.findOne({nom : '/'},function(err, page){
        if(err) return handleError(err);
        res.render('showPage',{
            titre : "Les scouts | Accueil",
            log : req.user,
            section : req.section,
            page : page
        });
    });
});

router.get('/edit', function(req, res, next){
    page.findOne({nom : '/'},function(err, page){
        if(err) return handleError(err);
        res.render('editPage',{
            titre : "Les scouts | Accueil",
            log : req.user,
            section : req.section,
            page : page
        });
    });
});

router.post('/edit', function(req, res, next){
    page.findOne({nom: '/' }, function (err, doc){
        doc.titre = req.body.titre;
        doc.body = req.body.contenu;
        doc.save();
        res.redirect('/');
    });

});

module.exports = router;