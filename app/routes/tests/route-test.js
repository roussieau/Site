'use strict';

var should = require('should');
var request = require('supertest');
var app = require('../../../app.js');
var server = request.agent(app);

describe('Router unit tests', function() {
	describe('Connexion', function() {
		it('should respond', function(done) {
			server.get('/connexion/login')
				.expect(200)
				.end(done);
		});

		it('should be able to login', function(done) {
			server.post('/api/connexion/login')
				.send({email: 'admin@gmail.com', password: 'ingi'})
				.expect(200)
				.end(done);
		});
	});

	describe('Index', function() {
		it('should respond', function(done) {
			server.get('/')
				.expect(200)
				.end(done);
		});

		it('should be able to change', function(done) {
			server.post('/api')
				.send({titre: 'test', body: 'test'})
				.expect(200)
				.end(done);
		});
	});

	describe('Contact', function() {
		it('should respond', function(done) {
			server.get('/contact')
				.expect(200)
				.end(done);
		});

		it('should be able to change', function(done) {
			server.post('/api/contact/edit')
				.send({titre: 'test', body: 'test'})
				.expect(200)
				.end(done);
		});
	});

	describe('Section', function() {
		it('should respond', function(done) {
			server.get('/section')
				.expect(200)
				.end(done);
		});

		it('should get a specific section', function(done) {
			server.get('/section/Troupe%20de%20l\'Harmonie%20Insolite')
				.expect(200)
				.end(done);
		});
	});

});
