'use strict';

var should = require('should');
var mongoose = require('mongoose');
var user = require('../user.js').user;
var enfant = require('../enfant.js').enfant;
var section = require('../section.js').section;

var	testEnfant, testSection, testUser;
var query;

describe('User model unit tests', function() {
	beforeEach(function() {
		testSection = new section({
			nom: 'test1'
		});

		testEnfant = new enfant({
			nom: 'test2',
			prenom: 'nope1',
			sexe: 'nope2',
			date: Date.now(),
			section: testSection.id
		});

		testUser = new user({
			prenom: 'test3',
			nom: 'test4',
			email: 'test5',
			password: 'test6',
			adresse: {
				rue: 'test7',
				numero: 1,
				ville: 'test8'
			},
			gsm: 'test9',
			enfants: [
				testEnfant.id
			],
			section: testSection.id
		});
	});

	describe('Create', function() {
		it('should be able to be saved', function(done) {
			testSection.save();
			testEnfant.save();
			testUser.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	describe('Read', function() {
		it('should be found', function(done) {
			testSection.save();
			testEnfant.save();
			testUser.save();
			query = user.findOne({prenom : 'test3'});
			query.exec(function(err, userFound) {
				if (err) console.log(err);
				should.exist(userFound);
				done();
			});
		});

		it('should have the same values', function(done) {
			testSection.save();
			testEnfant.save();
			testUser.save();
			query = user.findOne({prenom : 'test3'});
			query.exec(function(err, userFound) {
				if (err) console.log(err);
				should.equal(userFound.prenom, 'test3');
				should.equal(userFound.nom, 'test4');
				should.equal(userFound.email, 'test5');
				should.equal(userFound.password, 'test6');
				should.equal(userFound.adresse.rue, 'test7');
				should.equal(userFound.adresse.numero, 1);
				should.equal(userFound.adresse.ville, 'test8');
				should.equal(userFound.gsm, 'test9');
				query = section.findById(userFound.section);
				query.exec(function(err, sectionFound) {
					if (err) console.log(err);
					should.equal(sectionFound.nom, 'test1');
				});
				query = enfant.findById(userFound.enfants[0]);
				query.exec(function(err, enfantFound) {
					if (err) console.log(err);
					should.equal(enfantFound.nom, 'test2');
					query = section.findById(enfantFound.section);
					query.exec(function(err, sectionFound) {
						if (err) console.log(err);
						should.equal(sectionFound.nom, 'test1');
						done();
					});
				});
			});
		});

		it('should have default values', function(done) {
			testSection.save();
			testEnfant.save();
			testUser.save();
			query = user.findOne({prenom : 'test3'});
			query.exec(function(err, userFound) {
				if (err) console.log(err);
				should.equal(userFound.grade, 1);
				done();
			});
		});
	});

	describe('Update', function() {
		it('should be able to update documents', function(done) {
			testSection.save();
			testEnfant.save();
			testUser.save();
			user.update({prenom: 'test3'}, {nom: 'test10'}, function(err) {
				if(err) console.log(err);
			});
			query = user.findOne({prenom : 'test3'});
			query.exec(function(err, userFound) {
				if(err) console.log(err);
				should.equal(userFound.nom, 'test10');
				done();
			});
		});
	});

	describe('Remove', function() {
		it('should be able to be removed', function(done) {
			testSection.save();
			testEnfant.save();
			testUser.save();
			section.remove({nom: 'test1'}, function(err) {
				should.not.exist(err);
			});
			enfant.remove({nom: 'test2'}, function(err) {
				should.not.exist(err);
			});
			user.remove({prenom: 'test3'}, function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function() {
		section.remove({nom: 'test1'}, function(err) {
			if (err) console.log(err);
		});
		enfant.remove({nom: 'test2'}, function(err) {
			if (err) console.log(err);
		});
		user.remove({prenom: 'test3'}, function(err) {
			if (err) console.log(err);
		});
	});
});
