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
                templateUrl: 'survey/client/new/views/new.html',
                controller: 'CreateController',
                controllerAs: 'vm'
            })
            .state('survey.builder', {
                url: '/:surveyId',
                templateUrl: 'survey/client/builder/views/create.html',
                controller: 'SurveyController',
                controllerAs: 'vmSurvey'

            })

    }
}());
