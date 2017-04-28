create.factory('ModalService', function(){
    var getTemplateToLoad = function(type, pageContent){
        //The templates are loaded via the script tag
        switch(type){
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
    $scope.p = pageContent; //pega o elemento

    $scope.removeContent = function ($index) {
        $scope.p.input.elements.splice($index, 1);
    };
    $scope.addToInput = function (string) {
        var error = {};
        if (typeof string !== 'undefined') {
            var strlen = string.length;
            if (strlen > 0) {
                $scope.p.input.elements = [];
                for (var i = 0; i < strlen; i++) {
                    $scope.p.input.elements.push({
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