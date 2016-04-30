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

	describe('Save', function() {
		it('should be able to be saved', function() {
			testPage.save(function(err) {
				should.not.exist(err);
			});
		});
	});

	describe('Get', function() {
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
	})

	afterEach(function() {
		testPage.remove();
	});
});
