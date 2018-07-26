(function() {
    'use strict';
    angular.module('survey')
        .directive('generalTab', function () {
            return {
                templateUrl: '../survey/client/form-builder/modal/config/general-config.html',
                scope: {
                    content: '=content',
                    formName: '=formName'
                },
                link: function () {

                }
            }
        });
}());