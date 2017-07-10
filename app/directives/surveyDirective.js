app.directive('renderContent', ['$uibModal', 'ModalService', 'SurveyFactory', 'InputService',  function($uibModal, ModalService, SurveyFactory, InputService){
    return {
        //template: '<div class="disable-all-contents"><div class="form-group"><ng-include src="getInputTemplate()"/></div></div>',
        templateUrl: '../views/survey/content.html',
        scope: {
            content: '=content',
            number: '=number'
        },
        restrict: 'E',
        controller: function($scope) {
            var type = $scope.content.input.type;
            $scope.getInputTemplate = function() {
                return 'input-' + type + '-template.html';
            }
        },
        controllerAs: 'vm',
        link: function($scope){
            $scope.addToListInput = function(input, description){
                var scopeInputs = InputService.getScopeInput();
                var len = scopeInputs.length - 1;
                scopeInputs[len].inputs.push({
                    newInput: true,
                    name: description,
                    content_to_drop: {
                        input: input
                    }
                });
            }
            $scope.deleteContent = function(surveyId, contentId){
                SurveyFactory.deleteContent( surveyId, contentId ).then(function(response){
                    $scope.$parent.vm.updateSurvey($scope.$parent.vm.activeTabIndex);
                }, function(err){
                    console.log(err);
                });
            };
            $scope.edit = function(pageContent){
                console.log();
                var templateToLoad = ModalService.getTemplateToLoad(pageContent);
                if(templateToLoad !== 'error'){
                    var modalInstance = $uibModal.open({
                        templateUrl: templateToLoad.templateUrl,
                        controller: templateToLoad.controller, //return a string and then converts to a function
                        resolve: templateToLoad.resolve,
                        animation: false
                    });
                    modalInstance.result.then(function(result){
                        console.log(result);
                        if(result === 'success'){
                            $scope.$parent.vm.updateSurvey($scope.$parent.vm.activeTabIndex);
                        }
                    });
                } else {
                    alert('Template not Founded!');
                }
            };
        }
    };

}]);
app.directive('surveyBuilder',  function(){
    return {
        restrict: 'E',
        templateUrl: '../views/survey/builder.html'
    }
});