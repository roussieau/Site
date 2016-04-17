'use strict';

var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: '../views/page.html',
        controller: 'home'
    })
    .state('login', {
        url: '/login',
        templateUrl: '../views/login.html'
    })
    .state('contact', {
        url: '/contact',
        templateUrl: '../views/page.html',
        controller: 'contact'
    });
});

app.controller('menu', function($scope, $http){
	$http.get('/api/getSection')
	.then(function(reponse){
		console.log(reponse);
		$scope.section = reponse.data;
	});
});

app.controller('home',function($scope, $http, $rootScope){
    $http.get('/api')
    .then(function(reponse){
        $rootScope.header = "Accueil";
        $scope.page = reponse.data;
    });
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
			$rootScope.user = reponse;
			$location.path('/');
		});
	};
});
