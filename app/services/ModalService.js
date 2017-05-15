app.factory('ModalService', function(){
    var getTemplateToLoad = function(pageContent, SurveyFactory){
        switch(pageContent.input.type){
            case 'radio':
                return {
                    templateUrl: 'configTemplate.html',
                    controller: ConfigModalController,
                    resolve: { //passa variavel para o modal, no caso a variavel p.
                        tabIndexToRemove: function(){
                            return -1;
                        },
                        pageContent: function () {
                            return pageContent;
                        },
                        SurveyFactory: function(){
                            return SurveyFactory;
                        }
                    }
                };
            case 'checkbox':
                return {
                    templateUrl: 'configTemplate.html',
                    controller: ConfigModalController,
                    resolve: { //passa variavel para o modal, no caso a variavel p.
                        tabIndexToRemove: function(){
                            return -1;
                        },
                        pageContent: function () {
                            return pageContent;
                        },
                        SurveyFactory: function(){
                            return SurveyFactory;
                        }
                    }
                };
                break;
            case 'comments':
                return {
                    templateUrl: 'configTemplate.html',
                    controller: ConfigModalController,
                    resolve: { //passa variavel para o modal, no caso a variavel p.
                        tabIndexToRemove: function(){
                            return 1;
                        },
                        pageContent: function () {
                            return pageContent;
                        },
                        SurveyFactory: function(){
                            return SurveyFactory;
                        }
                    }
                };
                break;
            default:
                return 'error';
        }
    };
    return {
        getTemplateToLoad: getTemplateToLoad
    }
});

var ConfigModalController = function ($scope, $uibModalInstance, tabIndexToRemove, pageContent, SurveyFactory) {
    var modalUrl = "views/modal/";
    $scope.content = angular.copy(pageContent);
    $scope.configs = [
        { title: "Configuração Geral", template: modalUrl + "general-config.html" },
        { title: "Escolhas", template:  modalUrl + "choice.html" },
        { title: "Vísivel Se", template:  modalUrl + "is-hide-when.html" }
    ];
    if($scope.configs.length > 0 && tabIndexToRemove !== -1){
        $scope.configs.splice(tabIndexToRemove, 1);
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
    $scope.apply = function(){
        SurveyFactory.updateContent(null, $scope.content._id, $scope.content ).then(function(result){

        });
    };
    $scope.ok = function(){
        $uibModalInstance.dismiss();
    };
    $scope.cancel = function(){
        $uibModalInstance.dismiss();
    };
};