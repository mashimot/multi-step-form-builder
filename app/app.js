'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute',
    'ui.sortable',
    'ui.bootstrap',
]).config(function($routeProvider, $locationProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/survey/new.html',
        controller: 'createCtrl'
    }).when('/survey/:surveyId', {
        templateUrl: 'views/survey/create.html',
        controller: 'surveyCtrl'
    });
    //$locationProvider.html5Mode(true);

})