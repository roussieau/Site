'use strict';

var app = angular.module('user', ['ui.router']);

app.config(function($stateProvider) {
    $stateProvider
    //Dashboard
    .state('dashboard',{
		url:'/dashboard',
		templateUrl:'modules/user/views/dashboard.html',
		controller: 'dashboard'
	})
    //Login
    .state('login', {
        url: '/login',
        templateUrl:'modules/user/views/login.html',
		controller: 'login'
    })
    //Logout
	.state('logout',{
		url: '/logout',
		controller: 'logout'
	})
	//signup
	.state('signup',{
		url: '/signup',
		templateUrl: 'modules/user/views/signup.html',
		controller: 'signup'
	});
});

//Dashboard
app.controller('dashboard', ['$scope', '$http',
    function($scope, $http){
    	$http.get('/api/dashboard').then(function(reponse){
    		$scope.enfant = reponse.data;
    	});
    }
]);

//Login
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

//Logout
app.controller('logout', ['$http', '$location', '$rootScope',
    function($http, $location, $rootScope){
    	$http.get('/api/logout').then(function(){
    		$rootScope.user = null;
    		$location.path('/');
    	});
    }
]);

app.controller('signup', ['$http', '$location', '$scope', 
	function($http, $location, $scope){
		$scope.inscription= function(){
			console.log("On rentre dans la fonction");
			console.log($scope.info.mail);
			$http.post('/api/signup', $scope.info).then(function(user){
				console.log(user.data);
				$location.path('/');
			}, function(){
				console.log("bad");
			});
		};
	}
]);
