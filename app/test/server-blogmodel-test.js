'use strict';

var should = require('should');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/db');
var section = require('../models/section.js').section;
var blog = require('../models/blog.js').blog;

var	testSection, testBlog;
var query;

describe('Blog model unit tests', function() {
	beforeEach(function() {
		testSection = new section({
			nom: 'test'
		});
		testSection.save();

		testBlog = new blog({
			titre: 'test1',
			body: 'test2',
			section: testSection.id
		});
	});

	describe('Save', function() {
		it('should be able to be saved', function() {
			testBlog.save(function(err) {
				should.not.exist(err);
			});
		});
	});

	describe('Get', function() {
		it('should be found', function(done) {
			testBlog.save();
			query = blog.findOne({titre : 'test1'});
			query.exec(function(err, blogFound) {
				if(err) console.log(err);
				should.exist(blogFound);
				done();
			});
		});

		it('shoud have the same values', function(done) {
			testBlog.save();
			query = blog.findOne({titre : 'test1'});
			query.exec(function(err, blogFound) {
				if(err) console.log(err);
				should.equal(blogFound.titre, 'test1');
				should.equal(blogFound.body, 'test2')
				query = section.findById(testSection.id);
				query.exec(function(err, sectionFound) {
					if (err) console.log(err);
					should.equal(sectionFound.nom, 'test');
					done();
				});
			});
		});

		it('should have default values', function(done) {
			testBlog.save();
			query = blog.findOne({titre : 'test1'});
			query.exec(function(err, blogFound) {
				if(err) console.log(err);
				blogFound.date.getTime().should.be.within(Date.now()-10000000, Date.now()+10000000);
				done();
			});
		});
	})

	afterEach(function() {
		testBlog.remove();
		testSection.remove();
	});
});
