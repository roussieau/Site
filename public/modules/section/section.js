'use strict';

var app = angular.module('section', ['ui.router']);

app.config(function($stateProvider) {
    $stateProvider
    .state('blog',{
		url: '/:nom',
		templateUrl: 'modules/section/views/blog.html',
		controller : 'blog',
	});
});

//Contrôleurs
app.controller('blog', ['$scope', '$stateParams',
    function($scope, $stateParams){
    	$scope.test = $stateParams.nom;
    }
]);