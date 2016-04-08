var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var page = require('../models/page.js').page;

router.get('/', function(req, res,next) {
    page.findOne({nom : '/contact/'},function(err, page){
        if(err) return handleError(err);
        res.render('showPage',{
            titre : "Les scouts | Contact",
            log : req.user,
            section : req.section,
            page : page
        });
    });
});

router.get('/edit', function(req, res, next){
    page.findOne({nom : '/contact/'},function(err, page){
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
    page.findOne({nom: '/contact/' }, function (err, doc){
        doc.titre = req.body.titre;
        doc.body = req.body.contenu;
        doc.save();
        res.redirect('/contact');
    });

});

module.exports = router;