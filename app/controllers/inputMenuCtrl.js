var app = angular.module('app');
app.controller('inputMenuCtrl', [ '$scope', '$routeParams', 'SortableService', 'InputService', 'SurveyFactory', function($scope, $routeParams, SortableService, InputService, SurveyFactory){
    var vm = this;
    var surveyId = $routeParams.surveyId;
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
                if(data.success === true){
                    $scope.$parent.vm.updateSurvey(currentTabIndex);
                    console.log(data.message);
                }
            }, function(err){
                console.log(err);
            });
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
}]);