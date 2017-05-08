app.directive('renderInputs',  function(){
    return {
        template: '<div class="disable-all-contents"><div class="form-group"><ng-include src="getInputTemplate()"/></div></div>',
        scope: {
            input: '=input'
        },
        restrict: 'E',
        controller: function($scope) {
            //function used on the ng-include to resolve the template
            $scope.getInputTemplate = function() {
                return 'input-' + $scope.input.type + '-template.html';
            }
        }
    };
}).directive('surveyContent',  function(){
    return {
        restrict: 'E',
        templateUrl: '../views/survey/content.html'
    }
}).directive('surveyBuilder',  function(){
    return {
        restrict: 'E',
        templateUrl: '../views/survey/builder.html'
    }
});