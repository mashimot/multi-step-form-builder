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
            };
            $scope.deleteContent = function(surveyId, contentId){
                SurveyFactory.deleteContent( surveyId, contentId ).then(function(response){
                    $scope.$parent.vm.updateSurvey($scope.$parent.vm.activeTabIndex);
                }, function(err){
                    console.log(err);
                });
            };
            $scope.edit = function(pageContent){
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


var ConfigModalController = function ($scope, $uibModalInstance, render, pageContent, SurveyFactory) {
    var isChanged = false;

    $scope.content = angular.copy(pageContent);
    $scope.render = [];

    //look at TabService, hide some inputs
    $scope.render = render;
    if(render.hide.length){
        for(var i = 0; i < render.hide.length; i++){
            $scope[render.hide[i]] = true;
        }
    }
    //verifica se houve alguma atualiazação no model
    $scope.$watch('content', function(newValue, oldValue) {
        if(angular.equals(newValue, angular.copy(pageContent))){
            isChanged = false;
        } else {
            isChanged = true;
        }
    }, true);
    //se houve atualização no model, faz o update; caso ao contrário fecha-se o modal.
    $scope.ok = function(isFormValid){
        if(isChanged && isFormValid){
            updateContent();
        }
        if(!isChanged){
            $uibModalInstance.close();
        }
    };
    $scope.cancel = function(){
        $uibModalInstance.dismiss();
    };
    var updateContent = function(){
        var result = {
            id: $scope.content._id,
            content: $scope.content
        };
        SurveyFactory.updateContent(null, result.id, result.content ).then(function(result){
            $uibModalInstance.close('success');
        }, function(err){
            console.log(err);
        });
    }
};
