(function() {
    'use strict';
    angular.module('survey')
        .directive('surveyInputMenu',  function(){
            return {
                templateUrl: '../survey/client/builder/views/input-menu.html',
                controller: function(){
                }
            }
        });
}());
