'use strict';

var app = angular.module('user', ['ui.router']);

app.config(function($stateProvider){
	$stateProvider

	//Dashboard
	.state('dashboard',{
		url:'/dashboard',
		templateUrl:'modules/user/views/dashboard.html',
		controller : 'dashboard'
	});
});

app.controller('dashboard', [ '$scope', '$http',
	function($scope, $http){
		$http.get('/api/enfant/my')
		.then(function(reponse){
			$scope.enfant = reponse.data;
		});
		$http.get('/api/user/me')
		.then(function(reponse){
			$scope.user = reponse.data;
		});
	}
]);