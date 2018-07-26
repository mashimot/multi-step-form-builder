(function () {
    'use strict';

    angular
        .module('survey.routes', [])
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('survey', {
                abstract: true,
                url: '/survey',
                template: '<div ui-view></div>'
            })
            .state('survey.new', {
                url: '',
                templateUrl: 'survey/client/form-builder/form-new/form-new.html',
                controller: 'FormNewController',
                controllerAs: 'vm'
            })
            .state('survey.builder', {
                url: '/:surveyId',
                templateUrl: 'survey/client/form-builder/form-builder.html'

            })
    }
}());
