angular.module('app')
    .directive('titleTab', function(){
        return {
            templateUrl: "../views/modal/title.html",
            scope: {
                content: '=',
                formName: '=formName'
            },
            link: function($scope){
            }
        }
    });