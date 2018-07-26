(function() {
    'use strict';
    angular.module('survey')
        .directive('surveyMenu',  function(){
            return {
                templateUrl: '../survey/client/form-builder/form-menu/form-menu.html',
                controller: 'FormMenuController',
                controllerAs: 'vmMenu',
            	bindToController: true
            }
        });
}());
