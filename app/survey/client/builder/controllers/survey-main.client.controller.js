(function() {
    'use strict';
    angular.module('survey')
        .controller('SurveyController', SurveyController);

    SurveyController.$inject = ['SurveyFactory', 'SortableService', 'Notification', '$timeout', '$stateParams', '$scope'];

    function SurveyController(SurveyFactory, SortableService, Notification , $timeout, $stateParams, $scope){
        var surveyId = $stateParams.surveyId;
        var vmSurvey = this;

        vmSurvey.survey           = [];
        vmSurvey.currentPage      = [];
        vmSurvey.activeTabIndex   = 0;
        vmSurvey.number           = 0;
        //vmSurvey.updateSurvey     = updateSurvey;
        vmSurvey.activate         = activate;
        vmSurvey.countInit        = countInit;
        vmSurvey.pageSelected     = pageSelected;
        vmSurvey.newPage          = newPage;
        vmSurvey.deletePage       = deletePage;
        vmSurvey.developer        = developer;
        vmSurvey.deletePage       = deletePage;
        vmSurvey.activate();
        //vmSurvey.updateSurvey(0);
        vmSurvey.sortableContent  = {
            //handle: '.handle',
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
                console.log(data);
                SurveyFactory.savePerPage(surveyId, pageId, data).then(function (data) {
                    if(data.success){
                        activate();
                        Notification.success(data.message);
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
        vmSurvey.sortPages = function(){
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
                        SurveyFactory.sortPage(surveyId, data).then(function (data) {
                            if(data.success){
                                vmSurvey.activate();
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
                return vmSurvey.number++;
            }
        }
        function activate(tabIndex){
            var currentTabIndex = 0;
            vmSurvey.number = 0;
            currentTabIndex = vmSurvey.activeTabIndex;
            if(tabIndex != undefined || tabIndex != null){ currentTabIndex = tabIndex; }

            return SurveyFactory.getSurvey(surveyId).then(function(data){
                vmSurvey.survey = data.model;
                $timeout(function(){
                    vmSurvey.activeTabIndex = (currentTabIndex <= 0)? 0 : currentTabIndex;
                });
                return vmSurvey.survey;
            });
        }

        function pageSelected(pageIndex){
            vmSurvey.currentPage = vmSurvey.survey.pages[pageIndex];
        }

        function newPage(){
            var pageLength = vmSurvey.survey.pages.length;
            if(pageLength >= 0){
                SurveyFactory.newPage( surveyId ).then(function(data){
                    if(data.success){
                        vmSurvey.activate(pageLength);
                        Notification.success(data.message);
                    }
                });
            }
        }

        function deletePage(pageId){
            SurveyFactory.deletePage( surveyId, pageId ).then(function(data){
                if(data.success){
                    vmSurvey.activate(vmSurvey.activeTabIndex - 1);
                    Notification.error(data.message);
                }
            });
        }

        function developer(){
            var url = 'http://localhost:8080/projetos/2016/msfb/only-human/main.php';
            $.ajax({
                url: url,
                type: 'POST',
                data:  {
                    data : JSON.stringify(vmSurvey.survey)
                },
                success: function (data) {
                    console.log(data);
                    var resultado = JSON.parse(data);
                    $('#htmlResult').html(resultado.html);
                }
            });
        }

    }
})();