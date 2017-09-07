(function() {
    'use strict';
    angular.module('survey')
        .controller('InputMenuController', InputMenuController);

    InputMenuController.$inject = ['$scope', 'SortableService', 'InputService', 'SurveyFactory', 'Logger'];

    function InputMenuController($scope, SortableService, InputService, SurveyFactory, Logger){
        var vm = this;
        vm.Inputs = [];
        vm.Inputs = InputService.getInputs();
        vm.pushNewContent = pushNewContent;
        vm.removeInput = removeInput;
        vm.sortableContent = {
            connectWith: ".connected-apps-container",
            placeholder: 'ui-state-highlight',
            cancel: ".unsortable",
            update: function(event, ui) {
                if ( // ensure we are in the first update() callback
                !ui.item.sortable.received &&
                    // check that it's an actual moving between the two lists
                ui.item.sortable.source[0] !== ui.item.sortable.droptarget[0]) {
                    ui.item.sortable.cancel(); // cancel drag and drop
                    var object = jQuery.extend({}, ui.item.sortable.model.content_to_drop);
                    //console.log(object);
                    SortableService.setObjectToDrop(object);
                }
            },
            stop: function (e, ui){
                vm.Inputs =  vm.Inputs;
            }
        };

        InputService.setInputScope(vm.Inputs);

        function pushNewContent(content_to_drop){
            var currentTabIndex = $scope.$parent.vm.activeTabIndex;
            var pages = $scope.$parent.vm.survey.pages;
            if(pages.length > 0 && currentTabIndex >= 0){
                var pageId = pages[currentTabIndex]._id;
                SurveyFactory.pushNewContent( null, pageId, content_to_drop).then(function(data){
                    if(data.success){
                        $scope.$parent.vm.updateSurvey(currentTabIndex);
                        Logger.success(data.message);
                    }
                }, function(err){
                    console.log(err);
                });
            } else {
                Logger.warning('Please add a new page.');
            }
        }
        function removeInput(i, mainInput){
            mainInput.splice(i, 1);
        }
    }
}());
