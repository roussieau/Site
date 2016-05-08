'use strict';

var should = require('should');
var mongoose = require('mongoose');
var page = require('../models/page.js').page;

var testPage;
var query;

describe('Page model unit tests:', function() {
	beforeEach(function() {
		testPage = new page({
			nom: 'test',
			titre: 'Accueil'
		});
	});

	describe('Create', function() {
		it('should be able to be saved', function(done) {
			testPage.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	describe('Read', function() {
		it('should be found', function(done) {
			testPage.save();
			query = page.findOne({nom: 'test'});
			query.exec(function(err, pageFound) {
				if (err) console.log(err);
				should.exist(pageFound);
				done();
			});
		});

		it('should have the same values', function(done) {
			testPage.save();
			query = page.findOne({nom: 'test'});
			query.exec(function(err, pageFound) {
				if (err) console.log(err);
				should.equal(pageFound.nom, 'test');
				should.equal(pageFound.titre, 'Accueil');
				done();
			});
		});
	});

	describe('Update', function() {
		//TODO: add update
	});

	describe('Remove', function() {
		it('should be able to be removed', function(done) {
			testPage.save();
			page.remove({nom: 'test'}, function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function() {
		page.remove({nom: 'test'}, function(err) {
			if (err) console.log(err);
		});
	});
});
