(function() {
    'use strict';
    angular.module('survey')
        .controller('InputMenuController', InputMenuController);

    InputMenuController.$inject = ['$scope', 'SortableService', 'InputService', 'SurveyFactory', 'Logger'];

    function InputMenuController($scope, SortableService, InputService, SurveyFactory, Logger){
        var vm              = this;
        vm.Inputs           = [];
        //vm.Inputs           = InputService.getInputs();
        //vm.pushNewContent   = pushNewContent;
        vm.removeInput      = removeInput;

        vm.sortableContent  = {
            connectWith: ".connected-apps-container",
            placeholder: 'ui-state-highlight',
            cancel: ".unsortable",
            update: function(event, ui) {
                if ( // ensure we are in the first update() callback
                !ui.item.sortable.received &&
                    // check that it's an actual moving between the two lists
                ui.item.sortable.source[0] !== ui.item.sortable.droptarget[0]) {
                    ui.item.sortable.cancel(); // cancel drag and drop
                    //var object = jQuery.extend({}, ui.item.sortable.model.content_to_drop);
                    var model = ui.item.sortable.model;
                    delete model._id;

                    var object = jQuery.extend({}, model);
                    //console.log(object);
                    SortableService.setObjectToDrop(object);
                }
            },
            stop: function (e, ui){
                vm.Inputs =  vm.Inputs;
            }
        };


        activate();

        function activate(){
            return InputService.getInputs().then(function(data){
                vm.Inputs = data;
                InputService.setInputScope(vm.Inputs);
            });
        }

        function pushNewContent(content_to_drop){
            /*var currentTabIndex = $scope.$parent.vmSurvey.activeTabIndex;
            var pages = $scope.$parent.vmSurvey.survey.pages;
            if(pages.length > 0 && currentTabIndex >= 0){
                var pageId = pages[currentTabIndex]._id;
                SurveyFactory.pushNewContent( null, pageId, content_to_drop).then(function(data){
                    if(data.success){
                        $scope.$parent.vmSurvey.updateSurvey(currentTabIndex);
                        Logger.success(data.message);
                    }
                }, function(err){
                    console.log(err);
                });
            } else {
                Logger.warning('Please add a new page.');
            }*/
        }
        function removeInput(tempId){
            for (var i=0; i < vm.Inputs.length; i++) {
                if (vm.Inputs[i].tempId === tempId) {
                    vm.Inputs.splice(i, 1);
                    break;
                }
            }
            //vm.Inputs.splice(id, 1);
        }
    }
}());
