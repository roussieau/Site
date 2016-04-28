'use strict';

var app = angular.module('user', ['ui.router']);

app.config(function($stateProvider) {
    $stateProvider
    //Bureau virtuel
    .state('dashboard',{
		url:'/dashboard',
		templateUrl:'modules/user/views/dashboard.html',
		controller: 'dashboard'
	})
    //Connexion
    .state('login', {
        url: '/login',
        templateUrl:'modules/user/views/login.html',
		controller: 'login'
    })
    //Déconnexion
	.state('logout',{
		url: 'logout',
		controller: 'logout'
	});
});

//Contrôleurs
app.controller('dashboard', ['$scope', '$http',
    function($scope, $http){
    	$http.get('/api/dashboard').then(function(reponse){
    		$scope.enfant = reponse.data;
    	});
    }
]);

//Connexion
app.controller('login', ['$rootScope', '$scope', '$http', '$location',
    function($rootScope, $scope, $http, $location){
    	$scope.connection = function(){
    		$http.post('/api/login', $scope.log)
    		.then(function(reponse){
    			$rootScope.user = reponse.data;
    			$location.path('/');
    		});
    	};
    }
]);

//Déconnexion
app.controller('logout', ['$http', '$location', '$rootScope',
    function($http, $location, $rootScope){
    	$http.get('/api/logout').then(function(){
    		$rootScope.user = null;
    		$location.path('/');
    	});
    }
]);
