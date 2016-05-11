'use strict';

var should = require('should');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/db');
var section = require('../section.js').section;
var blog = require('../blog.js').blog;

var	testSection, testBlog;
var query;

describe('Blog model unit tests', function() {
	beforeEach(function() {
		testSection = new section({
			nom: 'test'
		});

		testBlog = new blog({
			titre: 'test1',
			body: 'test2',
			section: testSection.id
		});
	});

	describe('Create', function() {
		it('should be able to be saved', function(done) {
			testSection.save();
			testBlog.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	describe('Read', function() {
		it('should be found', function(done) {
			testSection.save();
			testBlog.save();
			query = blog.findOne({titre : 'test1'});
			query.exec(function(err, blogFound) {
				if(err) console.log(err);
				should.exist(blogFound);
				done();
			});
		});

		it('should have the same values', function(done) {
			testSection.save();
			testBlog.save();
			query = blog.findOne({titre : 'test1'});
			query.exec(function(err, blogFound) {
				if(err) console.log(err);
				should.equal(blogFound.titre, 'test1');
				should.equal(blogFound.body, 'test2');
				query = section.findById(testSection.id);
				query.exec(function(err, sectionFound) {
					if (err) console.log(err);
					should.equal(sectionFound.nom, 'test');
					done();
				});
			});
		});

		it('should have default values', function(done) {
			testSection.save();
			testBlog.save();
			query = blog.findOne({titre : 'test1'});
			query.exec(function(err, blogFound) {
				if(err) console.log(err);
				blogFound.date.getTime().should.be.within(Date.now()-100000, Date.now()+100000);
				done();
			});
		});
	});

	describe('Update', function() {
		it('should be able to update documents', function(done) {
			testSection.save();
			testBlog.save();
			blog.update({titre: 'test1'}, {body: 'test3'}, function(err) {
				if(err) console.log(err);
			});
			query = blog.findOne({titre : 'test1'});
			query.exec(function(err, blogFound) {
				if(err) console.log(err);
				should.equal(blogFound.body, 'test3');
				done();
			});
		});
	});

	describe('Remove', function() {
		it('should be able to be removed', function(done) {
			testSection.save();
			testBlog.save();
			section.remove({nom: 'test'}, function(err) {
				should.not.exist(err);
			});
			blog.remove({titre: "test1"}, function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function() {
		section.remove({nom: 'test'}, function(err) {
			if (err) console.log(err);
		});
		blog.remove({titre: "test1"}, function(err) {
			if (err) console.log(err);
		});
	});
});
