'use strict';

var app = angular.module('myApp', ['ui.router']);

//Routage coté client
app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/euh');

    $stateProvider
	//Page d'accueil
    .state('home', {
        url: '/',
        templateUrl: '../views/page.html',
        controller: 'home'
    })
	.state('homeEdit',{
		url:'/edit',
		templateUrl: '../views/editPage.html',
		controller: 'edit'
	})

	//Connexion
    .state('login', {
        url: '/login',
        templateUrl: '../views/login.html'
    })
    .state('contact', {
        url: '/contact',
        templateUrl: '../views/page.html',
        controller: 'contact'
    });
	
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});

//Récupère la liste des sections + les données de l'utilisateur connecté
app.controller('menu', function($rootScope, $scope, $http){
	$http.get('/api/get')
	.then(function(reponse){
		$scope.section = reponse.data.section;
		$rootScope.user = reponse.data.user;
	});
});

//Récupère les infos de la page d'accueil
app.controller('home',function($scope, $http, $rootScope){
    $http.get('/api')
    .then(function(reponse){
        $rootScope.header = "Accueil";
        $scope.page = reponse.data;
    });
});

app.controller('edit', function($http, $location, $scope){
	console.log("test");
	$http.get('/api')
	.then(function(reponse){
		$scope.page = reponse.data;
	});
	$scope.edit = function(){
		$http.post('/api/edit', $scope.edit)
		.then(function(reponse){
			$location.path('/');
		});
	};
});

app.controller('contact',function($rootScope, $scope, $http){
	$rootScope.header = "Contact";
    $http.get('/api/contact')
    .then(function(reponse){
        $scope.page = reponse.data;
    });
});

app.controller('login', function($rootScope, $scope, $http, $location){
	$scope.connection = function(){
		$http.post('/api/login', $scope.log)
		.then(function(reponse){
			$rootScope.user = reponse.data;
			$location.path('/');
		});
	};
});
