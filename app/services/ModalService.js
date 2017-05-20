app.factory('ModalService', [ 'SurveyFactory', function(SurveyFactory){
    var modalUrl = "views/modal/";

    var getTabs = function() {
        return {
            general: {
                title: "Configuração Geral", template: modalUrl + "general-config.html"
            },
            choices: {
                title: "Escolhas", template: modalUrl + "choice.html"
            },
            visibleIf: {
                title: "Vísivel Se", template: modalUrl + "is-hide-when.html"
            }
        };
    };

    var getTemplateToLoad = function(pageContent){
        var render = [];
        var inputToHide = [];
        var tab = getTabs();

        switch(pageContent.input.type){
            case 'radio':
                render.push(tab.general, tab.choices, tab.visibleIf);
                break;
            case 'checkbox':
                render.push(tab.general, tab.choices, tab.visibleIf);
                break;
            case 'comments':
                render.push(tab.general, tab.visibleIf);
                inputToHide = ['hasComment'];
                break;
            case 'net-promoter-score':
                render.push(tab.general, tab.visibleIf);
                inputToHide = ['hasComment'];
                break;
            default :
                render = [];
                inputToHide = [];
                break;
        }

        return {
            templateUrl: 'configTemplate.html',
            controller: ConfigModalController,
            resolve: {
                tabToRender: function(){
                    return render;
                },
                inputToHide: function(){
                    return inputToHide;
                },
                pageContent: function () {
                    return pageContent;
                },
                SurveyFactory: function () {
                    return SurveyFactory;
                }
            }
        };
    };
    return {
        getTemplateToLoad: getTemplateToLoad
    }
}]);

var ConfigModalController = function ($scope, $uibModalInstance, tabToRender, inputToHide, pageContent, SurveyFactory) {
    var isChanged = false;
    $scope.content = angular.copy(pageContent);
    $scope.tabsToRender = [];
    $scope.tabsToRender = tabToRender;

    if(inputToHide.length){
        for(var i = 0; i < inputToHide.length; i++){
            console.log(inputToHide[i]);
            $scope[inputToHide[i]] = true;
        }
    }
    $scope.removeContent = function ($index) {
        $scope.content.input.elements.splice($index, 1);
    };
    $scope.addElement = function () {
        $scope.content.input.elements.push({
            text: '',
            value: ''
        });
    };
    $scope.addToInput = function (string) {
        var error = {};
        if (typeof string !== 'undefined') {
            var strlen = string.length;
            if (strlen > 0) {
                $scope.content.input.elements = [];
                for (var i = 0; i < strlen; i++) {
                    $scope.content.input.elements.push({
                        text: string[i],
                        value: string[i]
                    });
                }
            } else {
                error.hasError = true;
                error.message = "Adicione um Valor";
            }
        } else {
            error.hasError = true;
            error.message = "Adicione um Valor";
        }
        if (error.hasError) {
            alert(error.message);
        }
    };
    /*$scope.apply = function(){
        updateContent();
    };*/

    //verifica se houve alguma atualiazação no model
    $scope.$watch('content', function(newValue, oldValue) {
        if(angular.equals(newValue, angular.copy(pageContent))){
            isChanged = false;
        } else {
            isChanged = true;
        }
    }, true);
    //se houve atualização no model, faz o update; caso ao contrário fecha-se o modal.
    $scope.ok = function(){
        if(isChanged){
            updateContent();
        } else {
            $uibModalInstance.close();
        }
    };
    $scope.cancel = function(){
        $uibModalInstance.dismiss();
    };
    var updateContent = function(){
        var result = {
            id: $scope.content._id,
            content: $scope.content
        };
        SurveyFactory.updateContent(null, result.id, result.content ).then(function(result){
            $uibModalInstance.close('success');
        }, function(err){
            console.log(err);
        });
    }

};

