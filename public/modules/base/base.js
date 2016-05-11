'use strict';

var app = angular.module('myApp', ['ui.router',,
                                   'contact',
                                   'connexion',
								   'section',
                                   'enfant',
                                   'home'
                                    ]);

app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {

	$locationProvider.html5Mode(true);	
	
	//Si l'url n'est pas connue 
	$urlRouterProvider.otherwise('/404');

	$stateProvider
	.state('404',{
		url:'/404',
		templateUrl: 'modules/base/views/404.html',
	});
});


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