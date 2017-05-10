var app = angular.module('app');
app.controller('surveyCtrl', [ '$scope', '$uibModal', 'SurveyFactory', 'ModalService', 'SortableService', '$routeParams', '$timeout', function($scope, $uibModal, SurveyFactory, ModalService, SortableService ,$routeParams, $timeout){
    var surveyId = $routeParams.surveyId;
    $scope.columns = [];
    $scope.activeTabIndex = 0;
    $scope.number = 0;
    $scope.countInit = function() {
        return $scope.number++;
    };
    function updateSurvey(currentTabIndex){
        $scope.number = 0;
        SurveyFactory.getSurvey(surveyId).then(function(response){
            $scope.columns = response.data;
            $timeout(function(){
                if(currentTabIndex <= 0){
                    $scope.activeTabIndex = 0;
                } else {
                    $scope.activeTabIndex = currentTabIndex;
                }
            });
        }, function(error){
        });
    }
    updateSurvey(0);

    $scope.newPage = function(){
        SurveyFactory.newPage( surveyId ).then(function(response){
            updateSurvey($scope.activeTabIndex);
        }, function(err){
            console.log(err);
        });
    };
    $scope.deletePage = function(pageId){
        SurveyFactory.deletePage( surveyId, pageId ).then(function(response){
            updateSurvey($scope.activeTabIndex - 1);
        }, function(err){
            console.log(err);
        });
    };
    $scope.developer = function(){
        $.ajax({
            //url: 'geraFormulario2.php',
            url: 'http://localhost/daniel/Projetos/2016/only-human/main.php',
            type: 'POST',
            data:  {
                data : JSON.stringify($scope.columns)
            },
            success: function (data) {
                console.log(data);
                var resultado = JSON.parse(data);
                //$('.resultado').html(data);
                alert(resultado);
                $('#htmlResult').html(resultado.arquivoHTML);
                $('#javascriptResult').html(resultado.arquivoJavascript);
                $('#customScriptResult').html(resultado.customScript);
                $('#showOrhideScriptResult').html(resultado.showOrhideScript);
            }
        });
    };
    $scope.edit = function(pageContent){
        var templateToLoad = ModalService.getTemplateToLoad(pageContent);
        if(templateToLoad !== 'error'){
            var modalInstance = $uibModal.open({
                templateUrl: templateToLoad.templateUrl,
                controller: templateToLoad.controller, //return a string and then converts to a function
                resolve: templateToLoad.resolve
            });
        } else {
            alert('Template not Founded!');
        }
    };
    $scope.addTitle = function(p){
        if(typeof p.titles !== 'undefined'){
            p.titles.push({text: '', type: ''});
        } else {
            p.titles = [{text: '', type: ''}];
        }
    };
    $scope.removeTitle = function(p, $index){
        p.titles.splice($index, 1);
    };
    $scope.clone = function(keyC, keyP){
    };
    $scope.deleteContent = function(surveyId, contentId){
        SurveyFactory.deleteContent( surveyId, contentId ).then(function(response){
            updateSurvey($scope.activeTabIndex);
        }, function(err){
            console.log(err);
        });
    };
    $scope.sortableContent = {
        update: function(event, ui){
            var new_position = ui.item.sortable.dropindex;
            var old_position = ui.item.sortable.index;
            var model = ui.item.sortable.model;
            var pageId = ui.item.sortable.droptarget.scope().page._id;
            var data = {};
            data.new_position = new_position;
            data.old_position = old_position;
            data.content = (!SortableService.getObjectToDrop())? model: SortableService.getObjectToDrop();

            SurveyFactory.savePerPage(surveyId, pageId, data).then(function (res) {
                updateSurvey($scope.activeTabIndex);
                SortableService.setObjectToDrop(false);
            }, function (err) {
                console.log(err);
            });
        },
        stop: function(){
        }
    };
    $scope.sortPages = function() {
        var tabs = $("#sortable").sortable({
            items: '.uib-tab:not(.unsortable)',
            "axis": "x",
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
                    SurveyFactory.sortPage(surveyId, data).then(function (res) {
                        console.log(res);
                        updateSurvey($scope.activeTabIndex);
                    }, function (err) {
                        console.log(err);
                    });
                }

            }
        });
    };
}]);