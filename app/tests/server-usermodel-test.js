'use strict';

var should = require('should');
var mongoose = require('mongoose');
var user = require('../models/user.js').user;
var enfant = require('../models/enfant.js').enfant;
var section = require('../models/section.js').section;

var	testEnfant, testSection, testUser;
var query;

describe('User model unit tests', function() {
	beforeEach(function() {
		testSection = new section({
			nom: 'test1'
		});
		testSection.save();

		testEnfant = new enfant({
			nom: 'test2',
			prenom: 'nope1',
			sexe: 'nope2',
			date: Date.now(),
			section: testSection.id
		});
		testEnfant.save();

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

	describe('Save', function() {
		it('should be able to be saved', function() {
			testUser.save(function(err) {
				should.not.exist(err);
			});
		});
	});

	describe('Get', function() {
		it('should be found', function(done) {
			testUser.save();
			query = user.findOne({prenom : 'test3'});
			query.exec(function(err, userFound) {
				if (err) console.log(err);
				should.exist(userFound);
				done();
			});
		});

		it('should have the same values', function(done) {
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
				})
				query = enfant.findById(userFound.enfants[0]);
				query.exec(function(err, enfantFound) {
					if (err) console.log(err);
					should.equal(enfantFound.nom, 'test2');
					query = section.findById(enfantFound.section);
					query.exec(function(err, sectionFound) {
						if (err) console.log(err);
						should.equal(sectionFound.nom, 'test1');
						done();
					})
				});
			});
		});

		it('should have default values', function(done) {
			testUser.save();
			query = user.findOne({prenom : 'test3'});
			query.exec(function(err, userFound) {
				if (err) console.log(err);
				should.equal(userFound.grade, 1);
				done();
			});
		});
	});

	afterEach(function() {
		testUser.remove();
		testEnfant.remove();
		testSection.remove();
	});
});
