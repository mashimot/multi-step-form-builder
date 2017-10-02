(function() {
    'use strict';
    angular.module('survey')
        .directive('renderContent', renderContent);
    renderContent.$inject = [];

    function renderContent(){
        return {
            template: '<div ng-include src="template"></div>',
            //template: '<ng-include src="::getTemplateUrl()" />',
            scope: {
                content: '=content'
            },
            restrict: 'E',
            controller: function($scope) {
                var type = $scope.content.input.type;
                $scope.template = getTemplateUrl();
                function getTemplateUrl() {
                    return 'input-' + type + '-template.html';
                }
            }
        };
    }
}());
