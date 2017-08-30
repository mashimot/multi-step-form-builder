angular.module('survey')
    .controller('InputMenuController', InputMenuController);

InputMenuController.$inject = ['$scope', 'SortableService', 'InputService', 'SurveyFactory', 'Notification'];

function InputMenuController($scope, SortableService, InputService, SurveyFactory, Notification){
    var vm = this;
    //var surveyId = $routeParams.surveyId;
    var surveyId = '599e2a9163daea1dec651926';

    vm.Inputs = [];
    vm.Inputs = InputService.getInputs();
    InputService.setInputScope(vm.Inputs);

    vm.pushNewContent = function(content_to_drop){
        var currentTabIndex = $scope.$parent.vm.activeTabIndex;
        var pages = $scope.$parent.vm.survey.pages;
        if(pages.length > 0 && currentTabIndex >= 0){
            var pageId = pages[currentTabIndex]._id;
            SurveyFactory.pushNewContent( surveyId, pageId, content_to_drop).then(function(response){
                var data = response.data;
                if(data.success){
                    $scope.$parent.vm.updateSurvey(currentTabIndex);
                    Notification.success(data.message);
                }
            }, function(err){
                console.log(err);
            });
        } else {
            Notification.warning('Please add a new page.');
        }
    };
    vm.removeInput = function(i, mainInput){
        mainInput.splice(i, 1);
    };
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
} 