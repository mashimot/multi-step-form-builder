(function() {
    'use strict';
    angular.module('survey')
        .directive('renderContent', renderContent);
    renderContent.$inject = ['$uibModal', 'SurveyFactory', 'InputService', 'TabService', 'Notification'];

    function renderContent($uibModal, SurveyFactory, InputService, TabService, Notification){
        return {
            templateUrl: '../survey/client/builder/views/content.html',
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
            link: function(scope){
                scope.idSelected = null;
                scope.addToListInput = addToListInput;
                scope.deleteContent = deleteContent;
                scope.editContent = editContent;

                function addToListInput(input, description){
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
                function deleteContent(surveyId, contentId){
                    SurveyFactory.deleteContent( surveyId, contentId ).then(function(data){
                        if(data.success){
                            scope.$parent.vm.updateSurvey(scope.$parent.vm.activeTabIndex);
                            Notification.info(data.message);
                        }
                    });
                }
                function editContent(pageContent){
                    var render = TabService.render();
                    var type = pageContent.input.type;
                    var tabToRender = render[type];

                    if(tabToRender !== undefined){
                        var modalInstance = $uibModal.open({
                            templateUrl: 'configTemplate.html',
                            controller: ConfigModalController,
                            resolve: {
                                render: function(){
                                    return tabToRender;
                                },
                                pageContent: function () {
                                    return pageContent;
                                },
                                SurveyFactory: function () {
                                    return SurveyFactory;
                                }
                            },
                            backdrop : true,
                            keyboard : true,
                            backdropClick : true,
                            size : 'lg',
                            animation: false
                        });
                        modalInstance.result.then(function(message){
                            scope.$parent.vm.updateSurvey(scope.$parent.vm.activeTabIndex);
                            Notification.info(message);
                        });
                    } else {
                        alert('Template not Founded!');
                    }
                }
            }
        };
    }
    var ConfigModalController = function ($scope, $uibModalInstance, render, pageContent, SurveyFactory) {
        var isChanged = false;

        $scope.content = angular.copy(pageContent);
        $scope.render = [];
        $scope.render = render;
        $scope.ok = ok;
        $scope.cancel = cancel;

        //look at TabService, hide some inputs
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
        function ok(isFormValid){
            if(isChanged && isFormValid){
                updateContent();
            }
            if(!isChanged){
                $uibModalInstance.dismiss();
            }
        }
        function cancel(){
            $uibModalInstance.dismiss();
        }
        function updateContent(){
            var result = {
                id: $scope.content._id,
                content: $scope.content
            };
            SurveyFactory.updateContent(null, result.id, result.content ).then(function(data){
                if(data.success){
                    $uibModalInstance.close(data.message);
                }
            });
        }
    };

}());

