create.directive('renderInputs',  function(){
    return {
        template: '<div class="disable-all-contents"><div class="form-group"><ng-include src="getInputTemplate()"/></div></div>',
        scope: {
            input: '=input'
        },
        restrict: 'E',
        controller: function($scope) {
            //function used on the ng-include to resolve the template
            $scope.getInputTemplate = function() {
                //return '../templates/inputs/' + $scope.input.type + '.html' || '../templates/inputs/default.html';
                return 'input-' + $scope.input._type + '-template.html';
            }
        }
    };
});
create.directive('surveyContent',  function(){
    return {
        restrict: 'E',
        templateUrl: '../views/survey/content.html'
    }
});
create.directive('surveyBuilder',  function(){
    return {
        restrict: 'E',
        templateUrl: '../views/survey/builder.html'
    }
});