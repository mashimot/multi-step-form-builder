(function() {
    'use strict';
    angular.module('survey')
        .directive('surveyBuilder', surveyBuilder);
    function surveyBuilder(){
        return {
            restrict: 'E',
            templateUrl: '../survey/client/builder/views/builder.html'
        }
    }
}());
