'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute',
    'ui.sortable',
    'ui.bootstrap',
    'ngMaterial'
]).config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'create/create.html'
    })
})