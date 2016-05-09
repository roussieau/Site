'use strict';

var app = angular.module('base',[]);

//Chargement du menu
app.controller('menu', ['$scope', '$rootScope', '$http',
	function($scope, $rootScope, $http){
		//
		$http.get('/api/section')
		.then(function(reponse){
			$scope.section = reponse.data;
		});
		//On récupère l'état de l'utilisateur
		$http.get('/api/user/me')
		.then(function(reponse){
			$rootScope.user = reponse.data;
		});
	}
]);