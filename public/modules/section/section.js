'use strict';

var app = angular.module('section', ['ui.router']);

app.config(function($stateProvider) {
    $stateProvider
	.state('section',{
		url: '/section',
		abstract: true,
		template: '<ui-view />'
	})

	//Liste des sections
	.state('section.list',{
		url: '',
		templateUrl: 'modules/section/views/list.html',
		controller: 'list'
	})

	.state('section.absence', {
		url: '/absence',
		templateUrl : 'modules/section/views/absences.html',
		controller : 'absence'
	})

	//Blog par section
    .state('section.blog',{
		url: '/:nom',
		templateUrl: 'modules/section/views/blog.html',
		resolve : {
			auth : function($location, $rootScope, $http, $stateParams){
				var section;
				return $http.get('/api/section')
				.then(function(reponse){
					section = reponse.data;
					for(var i =0; i<section.length; i++){
						if(section[i].abr == $stateParams.nom)
							return;
					}
					return $location.path('/404');
				});
			}
		},
		controller : 'blog'
	});
	
	//Absences d'une section
	});

//Affiche le blog de la section
app.controller('blog', ['$scope', '$stateParams', '$http',
    function($scope, $stateParams, $http){
    	$http.get('/api/section/'+$stateParams.nom)
    	.then(function(reponse){
    		$scope.articles = reponse.data.blog;
    		$scope.description = reponse.data.description;
    		$scope.nom = reponse.data.nom;
    	});
    	$scope.blog = {};
    	$scope.blog.nom = $stateParams.nom;
    	$scope.add = function(){
    		$http.post('/api/section/'+$stateParams.nom, $scope.blog)
    		.then(function(reponse){
    			$scope.message = "Article ajouté avec succès";
    		});
    	};
    	$scope.edit = function(){
    		$http.put('/api/section/'+$stateParams.nom, {description : $scope.description});
    	};
    }
]);

//Liste des sections
app.controller('list', ['$scope', '$http',
	function($scope, $http){
		$http.get('/api/section')
		.then(function(reponse){
			$scope.section = reponse.data;
		});
	}
]);

app.controller('absence', ['$scope', '$http',
	function($scope, $http){
		$http.get('/api/enfant/thi')
		.then(function(reponse){
			$scope.enfant = reponse.data;
		});
	}
]);
