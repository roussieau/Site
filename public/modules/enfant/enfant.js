'use strict';

var app = angular.module('enfant', ['ui.router']);

app.config(function($stateProvider) {
    $stateProvider
    .state('enfant',{
		abstract: true,
		url: '/enfant',
		template: '<ui-view></ui-view>'
    })
    //Lister les enfants
    .state('enfant.list', {
        url: '',
        templateUrl : 'modules/enfant/views/enfant.html',
        controller : 'enfantList'
    })

    //Ajouter un enfant
    .state('enfant.add',{
    	url:'/add',
    	templateUrl:'modules/enfant/views/addEnfant.html',
    	controller:'addEnfant' 
    });

    //Modifier un enfant
});

//Controlleur Enfant.list
app.controller('enfantList', ['$scope', '$http',
    function($scope, $http){
        $http.get('/api/enfant/')
        .then(function(reponse){
            $scope.enfant = reponse.data;
        });
    }
]);

//Controlleur Enfant.add
app.controller('addEnfant', ['$http', '$scope', '$location',
    function($http, $scope, $location){
        $http.get('/api/section')
        .then(function(reponse){
            $scope.section = reponse.data;
        });
        $scope.add = function(){
            $http.post('/api/enfant/add', $scope.enfant)
            .then(function(reponse){
                $location.path('/');
            });
        };
    }
]);


//Controlleur Enfant.edit