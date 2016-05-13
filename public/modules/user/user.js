'use strict';

var app = angular.module('user', ['ui.router']);

app.config(function($stateProvider){
	$stateProvider
	.state('user',{
		url:'/user',
		templateUrl: 'modules/user/views/list.html',
		controller : 'list'
	})

	//Dashboard
	.state('dashboard',{
		url:'/dashboard',
		templateUrl:'modules/user/views/dashboard.html',
		controller : 'dashboard'
	});
});

//Récupère les infos pour le dashboard
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

app.controller('list', [ '$scope', '$http',
	function($scope, $http){
		$http.get('/api/user')
		.then(function(reponse){
			$scope.user = reponse.data;
		});
	}
]);