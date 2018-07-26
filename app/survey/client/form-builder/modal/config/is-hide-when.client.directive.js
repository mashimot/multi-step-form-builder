(function(){
    'use strict';
    angular.module('survey')
        .directive('hideWhenTab', function(){
            return {
                templateUrl: '../survey/client/form-builder/modal/config/is-hide-when.html',
                scope: {
                    content: '='
                },
                link: function($scope){

                }

            }
        });
}());
