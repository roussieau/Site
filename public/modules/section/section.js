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
		url: '/',
		templateUrl: 'modules/section/views/list.html',
		controller: 'list'
	})

	//Blog par section
    .state('section.blog',{
		url: '/:nom',
		templateUrl: 'modules/section/views/blog.html',
		controller : 'blog'
	});
});

//Contrôleurs
app.controller('blog', ['$scope', '$stateParams', '$http',
    function($scope, $stateParams, $http){
    	$http.get('/api/section/'+$stateParams.nom)
    	.then(function(reponse){
    		$scope.articles = reponse.data;
    	});
    	$scope.blog = {};
    	$scope.blog.nom = $stateParams.nom;
    	$scope.add = function(){
    		$http.post('/api/section/'+$stateParams.nom, $scope.blog)
    		.then(function(reponse){
    			$scope.message = "Article ajouté avec succès";
    		});
    	};
    }
]);

app.controller('list', ['$scope', '$http',
	function($scope, $http){
		$http.get('/api/section')
		.then(function(reponse){
			$scope.section = reponse.data;
		});
	}
]);
