'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute',
    'ngMessages',
    'theme.switcher',
    'ui.sortable',
    'ui.bootstrap'
]).config(function($routeProvider, $locationProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/survey/new.html',
        controller: 'CreateController'
    }).when('/survey/:surveyId', {
        templateUrl: 'views/survey/create.html',
        controller: 'SurveyController'
    })
});