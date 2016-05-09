'use strict';

var app = angular.module('myApp', ['ui.router',
                                    'base',
                                    'contact',
                                    'connexion',
									'section',
                                    'enfant'
                                    ]);

app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {

$locationProvider.html5Mode(true);	
	$urlRouterProvider.otherwise('/login');
    $stateProvider
    //Page d'accueil
    .state('home', {
        url: '/',
        templateUrl: 'modules/home/views/homePage.html',
        controller: 'home'
    })
    //Edition de la page d'accueil
    .state('homeEdit',{
		url:'/edit',
		templateUrl: 'modules/home/views/homeEdit.html',
		controller: 'edit'
	});
});

//Controller
app.controller('home', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope){
        $http.get('/api')
        .then(function(reponse){
            $rootScope.header = "Accueil";
            $scope.page = reponse.data; //page.titre & page.body
        });
    }
]);

app.controller('edit', ['$location', '$scope', '$http',
    function($location, $scope, $http){
    	$http.get('/api').then(function(reponse){
    		$scope.titre = reponse.data.titre;
    		$scope.body = reponse.data.body;
    	});
    	$scope.edit = function(){
    		$http.post('/api', {titre : $scope.titre, body : $scope.body})
    		.then(function(reponse){
    			$location.path('/');
    		});
    	};
    }
]);
