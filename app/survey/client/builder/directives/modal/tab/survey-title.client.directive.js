(function() {
    'use strict';
    angular.module('survey')
        .directive('titleTab', function(){
            return {
                templateUrl: '../survey/client/builder/views/modal/title.html',
                scope: {
                    content: '=',
                    formName: '=formName'
                },
                link: function($scope){
                }
            }
        });
}());
