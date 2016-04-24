'use strict';

var app = angular.module('myApp', ['ui.router','module']);

//Routage coté client
app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/euh');
    $stateProvider
	//Page d'accueil

	//Connexion


	//Contact


	//Blog



});

//Récupère la liste des sections + les données de l'utilisateur connecté


//Controlleur accueil


//Contact


//Controlleur dashboard
/*app.controller('dashboard', function($scope, $http){
	$http.get('/api/dashboard').then(function(reponse){
		$scope.enfant = reponse.data;
	});
});*/




app.controller('contact',function($rootScope, $scope, $http){
	$rootScope.header = "Contact";
    $http.get('/api/contact')
    .then(function(reponse){
        $scope.page = reponse.data;
    });
});


