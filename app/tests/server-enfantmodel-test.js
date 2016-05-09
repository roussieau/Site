'use strict';

var should = require('should');
var mongoose = require('mongoose');
var enfant = require('../models/enfant.js').enfant;
var section = require('../models/section.js').section;

var testEnfant, testSection;
var date = Date.now();
var query;

describe('Enfant model unit tests:', function() {
	beforeEach(function() {
		testSection = new section({
			nom : 'test6'
		});

		testEnfant = new enfant({
			nom : 'test1',
			prenom : 'test2',
			totem : 'test3',
			sexe : 'test4',
			date : date,
			section : testSection.id,
			commentaire : 'test5'
		});
	});

	describe('Create', function() {
		it('should be able to be saved', function(done) {
			testSection.save();
			testEnfant.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should require name values', function(done) {
			testSection.save();
			testEnfant.nom = '';
			testEnfant.prenom = '';
			testEnfant.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should require base values', function(done) {
			testSection.save();
			testEnfant.sexe = '';
			testEnfant.date = null;
			testEnfant.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should require section value', function(done) {
			testSection.save();
			testEnfant.section = null;
			testEnfant.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should not require other values', function(done) {
			testSection.save();
			testEnfant.totem = '';
			testEnfant.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	describe('Read', function() {
		it('should be found', function(done) {
			testSection.save();
			testEnfant.save();
			query = enfant.findOne({nom: 'test1'});
			query.exec(function(err, enfantFound) {
				if (err) console.log(err);
				should.not.exist(err);
				done();
			});
		});

		it('should have the same values', function(done) {
			testSection.save();
			testEnfant.save();
			query = enfant.findOne({nom: 'test1'});
			query.exec(function(err, enfantFound) {
				if (err) console.log(err);
				should.equal(enfantFound.nom, 'test1');
				should.equal(enfantFound.prenom, 'test2');
				should.equal(enfantFound.totem, 'test3');
				should.equal(enfantFound.sexe, 'test4');
				should.equal(enfantFound.date.getTime(), date);
				should.equal(enfantFound.commentaire, 'test5');
				query = section.findById(enfantFound.section);
				query.exec(function(err, sectionFound) {
					if (err) console.log(err);
					should.equal(sectionFound.nom, 'test6');
					done();
				});
			});
		});

		it('should have default values', function(done) {
			testSection.save();
			testEnfant.save();
			query = enfant.findOne({nom: 'test1'});
			query.exec(function(err, enfantFound) {
				if (err) console.log(err);
				should.equal(enfantFound.statut, 1);
				done();
			});
		});
	});

	describe('Update', function() {
		it('should be able to update documents', function(done) {
			testSection.save();
			testEnfant.save();
			enfant.update({nom: 'test1'}, {prenom: 'test10'}, function(err) {
				if(err) console.log(err);
			});
			query = enfant.findOne({nom : 'test1'});
			query.exec(function(err, enfantFound) {
				if(err) console.log(err);
				should.equal(enfantFound.prenom, 'test10');
				done();
			});
		});
	});

	describe('Remove', function() {
		it('should be able to be removed', function(done) {
			testSection.save();
			testEnfant.save();
			section.remove({nom: 'test6'}, function(err) {
				should.not.exist(err);
			});
			enfant.remove({nom: 'test1'}, function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function() {
		section.remove({nom: 'test6'}, function(err) {
			if (err) console.log(err);
		});
		enfant.remove({nom: 'test1'}, function(err) {
			if (err) console.log(err);
		});
	});
});
