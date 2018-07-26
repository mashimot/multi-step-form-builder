(function() {
    'use strict';
    angular.module('survey')
        .directive('formPages', formPages);
    function formPages(){
        return {
            restrict: 'E',
            templateUrl: '../survey/client/form-builder/form-pages/form-pages.html',
            controller: 'FormPageController',
            controllerAs: 'vmPage',
            bindToController: true
        }
    }
}());
