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
    //dinamically generate the modal content
    return {
        getTemplateToLoad: getTemplateToLoad
    }
}]);

var ConfigModalController = function ($scope, $uibModalInstance, render, pageContent, SurveyFactory) {
    var isChanged = false;

    $scope.content = angular.copy(pageContent);
    $scope.render = [];
    $scope.orderBy = function(key){
        $scope.content.input.elements.sort(sortBy(key));
    };

    $scope.sortableElements = {
        handle: '.element-handle'
    };
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

    $scope.text = {};
    $scope.$watch('text.string', function(s){
        var string = s.split('\n');
        if(string.length > 0) {
            var newElements = [];
            for (var i = 0; i < string.length; i++) {
                var str = string[i];
                var obj = {};
                var firstMatch = str.split('|')[0];
                var secondMatch = str.substring(firstMatch.length + 1); //return '' if '|' was not found

                obj.text = firstMatch;
                obj.value = secondMatch;

                newElements.push(obj);
            }
            $scope.content.input.elements = newElements;
        }
    });
    $scope.$watch('content.input.elements', function(e){
        var string = '';
        for(var i = 0; i < e.length; i++){
            var str = e[i];
            var value = '';
            if(str.value !== ''){
                value = ('|' + e[i].value);
            }
            string += (str.text + value) + (i == e.length - 1 ? '' : "\n");
        }
        $scope.text.string = string;
    }, true);
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

var sortBy = function(key, reverse) {
    var moveSmaller = reverse ? 1 : -1;
    var moveLarger = reverse ? -1 : 1;

    /**
     * @param  {*} a
     * @param  {*} b
     * @return {Number}
     */
    return function(a, b) {
        if (a[key] < b[key]) {
            return moveSmaller;
        }
        if (a[key] > b[key]) {
            return moveLarger;
        }
        return 0;
    };

}

