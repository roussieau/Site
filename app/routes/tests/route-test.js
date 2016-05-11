'use strict';

var should = require('should');
var request = require('supertest');
var app = require('../../app.js');
var server = request.agent(app);

describe('Router unit tests', function() {
	describe('All', function() {
		it('should be able to login', function(done) {
			server.post('/api/connexion/login')
				.send({username: 'admin@gmail.com', password: 'ingi'})
				.expect(302)
				.expect('Location', '/')
				.end(done);
		});
	});

	describe('Index', function() {
		it('should respond', function(done) {
			server.get('/api')
				.expect(200)
				.end(done);
		});
	});

	describe('Contact', function() {
		it('should respond', function(done) {
			server.get('/api/contact')
				.expect(200)
				.end(done);
		});
	});

	describe('Connexion', function() {
		it('should respond', function(done) {
			server.get('/api/Connexion')
				.expect(200)
				.end(done);
		});
	});

	describe('Dashboard', function() {
		it('should respond', function(done) {
			server.get('/api/dashboard')
				.expect(200)
				.end(done);
		});
	});

	describe('Enfant', function() {
		it('should respond', function(done) {
			server.get('/api/enfant')
				.expect(302)
				.end(done);
		});
	});

	describe('Section', function() {
		it('should respond', function(done) {
			server.get('/api/section')
				.expect(302)
				.end(done);
		});
	});

	describe('User', function() {
		it('should respond', function(done) {
			server.get('/api/user')
				.expect(302)
				.end(done);
		});
	});
});
