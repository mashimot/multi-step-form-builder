    angular.module('app')
    .directive('generalTab', function(){
        return {
            templateUrl: '../views/modal/general-config.html',
            scope: {
                content: '=content',
                formName: '=formName'
            },
            link: function(){

            }
        }
    });