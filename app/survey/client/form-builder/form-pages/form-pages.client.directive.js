(function() {
    'use strict';
    angular.module('survey')
        .directive('surveyBuilder', surveyBuilder);
    function surveyBuilder(){
        return {
            restrict: 'E',
            templateUrl: '../survey/client/form-builder/form-pages/form-pages.html',
            controller: 'FormPageController',
            controllerAs: 'vmPage',
            bindToController: true
        }
    }
}());
