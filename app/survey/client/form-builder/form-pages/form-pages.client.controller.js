(function() {
    'use strict';
    angular.module('survey')
        .controller('FormPageController', FormPageController);

    FormPageController.$inject = ['$scope', 'PageFactory', 'SurveyFactory', 'SortableService', 'Notification', '$timeout', '$stateParams'];

    function FormPageController($scope, PageFactory, SurveyFactory, SortableService, Notification , $timeout, $stateParams){
        var surveyId = $stateParams.surveyId;
        var vmPage = this;

        vmPage.pages            = [];
        vmPage.currentPage      = [];
        vmPage.activeTabIndex   = 0;
        vmPage.number           = 0;
        //vmPage.updateSurvey     = updateSurvey;
        vmPage.activate         = activate;
        vmPage.countInit        = countInit;
        vmPage.pageSelected     = pageSelected;
        vmPage.newPage          = newPage;
        vmPage.deletePage       = deletePage;
        vmPage.activate();

        vmPage.sortPages = function(){
            $("#sortable").sortable({
                items: '.uib-tab:not(.unsortable)',
                helper: "clone",
                "start": function(event, ui) {
                    ui.item.startPos = ui.item.index();
                    var old_position = ui.item.startPos;
                    console.log('start: ' + ui.item.index());
                },
                "stop": function(event, ui) {
                    var old_position = ui.item.startPos;
                    var new_position = ui.item.index();
                    if(old_position !== new_position){
                        var data = {
                            new_position: new_position,
                            old_position: old_position
                        };
                        PageFactory.sortPage(surveyId, data).then(function (data) {
                            if(data.success){
                                vmPage.activate();
                                Notification.info(data.message);
                            }
                        }, function (err) {
                            console.log(err);
                        });
                    }

                }
            });
        }

        function countInit(type) {
            //question number, if the type is title, the count is not calculated
            if(type !== 'title'){
                return vmPage.number++;
            }
        }
        
        function activate(tabIndex){
            var currentTabIndex = 0;
            vmPage.number = 0;
            currentTabIndex = vmPage.activeTabIndex;
            if(tabIndex != undefined || tabIndex != null){ currentTabIndex = tabIndex; }

            return SurveyFactory.getSurvey(surveyId).then(function(data){
                vmPage.pages = data.model.pages;
                $timeout(function(){
                    vmPage.activeTabIndex = (currentTabIndex <= 0)? 0 : currentTabIndex;
                });
                return vmPage.pages;
            });
        }

        function pageSelected(pageIndex){
            vmPage.currentPage = vmPage.pages[pageIndex];
        }

        function newPage(){
            var pageLength = vmPage.pages.length;
            if(pageLength >= 0){
                PageFactory.newPage( surveyId ).then(function(data){
                    if(data.success){
                        vmPage.activate(pageLength);
                        Notification.success(data.message);
                    }
                });
            }
        }

        function deletePage(pageId){
            PageFactory.deletePage( surveyId, pageId ).then(function(data){
                if(data.success){
                    vmPage.activate(vmPage.activeTabIndex - 1);
                    Notification.error(data.message);
                }
            });
        }
    }
})();