'use strict';

var app = angular.module('contact', ['ui.router']);

app.config(function($stateProvider) {
    $stateProvider
    //Page de contact
	
    .state('contact', {
        url: '/contact',
        templateUrl: 'modules/contact/views/contactPage.html',
        controller: 'contact'
    })
    //Edition de la page de contact
	.state('contact.edit', {
        url: '/edit',
        templateUrl: 'modules/contact/views/contactEdit.html',
        controller: 'contactEdit'
    });
});

//Contrôleurs
app.controller('contact', ['$scope', '$http',
    function($scope, $http){
    	$http.get('/api/contact')
    	.then(function(reponse){
    		$scope.titre = reponse.data.titre;
    		$scope.body = reponse.data.body;
    	});
    }
]);
//Edition
app.controller('contactEdit',['$location', '$scope', '$http',
    function($location, $scope, $http){
    	$http.get('/api/contact').
    	then(function(reponse){
    		$scope.titre = reponse.data.titre;
    		$scope.body = reponse.data.body;
    	});
    	$scope.edit = function(){
    		$http.post('/api/contact/edit', {titre : $scope.titre, body : $scope.body})
    		.then(function(){
    			$location.path('/contact');
    		});
    	};
    }
]);
