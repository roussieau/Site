'use strict';

var app = angular.module('base',[]);

//Chargement du menu
app.controller('menu', ['$scope', '$http',
	function($scope, $http){
		$http.get('/api/section')
		.then(function(reponse){
			$scope.section = reponse.data;
		});
	}
]);