app.factory('ModalService', [ 'SurveyFactory', 'TabService', function(SurveyFactory, TabService){
    var getTemplateToLoad = function(pageContent){
        var render = TabService.render();
        var tabToRender = [];
        //var renderlength = render.length ;
        var type = pageContent.input.type;
        tabToRender = render[type];

        /*for(var i = 0; i < renderlength; i++){
            if(pageContent.input.type === render[i].type){
                tabToRender = render[i];
                break;
            }
        }*/
        if(tabToRender !== undefined){
            return {
                templateUrl: 'configTemplate.html',
                controller: ConfigModalController,
                resolve: {
                    render: function(){
                        return tabToRender;
                    },
                    pageContent: function () {
                        return pageContent;
                    },
                    SurveyFactory: function () {
                        return SurveyFactory;
                    }
                }
            };
        } else {
            return 'error';
        }

    };
    return {
        getTemplateToLoad: getTemplateToLoad
    }
}]);

var ConfigModalController = function ($scope, $uibModalInstance, render, pageContent, SurveyFactory) {
    var isChanged = false;
    $scope.content = angular.copy(pageContent);
    $scope.render = [];

    //look at TabService, hide some inputs
    $scope.render = render;
    if(render.hide.length){
        for(var i = 0; i < render.hide.length; i++){
            $scope[render.hide[i]] = true;
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

