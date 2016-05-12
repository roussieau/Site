'use strict';

var supertest = require('supertest');
var app = require('../../app.js');
var server = supertest.agent(app);

var user = require('../../app/models/user.js').user;

var steps = function() {

	var myUser;

	this.Given(/^a new user$/, function (callback) {
		myUser = new user();
		callback(null);
	});

	this.Then(/^i can register$/, function (callback) {
		myUser = new user({email: 'usr@user.com', password: 'pass'});
		callback(null);
	});

	this.Then(/^complete my informations$/, function (callback) {
		myUser.nom = 'Nom';
		myUser.prenom = 'Prenom'
		callback(null);
	});

	this.Then(/^I can sign in$/, function (callback) {
		server.post('/api/connexion/signin')
			.send({email: 'usr@user.com', password: 'pass'})
			.expect(200)
			.end(callback(null));
	});

	this.When(/^I go to my profile$/, function (callback) {
		server.get('/me')
			.expect(200)
			.end(callback(null));
	});

	this.Then(/^I can change my informations$/, function (callback) {
		myUser.nom = 'Nom2';
		callback(null);
	});

	this.Then(/^I can delete my account$/, function (callback) {
		myUser = undefined;
		callback(null);
	});

	this.Given(/^a registered user with admin rights$/, function (callback) {
		myUser = new user({email: 'usr@user.com', password: 'pass', grade: 3});
		callback(null);
	});

	this.When(/^I go to the user table$/, function (callback) {
		server.get('/user')
			.expect(200)
			.end(callback(null));
	});

	this.Then(/^I can give chief or admin rights to a user$/, function (callback) {
		myUser.grade = 2;
		callback(null);
	});

};

module.exports = steps;
