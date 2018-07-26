(function() {
    'use strict';
    angular.module('survey')
        .directive('generalTab', function () {
            return {
                templateUrl: '../survey/client/form-builder/modal/config/config.general.html',
                scope: {
                    content: '=content',
                    formName: '=formName'
                },
                link: function () {

                }
            }
        });
}());