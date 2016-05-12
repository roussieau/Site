'use strict';

var supertest = require('supertest');
var app = require('../../app.js');
var server = supertest.agent(app);
var should = require('should');

var user = require('../../app/models/user.js').user;
var section = require('../../app/models/section.js').section;
var blog = require('../../app/models/blog.js').blog;

var steps = function() {

	var myUser, mySection, myBlog;

	this.Given(/^a registered chief or a admin$/, function (callback) {
		mySection = new section({nom: 'section', abr: 'sec'});
		myUser = new user({email: 'usr@user.com', password: 'pass', grade: 2});
		callback(null);
	});

	this.When(/^I connect to the app$/, function (callback) {
		server.get('/section') //pas bon
			.expect(200)
			.end(callback(null));
	});

	this.Then(/^I can create a section$/, function (callback) {
		server.post('/api/section') //pas bon
			.send({nom: 'section', abr: 'sec'})
			.expect(200)
			.end(callback(null));
	});

	this.Then(/^create its blog$/, function (callback) {
		callback(null); //Nothing to do, already created with post /api/section
	});

	this.When(/^I go to a section blog$/, function (callback) {
		server.get('/section/'+mySection.abr) //pas bon
			.expect(200)
			.end(callback(null));
	});

	this.Then(/^I can see all articles created$/, function (callback) {
		server.get('/section/'+mySection.abr) //pas bon
			.expect(200)
			.end(callback(null));
	});

	this.Given(/^a registered chief from a section or a admin$/, function (callback) {
		mySection = new section({nom: 'section', abr: 'sec'});
		myUser = new user({email: 'usr@user.com', password: 'pass', section: mySection.id, grade: 2});
		callback(null);
	});

	this.When(/^I go to my section blog$/, function (callback) {
		server.get('/section/'+mySection.abr) //pas bon
			.expect(200)
			.end(callback(null));
	});

	this.Then(/^I can create a new article$/, function (callback) {
		server.post('/api/section'+mySection.abr)
			.send({titre: 'Titre', body: 'Body', section: mySection.id})
			.expect(200)
			.end(callback(null));
	});

};

module.exports = steps;
