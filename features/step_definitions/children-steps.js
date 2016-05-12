'use strict';

var supertest = require('supertest');
var app = require('../../app.js');
var server = supertest.agent(app);

var user = require('../../app/models/user.js').user;
var enfant = require('../../app/models/enfant.js').enfant;
var section = require('../../app/models/section.js').section;

var steps = function() {

	var myUser, mySection, myEnfant;

	this.Given(/^a registered user$/, function (callback) {
		myUser = new user({email: 'usr@user.com', password: 'pass'});
		callback(null);
	});

	this.When(/^I go to my dashboard$/, function (callback) {
		server.get('/dashboard')
			.expect(200)
			.end(callback(null));
	});

	this.Then(/^I can create a new children$/, function (callback) {
		myEnfant = new enfant({nom: 'Nom', prenom: 'Prenom'});
		callback(null);
	});

	this.Then(/^enroll him to a section$/, function (callback) {
		mySection = new section({nom: 'section', abr: 'sec'});
		myEnfant.section = mySection.id;
		callback(null);
	});

	this.Then(/^I can change my children's informations$/, function (callback) {
		server.post('/api/enfant')
			.expect(200)
			.end(callback(null));
	});

	this.Then(/^I can remove my children from a section$/, function (callback) {
		myEnfant.section = null;
		callback(null);
	});

};

module.exports = steps;
