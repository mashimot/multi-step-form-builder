(function() {
    'use strict';
    // Declare app level module which depends on views, and components
    angular.module('app', [
        'angular.filter',
        'ngMessages',
        'blocks.logger',
        'checklist-model',
        'bind.html.compile',
        'theme.switcher',
        'ui.router',
        'ui.bootstrap',
        'survey',
        'survey.routes'
    ]);
    bootstrapConfig.$inject = ['$stateProvider'];
    function bootstrapConfig($stateProvider) {
        $stateProvider
            .state('/', {
                abstract: true,
                url: '/survey',
                template: '<div ui-view></div>'
            });
    }
}());