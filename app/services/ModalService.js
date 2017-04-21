create.factory('ModalService', function(){
    var getTemplateToLoad = function(type, section){
        switch(type){
            case 'radio':
                return {
                    templateUrl: 'radioTemplate.html',
                    controller: RadioModalController,
                    resolve: { //passa variavel para o modal, no caso a variavel p.
                        section: function () {
                            return section;
                        }
                    }
                };
            case 'checkbox':
                return {
                    templateUrl: 'radioTemplate.html',
                    controller: RadioModalController,
                    resolve: { //passa variavel para o modal, no caso a variavel p.
                        section: function () {
                            return section;
                        }
                    }
                };
                break;
            default:
                return 'error';
        }
    };
    var RadioModalController = function ($scope, $uibModalInstance, section) {
        $scope.p = section; //pega o elemento
        $scope.removeContent = function ($index) {
            $scope.p.input.contents.splice($index, 1);
        };
        $scope.addToInput = function (string) {
            var error = {};
            if (typeof string !== 'undefined') {
                var strlen = string.length;
                if (strlen > 0) {
                    $scope.p.input.contents = [];
                    for (var i = 0; i < strlen; i++) {
                        $scope.p.input.contents.push({
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
    return {
        getTemplateToLoad: getTemplateToLoad
    }
});