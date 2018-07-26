(function() {
    'use strict';
    angular.module('survey')
        .controller('SurveyContentController', SurveyContentController);

    SurveyContentController.$inject = ['$scope', 'InputService', 'PageFactory', 'DataFactory', 'Logger', '$stateParams', 'SortableService'];

    function SurveyContentController($scope, InputService, PageFactory, DataFactory, Logger, $stateParams, SortableService ){
        var surveyId = $stateParams.surveyId;
        var vmData            = this;
        vmData.number         = 0;
        vmData.addToListInput = addToListInput;
        vmData.deleteContent  = deleteContent;
        //vmData.countInit      = countInit;

        vmData.sortableContent  = {
            placeholder: 'ui-state-highlight',
            update: function(event, ui){
                var new_position = ui.item.sortable.dropindex;
                var old_position = ui.item.sortable.index;
                var model = ui.item.sortable.model;
                var pageId = ui.item.sortable.droptarget.scope().page._id;
                //var pageId = ui.item.sortable.droptarget.scope().currentPage._id;
                var data = {};
                data.new_position = new_position;
                data.old_position = old_position;
                data.content = (!SortableService.getObjectToDrop())? model: SortableService.getObjectToDrop();

                PageFactory.savePerPage(surveyId, pageId, data).then(function(data){
                    if(data.success){
                        $scope.$parent.vmPage.activate();
                        Logger.success(data.message);
                    }
                    SortableService.setObjectToDrop(false);
                });
            },
            start: function(event, ui){
                ui.item.toggleClass("highlight");
            },
            stop: function(event, ui){
                ui.item.toggleClass("highlight");
            }
        };

        function countInit(type) {
            //question number, if the type is title, the count is not calculated
            if(type !== 'title'){
                return vmData.number++;
            }
        }

        function addToListInput(content){
            var scopeInputs         = InputService.getScopeInput();
            var newInputList         = {};
            newInputList.description = content.description;
            newInputList.input       = content.input;
            newInputList.name        = content.name;
            newInputList.tempId      = content._id;
            newInputList.newInput    = true;
            scopeInputs.push(newInputList);
        }

        function deleteContent(surveyId, contentId){
            DataFactory.deleteContent( surveyId, contentId ).then(function(data){
                if(data.success){
                    $scope.vmPage.activate();
                    Logger.info(data.message);
                }
            });
        }
    }
}());
