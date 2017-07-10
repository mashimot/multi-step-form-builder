var app = angular.module('app');
app.controller('surveyCtrl', [ '$scope', '$uibModal', 'SurveyFactory', 'TabService', 'SortableService', '$routeParams', '$timeout', function($scope, $uibModal, SurveyFactory, TabService, SortableService ,$routeParams, $timeout){
    var surveyId = $routeParams.surveyId;
    var vm = this;


    vm.survey = [];
    vm.currentPage = [];
    vm.activeTabIndex = 0;
    vm.number = 0;
    vm.countInit = function(type) {
        if(type !== 'title'){
            return vm.number++;
        }
    };

    vm.updateSurvey = function(currentTabIndex){
        vm.number = 0;
        SurveyFactory.getSurvey(surveyId).then(function(result){
            var data = result.data;
            if(data.success){
                vm.survey = data.model;
                //console.log(vm.survey);
                $timeout(function(){
                    vm.activeTabIndex = (currentTabIndex <= 0)? 0 : currentTabIndex;
                });
            }
        }, function(error){
            console.log(error);
        });
    };

    vm.updateSurvey(0);
    vm.pageSelected = function(pageIndex){
        vm.currentPage = vm.survey.pages[pageIndex];
    };
    vm.newPage = function(){
        SurveyFactory.newPage( surveyId ).then(function(result){
            var data = result.data;
            if(data.success){
                vm.updateSurvey(vm.activeTabIndex);
                console.log(data.message);
            }
        }, function(err){
            console.log(err);
        });
    };
    vm.deletePage = function(pageId){
        SurveyFactory.deletePage( surveyId, pageId ).then(function(response){
            vm.updateSurvey(vm.activeTabIndex - 1);
        }, function(err){
            console.log(err);
        });
    };
    vm.developer = function(){
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
    };
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
            SurveyFactory.savePerPage(surveyId, pageId, data).then(function (result) {
                var data = result.data;
                if(data.success === true){
                    vm.updateSurvey(vm.activeTabIndex);
                    console.log(data.message);
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
    vm.sortPages = function() {
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
                    SurveyFactory.sortPage(surveyId, data).then(function (result) {
                        var data = result.data;
                        if(data.success === true){
                            vm.updateSurvey(vm.activeTabIndex);
                            console.log(vm.activeTabIndex);
                        }
                    }, function (err) {
                        console.log(err);
                    });
                }

            }
        });
    };
}]);