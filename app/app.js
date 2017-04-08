'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute',
    'as.sortable',
    'ui.bootstrap'
]).config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'create/create.html'
    })
})