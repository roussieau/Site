'use strict';

//Importation des modules
var express        = require('express');
var path           = require('path');
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var session        = require('express-session');
var passport       = require('passport');
var auth           = require('./config/passport.js');
var flash          = require('connect-flash');

//Connection à la base de donnée
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/db');

//Routes
var routes   = require('./app/routes/index');
var connexion= require('./app/routes/connexion.js');
var user     = require('./app/routes/user.js');
var contact  = require('./app/routes/contact.js');
var section  = require('./app/routes/section.js');
var enfant   = require('./app/routes/enfant.js');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'louvainlaneuve',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
var auth = auth();

//Pour avoir accès à GET, POST, PUT et DELETE
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


app.use('/api/connexion', connexion);
app.use('/api/user', user);
app.use('/api/contact', contact);
app.use('/api/section', section);
app.use('/api/enfant', enfant);
app.use('/api', routes);
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '/public/modules/base/views/index.html'));
});
//Erreur 404
app.use(function(req, res) {
    res.render('404',{
        titre : "Les scouts | Erreur 404",
        section : req.section,
        log : req.log
    });
});

module.exports = app;
