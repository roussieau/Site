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

	//Dashboard
	.state('dashboard',{
		url:'/dashboard',
		templateUrl:'../views/dashboard.html',
		controller: 'dashboard'
	})

	//Connexion
    .state('login', {
        url: '/login',
        templateUrl: '../views/login.html'
    })

	.state('logout',{
		url: '/logout',
		controller: 'logout'
	})

	//Contact
	.state('contact', {
        url: '/contact',
        templateUrl: '../views/page.html',
        controller: 'contact'
    })
	.state('contactEdit', {
        url: '/contact/edit',
        templateUrl: '../views/editPage.html',
        controller: ''
    })
	
	//Blog
	.state('blog',{
		url(/:nom),
		templateUrl: 'blog',
		controller : 'blog',
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

//Controlleur accueil
app.controller('home',function($scope, $http, $rootScope){
    $http.get('/api')
    .then(function(reponse){
        $rootScope.header = "Accueil";
        $scope.page = reponse.data;
		$scope.edit = "/edit";
    });
});

app.controller('edit',['$location', '$scope', '$http', function($location, $scope, $http){
	$http.get('/api').then(function(reponse){
		$scope.titre = reponse.data.titre;
		$scope.body = reponse.data.body;
	});
	$scope.edit = function(){
		$http.post('/api', {titre : $scope.titre, body : $scope.body})
		.then(function(reponse){
			console.log(reponse);
			$location.path('/');
		});
	};
}]);

//Controlleur dashboard
app.controller('dashboard', function($scope, $http){
	$http.get('/api/dashboard').then(function(reponse){
		$scope.enfant = reponse.data;
	});
});

app.controller('blog', function(){

});


app.controller('contact',function($rootScope, $scope, $http){
	$rootScope.header = "Contact";
    $http.get('/api/contact')
    .then(function(reponse){
        $scope.page = reponse.data;
    });
});

//Connexion
app.controller('login', function($rootScope, $scope, $http, $location){
	$scope.connection = function(){
		$http.post('/api/login', $scope.log)
		.then(function(reponse){
			$rootScope.user = reponse.data;
			$location.path('/');
		});
	};
});

//Déconnexion
app.controller('logout', function($http, $location, $rootScope){
	$http.get('/api/logout').then(function(){
		$rootScope.user = null;
		$location.path('/');
	});	
});
