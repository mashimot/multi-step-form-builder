app.factory('ModalService', function(){
    var getTemplateToLoad = function(pageContent){
        switch(pageContent.input.type){
            case 'radio':
                return {
                    templateUrl: 'configTemplate.html',
                    controller: ConfigModalController,
                    resolve: { //passa variavel para o modal, no caso a variavel p.
                        pageContent: function () {
                            return pageContent;
                        }
                    }
                };
            case 'checkbox':
                return {
                    templateUrl: 'configTemplate.html',
                    controller: ConfigModalController,
                    resolve: { //passa variavel para o modal, no caso a variavel p.
                        pageContent: function () {
                            return pageContent;
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

var ConfigModalController = function ($scope, $uibModalInstance, pageContent) {
    $scope.content = angular.copy(pageContent);
    $scope.isRequired = function(required){
        if(!required){
            delete $scope.content.isRequired;
        }
    };
    $scope.isHide = function(hide){
        if(!hide){
            delete $scope.content.isHide;
        }
    };
    $scope.isHideWhen = function(string){
        if(string.trim() === ''){
            delete $scope.content.isHideWhen;
        }
    };
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
    $scope.ok = function(){
        $uibModalInstance.dismiss();
    }
};