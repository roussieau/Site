'use strict';

var should = require('should');
var mongoose = require('mongoose');
var page = require('../models/page.js').page;

var testPage;

describe('Page model unit tests:', function() {
	beforeEach(function(done) {
		testPage = new page({
			nom: '/test',
			titre: 'Accueil'
		});
		done();
	});

	describe('Save', function(done) {
		it('should be able to be saved', function() {
			testPage.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	describe('Get', function(done) {
		it('should be found', function() {
			page.findOne({nom: '/test'}, function(err, pageFound) {
				should.not.exist(err);
				done();
			});
		});

		it('should have the same values', function() {
			page.findOne({nom: '/test'}, function(err, pageFound) {
				should.equal(pageFound.nom, '/test');
				should.equal(pageFound.titre, 'Accueil');
				done();
			});
		});
	})

	afterEach(function(done) {
		testPage.remove();
		done();
	});
});
