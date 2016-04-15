'use strict';

//Importation des modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');
var auth = require('./config/passport.js');

//Connection à la base de donnée
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/db');

//Routes
var routes = require('./app/routes/index');
var signup = require('./app/routes/signup.js');
var login = require('./app/routes/login.js');
var set = require('./app/routes/set.js');
var logout = require('./app/routes/logout.js');
var user = require('./app/routes/user.js');
var contact = require('./app/routes/contact.js');
var section = require('./app/routes/section.js');
var enfant = require('./app/routes/enfant.js');
var dashboard = require('./app/routes/dashboard.js');

var app = express();

//Template
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');

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
var auth = auth();

//Pour avoir accès à GET, POST, PUT et DELETE
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.use(set);
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/user', user);
app.use('/contact', contact);
app.use('/section', section);
app.use('/enfant', enfant);
app.use('/dashboard', dashboard);
app.use('/', routes);

//Erreur 404
app.use(function(req, res) {
    res.render('404',{
        titre : "Les scouts | Erreur 404",
        section : req.section,
        log : req.log
    });
});

module.exports = app;
