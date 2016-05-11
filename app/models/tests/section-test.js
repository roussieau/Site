'use strict';

var should = require('should');
var mongoose = require('mongoose');
var section = require('../models/section.js').section;

var	testSection;
var query;

describe('Section model unit tests', function() {
	beforeEach(function() {
		testSection = new section({
			nom: 'test'
		});
	});

	describe('Create', function() {
		it('should be able to be saved', function(done) {
			testSection.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	describe('Read', function() {
		it('should be found', function(done) {
			testSection.save();
			query = section.findOne({nom : 'test'});
			query.exec(function(err, sectionFound) {
				if(err) console.log(err);
				should.exist(sectionFound);
				done();
			});
		});

		it('should have the same values', function(done) {
			testSection.save();
			query = section.findOne({nom : 'test'});
			query.exec(function(err, sectionFound) {
				if(err) console.log(err);
				should.equal(sectionFound.nom, 'test');
				done();
			});
		});
	});

	describe('Update', function() {
		it('should be able to update documents', function(done) {
			testSection.save();
			section.update({nom: 'test'}, {nom: 'test2'}, function(err) {
				if(err) console.log(err);
			});
			query = section.findOne({nom : 'test2'});
			query.exec(function(err, sectionFound) {
				if(err) console.log(err);
				should.exist(sectionFound);
				done();
			});
		});
	});

	describe('Remove', function() {
		it('should be able to be removed', function(done) {
			testSection.save();
			section.remove({nom: 'test'}, function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function() {
		section.remove({nom: 'test'}, function(err) {
			if (err) console.log(err);
		});
	});
});
