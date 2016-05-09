'use strict';

var should = require('should');
var request = require('supertest');

request = request('http://localhost:3000');

describe('Router unit tests', function() {
	describe('Index', function() {
		it('should respond', function(done) {
			request.get('/')
				.expect(200, done);
		});
	});

	describe('Contact', function() {
		it('should respond', function(done) {
			request.get('/contact')
				.expect(200, done);
		});
	});

	describe('Dashboard', function() {
		it('should respond', function(done) {
			request.get('/dashboard')
				.expect(200, done);
		});
	});

	describe('Enfant', function() {
		it('should respond', function(done) {
			request.get('/enfant')
				.expect(200, done);
		});
	});

	describe('Login', function() {
		it('should respond', function(done) {
			request.get('/login')
				.expect(200, done);
		});
	});

	describe('Logout', function() {
		it('should respond', function(done) {
			request.get('/logout')
				.expect(200, done);
		});
	});

	describe('Section', function() {
		it('should respond', function(done) {
			request.get('/section')
				.expect(200, done);
		});
	});

	describe('Set', function() {
		it('should respond', function(done) {
			request.get('/set')
				.expect(200, done);
		});
	});

	describe('Signup', function() {
		it('should respond', function(done) {
			request.get('/signup')
				.expect(200, done);
		});
	});

	describe('User', function() {
		it('should respond', function(done) {
			request.get('/user')
				.expect(200, done);
		});
	});
});
