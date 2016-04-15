'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var page = require('../models/page.js').page;
var blog = require('../models/blog.js').blog;

//On charge la page d'accueil
router.all('/', function(req, res,next) {
    page.findOne({nom : '/'},function(err, page){
        if(err) return handleError(err);
        res.render('showPage',{
            titre : "Accueil",
            log : req.user,
            section : req.section,
            page : page
        });
    });
});

//Edition de la page d'accueil
router.get('/edit', function(req, res, next){
	if(!req.user || req.user.grade <3){
		res.redirect('/');
	}
    page.findOne({nom : '/'},function(err, page){
        if(err) return handleError(err);
        res.render('editPage',{
            titre : "Edition",
            log : req.user,
            section : req.section,
            page : page
        });
    });
});

router.post('/edit', function(req, res, next){
	if(!req.user || req.user.grade<3){
		res.redirect('/');
	}
    page.findOne({nom: '/' }, function (err, doc){
        doc.titre = req.body.titre;
        doc.body = req.body.contenu;
        doc.save();
        res.redirect('/');
    });

});

//Les sites des sections
router.get('/:nom',function(req, res, next){
	req.section.forEach(function(el){ //On check si la section existe
		if(el.nom == req.params.nom){
			req.sectionId = el._id;
		}
	});
	next();
}, 
function(req, res, next){
	if(req.sectionId){ //Si la section existe, on envoi la vue
		blog.find({section : req.sectionId}).limit(10).sort({date : 1}).exec(function(err, blog){
			if(err) console.log(err);
			console.log("voici le blog :"+blog);
			res.render('sectionBlog',{
				titre : "Section",
				section : req.section,
				log : req.user,
				blog : blog,
				id : req.sectionId
			});	
		});
	}
	else { //Sinon on passe au middleware suivant
		next();
	}
});

//Enregistrement du nouveau blog dans la base de donnée
router.post('/:nom', function(req, res, next){
	req.section.forEach(function(el){ //On check si la section existe
		if(el.nom == req.params.nom){
			req.sectionId = el._id;
		}
	});
	next();
},
function(req, res, next){
	if(req.sectionId){
		if(req.user && ((req.user.section && req.sectionId.toString() == req.user.section.toString() && req.user.grade == 2) 
		|| req.user.grade==3)) { //il faut être connecté et soit admin soit que ça soit notre section
			var current = new blog({});
			current.section = req.sectionId;
			current.titre = req.body.titre;
			current.body = req.body.body;
			current.save(function(err){
				if(err) console.log("Erreur lors de la création du blog");
				else console.log("Nouveau blog -> OK !");
			});
		}
		res.redirect('/'+req.params.nom);
	}
	else {
		next();
	}
});

module.exports = router;
