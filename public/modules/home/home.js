'use strict';

var app = angular.module('home', ['ui.router']);

app.config(function($stateProvider) {
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
app.controller('home', ['$scope', '$http', '$rootScope', '$sce',
    function($scope, $http, $rootScope, $sce){
        $http.get('/api')
        .then(function(reponse){
            var page = {};
            $rootScope.header = "Accueil";
            page.titre = reponse.data.titre;
            page.body = $sce.trustAsHtml(reponse.data.body);
            $scope.page = page;
        });
        $http.get('/api/section/all')
        .then(function(reponse){
            console.log(reponse.data);
            $scope.articles = reponse.data;
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
