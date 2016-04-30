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

	describe('Save', function() {
		it('should be able to be saved', function() {
			testSection.save(function(err) {
				should.not.exist(err);
			});
		});
	});

	describe('Get', function() {
		it('should be found', function(done) {
			testSection.save();
			query = section.findOne({nom : 'test'});
			query.exec(function(err, sectionFound) {
				if(err) console.log(err);
				should.exist(sectionFound);
				done();
			});
		});

		it('shoud have the same values', function(done) {
			testSection.save();
			query = section.findOne({nom : 'test'});
			query.exec(function(err, sectionFound) {
				if(err) console.log(err);
				should.equal(sectionFound.nom, 'test');
				done();
			});
		});
	})

	afterEach(function() {
		testSection.remove();
	});
});
