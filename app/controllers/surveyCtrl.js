var create = angular.module('app');
create.controller('surveyCtrl', [ '$scope', '$uibModal', 'SurveyFactory', 'ModalService', '$routeParams', function($scope, $uibModal, SurveyFactory, ModalService, $routeParams){
    //var surveyId = '590229668fa72c19a8a6c6d3';
    $scope.columns = [];
    var surveyId = $routeParams.surveyId;
    function updateSurvey(){
        SurveyFactory.getSurvey(surveyId).then(function(response){
            $scope.columns = [];
            $scope.columns = response.data;
        }, function(error){
            console.log(error);
        });
    }
    updateSurvey();

    $scope.addPage = function(){
        var data = {
            data_to_insert: {
                sections: []
            }
        };
        SurveyFactory.addPage( surveyId, data ).then(function(response){
            updateSurvey();
        }, function(err){
            console.log(err);
        });
    };
    $scope.deletePage = function(pageId){
        SurveyFactory.deletePage( surveyId, pageId ).then(function(response){
            console.log(response);
            updateSurvey();
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
        //var Survey = init(keyC, keyP, $scope.columns.form);
        var type = pageContent.input._type;
        var templateToLoad = ModalService.getTemplateToLoad(type, pageContent);
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
    }
    $scope.removeAll = function(){
        Survey.removeAll();
    };
    $scope.clone = function(keyC, keyP){
        var Survey = init(keyC, keyP, $scope.columns.form);
        Survey.clone(generateNew('question'));
    };

    $scope.deleteContent = function(surveyId, contentId){
        SurveyFactory.deleteContent( surveyId, contentId ).then(function(response){
            updateSurvey();
        }, function(err){
            console.log(err);
        });
    };

    $scope.sortableSection = {
        update: function(event, ui){
            var sectionId = ui.item.sortable.droptarget.scope().page._id;
            //var c = ui.item.sortable.droptarget.scope().page;
            var new_position = ui.item.sortable.dropindex;
            var model = ui.item.sortable.model;
            var old_position = ui.item.sortable.index;
            console.log('old -> ' + old_position);
            console.log('new -> ' + new_position);
            console.log("\n");
            var data = {
                content: model,
                new_position: new_position,
                old_position: old_position
            };
            //ui.item.sortable.cancel();
            SurveyFactory.savePerPage( surveyId, sectionId, data ).then(function(responseresponse){
                updateSurvey();
            }, function(err){
                console.log(err);
            });

        }
    };
    $scope.sortableContents = {
        items: '.sortable-item-contents',
        stop: function(){
            alert();
        }
    };

    $scope.sort = function() {
        var tabs = $("#sortable").sortable({
            "items": "md-tab-item",
            "axis": "x",
            "start": function(event, ui) {
                console.log(ui.item.startPos);
                ui.item.startPos = ui.item.index();
            },
            "stop": function(event, ui) {
                var oldIndex = ui.item.startPos;
                var newIndex = ui.item.index();
                var backward = oldIndex > newIndex;
                $scope.columns.pages.splice(newIndex + (backward ? 0 : 1), 0, $scope.columns.pages[oldIndex]);
                $scope.columns.pages.splice(oldIndex + (backward ? 1 : 0), 1);
            }
        });
    }
    var init = function(keyC, keyP){
        return new SurveyService(keyC, keyP, $scope.columns.form);
    }
}]);

var generateNew = function(type){
    if(type === 'main'){
        return {
            "id": null,
            "formType": 1, //default (formulário telefonico)
            "surveyName": null,
            "projectName": null,
            "form": []
        };
    } else if(type === 'section'){
        return {
            "sections": []
        };
    } else if(type === 'question'){
        return {
            "titles": [], // string
            //"number": '', // int
            //"description": 'Description: ' + Math.random(), // string
            //"isHide": false, // boolean
            //"isHideWhen": '', // boolean
            //"isRequired": true, // boolean
            "input": {
                type: 'radio',
                contents: [{
                    text: 'radio 1',
                    value: '1'
                },{
                    text: 'radio 2',
                    value: '2'
                },{
                    text: 'radio 3',
                    value: '3'
                }]
            }
        };
    }
};

