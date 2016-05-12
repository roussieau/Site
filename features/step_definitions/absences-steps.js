'use strict';

var supertest = require('supertest');
var app = require('../../app.js');
var server = supertest.agent(app);

var user = require('../../app/models/user.js').user;
var enfant = require('../../app/models/enfant.js').enfant;
var section = require('../../app/models/section.js').section;

var steps = function () {

	var myUser, mySection, myEnfant;

	this.Given(/^a registered user with children enrolled$/, function (callback) {
		mySection = new section({nom: 'section', abr: 'sec'});
		myEnfant = new	enfant({nom: 'Nom', prenom: 'Prenom', section: mySection.id});
		myUser = new user({email: 'usr@user.com', password: 'pass', enfants : [myEnfant.id]});
		callback(null);
	});

	this.When(/^I go to a section's absence table$/, function (callback) {
		server.get('/section/sec/absence') //pas bon
			.expect(200)
			.end(callback(null));
	});

   this.Then(/^I can inform the section about my children's absence to a upcoming reunion$/, function (callback) {
		//TODO
		callback(null);
	});

	this.Given(/^a user$/, function (callback) {
		myUser = new user({email: 'usr@user.com', password: 'pass'});
		callback(null);
	});

	this.Then(/^I can see wath children have been absent to the reunion$/, function (callback) {
		server.get('/section/sec/absence') //pas bon
			.expect(200)
			.end(callback(null));
	});

	this.Given(/^a registered chief from a created section or a admin$/, function (callback) {
		myUser = new user({email: 'usr@user.com', password: 'pass', section: mySection.id, grade: 2});
		callback(null);
	});

	this.When(/^I go to my section's absence table$/, function (callback) {
		server.get('/section/sec/absence') //pas bon
			.expect(200)
			.end(callback(null));
	});

	this.Then(/^I can signal a children's absence to a passed reunion$/, function (callback) {
		//TODO
		callback(null);
	});

};

module.exports = steps;
