var create = angular.module('app');
create.controller('createCtrl', [ '$scope', '$uibModal', 'SurveyService', 'ModalService',  function($scope, $uibModal, SurveyService, ModalService){
    $scope.columns = generateNew('main');
    //$scope.columns.form.push(generateNew('section'));

    $scope.add = function(){
        /*var Survey = init(0, 0, $scope.columns.form);
        Survey.add($scope.numbers);*/
        $scope.columns.form.push(generateNew('section'));
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
    $scope.edit = function(keyC, keyP){
        var Survey = init(keyC, keyP, $scope.columns.form);
        var type = Survey.getSection().input.type;
        var section = Survey.getSection();
        var templateToLoad = ModalService.getTemplateToLoad(type, section);
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

    $scope.removeAll = function(){
        Survey.removeAll();
    };
    $scope.clone = function(keyC, keyP){
        var Survey = init(keyC, keyP, $scope.columns.form);
        Survey.clone(generateNew('question'));
    };

    $scope.remove = function(keyC, keyP){
        var Survey = init(keyC, keyP, $scope.columns.form);
        Survey.remove();
    };

    var isUnChanged = false;
    $scope.$watch(function(){
        if (!isUnChanged) {
            for(var i = 0; i < $scope.columns.form.length; i++) {
                var d = $scope.columns.form[i];
                for(var j = 0; j < d.sections.length; j++) {
                    var s = d.sections[j];
                    for (var key in s) {
                        if (s.hasOwnProperty(key)) {
                            if (s[key].length < 1) {
                                console.log('joeys');
                                delete s[key];
                                return false;
                            }
                        }
                    }
                }
            }
        }
    });
    $scope.sortableContents = {
        items: '.sortable-item-contents'
    };

    $scope.items = ['Item #1', 'Item #2', 'Item #3', 'Item #4', 'Item #5']
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
                $scope.columns.form.splice(newIndex + (backward ? 0 : 1), 0, $scope.columns.form[oldIndex]);
                $scope.columns.form.splice(oldIndex + (backward ? 1 : 0), 1);
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

