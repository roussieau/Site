'use strict';

var should = require('should');
var mongoose = require('mongoose');
var enfant = require('../models/enfant.js').enfant;
var section = require('../models/section.js').section;

var testEnfant, testSection;
var date = new Date();

describe('Enfant model unit tests:', function() {
	beforeEach(function(done) {
		testSection = new section({
			nom : 'test6'
		});

		testEnfant = new enfant({
			nom : 'test1',
			prenom : 'test2',
			totem : 'test3',
			sexe : 'test4',
			date : date,
			section : testSection,
			commentaire : 'test5'
		});
		done();
	});

	describe('Save', function(done) {
		it('should be able to be saved', function() {
			testEnfant.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should require name values', function() {
			testEnfant.nom = '';
			testEnfant.prenom = '';
			testEnfant.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should require base values', function() {
			testEnfant.sexe = '';
			testEnfant.date = null;
			testEnfant.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should require section value', function() {
			testEnfant.section = null;
			testEnfant.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should not require other values', function() {
			testEnfant.totem = '';
			testEnfant.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	describe('Get', function(done) {
		it('should be found', function() {
			enfant.findOne({nom: 'test1'}, function(err, enfantFound) {
				should.not.exist(err);
				done();
			});
		});

		it('should have the same values', function() {
			enfant.findOne({nom: '/test'}, function(err, enfantFound) {
				should.equal(enfantFound.nom, 'test1');
				should.equal(enfantFound.prenom, 'test2');
				should.equal(enfantFound.totem, 'test3');
				should.equal(enfantFound.sexe, 'test4');
				should.equal(enfantFound.date, date);
				should.equal(enfantFound.section.nom, 'test6');
				should.equal(enfantFound.commentaire, 'test5');
				done();
			});
		});
	})

	afterEach(function(done) {
		testEnfant.remove();
		done();
	});
});
