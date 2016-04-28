'use strict';

var should = require('should');
var mongoose = require('mongoose');
var page = require('../models/page.js').page;

var testPage;

describe('Page model unit tests:', function() {
	beforeEach(function(done) {
		testPage = new page({
			nom: '/',
			titre: 'Accueil'
		});
		done();
	});

	describe('Save', function() {
		it('should be able to be saved', function () {
			testPage.save(function(err) {
				should.not.exist(err);
				done();
			});
		});


	});

	aferEach(function(done) {
		testPage.remove().exec();
		done();
	});
})
