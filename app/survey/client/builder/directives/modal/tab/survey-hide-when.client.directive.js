(function(){
    'use strict';
    angular.module('survey')
        .directive('hideWhenTab', function(){
            return {
                templateUrl: '../survey/client/builder/views/modal/is-hide-when.html',
                scope: {
                    content: '='
                },
                link: function($scope){

                }

            }
        });
}());
