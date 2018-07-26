(function() {
    'use strict';
    angular.module('survey')
        .directive('titleTab', function(){
            return {
                templateUrl: '../survey/client/form-builder/modal/config/title.html',
                scope: {
                    content: '=',
                    formName: '=formName'
                },
                link: function($scope){
                }
            }
        });
}());
