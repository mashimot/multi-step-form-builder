(function() {
    'use strict';
    angular.module('survey')
        .directive('inputMenu',  function(){
            return {
                templateUrl: '../survey/client/builder/views/input-menu.html',
                controller: function(){
                }
            }
        });
}());
