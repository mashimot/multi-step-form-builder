(function() {
    'use strict';
    angular.module('survey')
        .controller('SurveyController', SurveyController);

    SurveyController.$inject = ['SurveyFactory', 'SortableService', 'Notification', '$timeout', '$stateParams'];

    function SurveyController(SurveyFactory, SortableService, Notification , $timeout, $stateParams){
        var surveyId = $stateParams.surveyId;
        var vm = this;
        vm.survey = [];
        vm.currentPage = [];
        vm.activeTabIndex = 0;
        vm.number = 0;
        vm.updateSurvey = updateSurvey;
        vm.countInit = countInit;
        vm.pageSelected = pageSelected;
        vm.newPage = newPage;
        vm.deletePage = deletePage;
        vm.developer = developer;
        vm.deletePage = deletePage;
        vm.sortPages = sortPages;
        vm.updateSurvey(0);
        vm.sortableContent = {
            //handle: '.handle',
            placeholder: 'ui-state-highlight',
            update: function(event, ui){
                var new_position = ui.item.sortable.dropindex;
                var old_position = ui.item.sortable.index;
                var model = ui.item.sortable.model;
                console.log(ui.item.sortable.droptarget.scope());
                var pageId = ui.item.sortable.droptarget.scope().page._id;
                //var pageId = ui.item.sortable.droptarget.scope().currentPage._id;
                var data = {};
                data.new_position = new_position;
                data.old_position = old_position;
                data.content = (!SortableService.getObjectToDrop())? model: SortableService.getObjectToDrop();
                console.log(data);
                SurveyFactory.savePerPage(surveyId, pageId, data).then(function (data) {
                    if(data.success){
                        vm.updateSurvey(vm.activeTabIndex);
                        Notification.success(data.message);
                    }
                    SortableService.setObjectToDrop(false);
                }, function (err) {
                    console.log(err);
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
                return vm.number++;
            }
        }
        function updateSurvey(currentTabIndex){
            vm.number = 0;
            SurveyFactory.getSurvey(surveyId).then(function(data){
                if(data.success){
                    vm.survey = data.model;
                    $timeout(function(){
                        vm.activeTabIndex = (currentTabIndex <= 0)? 0 : currentTabIndex;
                    });
                }
            });
        }
        function pageSelected(pageIndex){
            vm.currentPage = vm.survey.pages[pageIndex];
        }
        function newPage(){
            if(vm.survey.pages.length >= 0){
                SurveyFactory.newPage( surveyId ).then(function(data){
                    if(data.success){
                        vm.updateSurvey(vm.activeTabIndex);
                        Notification.success(data.message);
                    }
                });
            }
        }
        function deletePage(pageId){
            SurveyFactory.deletePage( surveyId, pageId ).then(function(data){
                if(data.success){
                    vm.updateSurvey(vm.activeTabIndex - 1);
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
                    data : JSON.stringify(vm.survey)
                },
                success: function (data) {
                    console.log(data);
                    var resultado = JSON.parse(data);
                    $('#htmlResult').html(resultado.html);
                }
            });
        }

        function sortPages() {
            var tabs = $("#sortable").sortable({
                items: '.uib-tab:not(.unsortable)',
                helper: "clone",
                "start": function(event, ui) {
                    ui.item.startPos = ui.item.index();
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
                                vm.updateSurvey(vm.activeTabIndex);
                                Notification.info(data.message);
                            }
                        }, function (err) {
                            console.log(err);
                        });
                    }

                }
            });
        };
    }
})();