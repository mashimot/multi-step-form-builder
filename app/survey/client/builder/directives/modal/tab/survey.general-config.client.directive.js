        angular.module('survey')
    .directive('generalTab', function(){
        return {
            templateUrl: '../survey/client/builder/views/modal/general-config.html',
            scope: {
                content: '=content',
                formName: '=formName'
            },
            link: function(){

            }
        }
    });