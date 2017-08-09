angular.module('app')
    .directive('hideWhenTab', function(){
        return {
            templateUrl: "../views/modal/is-hide-when.html",
            scope: {
                content: '='
            },
            link: function($scope){

            }

        }
    });