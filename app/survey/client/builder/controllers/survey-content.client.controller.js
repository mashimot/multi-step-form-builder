(function() {
    'use strict';
    angular.module('survey')
        .controller('SurveyContentController', SurveyContentController);

    SurveyContentController.$inject = ['$scope', 'InputService', 'SurveyFactory', 'Logger'];

    function SurveyContentController($scope, InputService, SurveyFactory, Logger){
        var vm            = this;
        vm.addToListInput = addToListInput;
        vm.deleteContent  = deleteContent;

        function addToListInput(content){
            var scopeInputs         = InputService.getScopeInput();
            console.log(scopeInputs);
            var newInputList         = {};
            newInputList.description = content.description;
            newInputList.input       = content.input;
            newInputList.name        = content.name;
            newInputList.tempId      = content._id;
            newInputList.newInput    = true;
            scopeInputs.push(newInputList);
        }
        function deleteContent(surveyId, contentId){
            SurveyFactory.deleteContent( surveyId, contentId ).then(function(data){
                if(data.success){
                    $scope.vmSurvey.activate();
                    Logger.info(data.message);
                }
            });
        }
    }
}());
