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

    //Ajouter un enfant
    .state('enfant.add',{
    	url:'/add',
    	templateUrl:'modules/enfant/views/addEnfant.html',
    	controlleur:'addEnfant' 
    });

    //Modifier un enfant
});

//Controlleur Enfant.list

//Controlleur Enfant.add

//Controlleur Enfant.edit