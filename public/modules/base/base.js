'use strict';

var app = angular.module('base',[]);

//Chargement du menu
app.controller('menu', ['$rootScope', '$scope', '$http',
	function($rootScope, $scope, $http){
		$http.get('/api/get')
		.then(function(reponse){
			$scope.section = reponse.data.section;
			$rootScope.user = reponse.data.user;
		});
	}
]);