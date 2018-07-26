(function() {
    'use strict';
    angular.module('survey')
        .controller('FormMenuController', FormMenuController);

    FormMenuController.$inject = ['$scope', 'SortableService', 'RenderHtml', 'InputService', 'SurveyFactory', 'Logger'];

    function FormMenuController($scope, SortableService, RenderHtml, InputService, SurveyFactory, Logger){
        var vmMenu              = this;
        vmMenu.Inputs           = [];
        //vmMenu.Inputs           = InputService.getInputs();
        //vmMenu.pushNewContent   = pushNewContent;
        vmMenu.removeInput      = removeInput;

        vmMenu.sortableContent  = {
            connectWith: ".connected-apps-container",
            placeholder: 'ui-state-highlight',
            cancel: ".unsortable",
            start: function(event, ui){
                ui.item.startHtml = ui.item.html();
                if(typeof ui.item.sortable.model.html.tag !== 'undefined') {
                    var model = ui.item.sortable.model;
                    //console.log(model);
                    RenderHtml.setParams(model);
                    var html = RenderHtml.getHtml();
                    ui.item.removeClass();
                    ui.item.html("<div class='row'><div class='px-3 py-3 bg-white' style='opacity: 0.9; width: 100%;'>" + html[model.html.tag] + "</div></div>");
                    ui.helper.css('width', '120%');
                }
            },            
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
                vmMenu.Inputs =  vmMenu.Inputs;
                ui.item.html(ui.item.startHtml);
            }
        };


        activate();

        function activate(){
            return InputService.getInputs().then(function(data){
                vmMenu.Inputs = data;
                InputService.setInputScope(vmMenu.Inputs);
            });
        }

        function pushNewContent(content_to_drop){
            /*var currentTabIndex = $scope.$parent.vmPage.activeTabIndex;
            var pages = $scope.$parent.vmPage.pages;
            if(pages.length > 0 && currentTabIndex >= 0){
                var pageId = pages[currentTabIndex]._id;
                SurveyFactory.pushNewContent( null, pageId, content_to_drop).then(function(data){
                    if(data.success){
                        $scope.$parent.vmPage.updateSurvey(currentTabIndex);
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
            for (var i=0; i < vmMenu.Inputs.length; i++) {
                if (vmMenu.Inputs[i].tempId === tempId) {
                    vmMenu.Inputs.splice(i, 1);
                    break;
                }
            }
            //vmMenu.Inputs.splice(id, 1);
        }
    }
}());
