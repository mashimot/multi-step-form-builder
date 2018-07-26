(function() {
    'use strict';
    angular.module('survey')
        .directive('addEditContent', addEditContent);
    addEditContent.$inject = ['$uibModal', 'DataFactory', 'TabService', 'Notification'];

    function addEditContent($uibModal, DataFactory, TabService, Notification){
        return {
            restrict: 'EA',
            scope: {
                pageContent: '=',
                callbackFn: "&callbackFn",
                typeEvent: '@',
                pageId: '@pageId'
            },
            link: function(scope, elem, attr){
                elem.on("click", function(){
                    save(scope.pageContent, scope.typeEvent, scope.pageId).result.then(function(message){
                        scope.callbackFn();
                        Notification.info(message);
                    });
                });

                function save(content, typeEvent, pageId){
                    var render = TabService.render();
                    var type = content.html.tag;
                    var tabToRender = render[type];

                    if(tabToRender !== undefined){
                        var modalInstance = $uibModal.open({
                            templateUrl: 'configTemplate.html',
                            controller: ConfigModalController,
                            resolve: {
                                render: function(){
                                    return tabToRender;
                                },
                                pageContent: function () {
                                    return content;
                                },
                                pageId: function () {
                                    return pageId;
                                },
                                DataFactory: function () {
                                    return DataFactory;
                                },
                                typeEvent: function () {
                                    return typeEvent;
                                }
                            },
                            backdrop : true,
                            keyboard : true,
                            backdropClick : true,
                            size : 'lg',
                            animation: false
                        });
                        return modalInstance;
                    } else {
                        Notification.info('Template not Founded!');
                    }
                }
                function ConfigModalController($scope, $uibModalInstance, render, pageContent, typeEvent, pageId, DataFactory) {
                    var isChanged       = false;
                    $scope.content      = angular.copy(pageContent);
                    $scope.render       = [];
                    $scope.typeEvent    = typeEvent;
                    $scope.pageId       = pageId;
                    $scope.render       = render;
                    $scope.cancel       = cancel;
                    $scope.ok           = ok;

                    //look at TabService, hide some inputs
                    if(render.hide.length){
                        for(var i = 0; i < render.hide.length; i++){
                            $scope[render.hide[i]] = true;
                        }
                    }
                    //verifica se houve alguma atualiazação no model
                    $scope.$watch('content', function(newValue, oldValue) {
                        if(angular.equals(newValue, angular.copy(pageContent))){
                            isChanged = false;
                        } else {
                            isChanged = true;
                        }
                    }, true);


                    //se houve atualização no model, faz o update; caso ao contrário fecha-se o modal.
                    function ok(isFormValid){
                        if(isChanged && isFormValid){
                            if($scope.typeEvent == 'edit')
                                updateContent();
                            else
                                pushNewContent();
                        }
                        if(!isChanged){
                            pushNewContent();
                            if($scope.typeEvent == 'edit'){
                                $uibModalInstance.dismiss();
                            }
                        }
                    }
                    function cancel(){
                        $uibModalInstance.dismiss();
                    }
                    function updateContent(){
                        var result = {
                            id: $scope.content._id,
                            content: $scope.content
                        };
                        DataFactory.updateContent(null, result.id, result.content ).then(function(data){
                            if(typeof data.success !== undefined){
                                $uibModalInstance.close(data.message);
                            }
                        });
                    }
                    function pushNewContent(){
                        var model = $scope.content;
                        delete model._id;
                        DataFactory.pushNewContent( null,  $scope.pageId, model).then(function(data){
                            if(data.success){
                                $uibModalInstance.close(data.message);
                            }
                        });
                    }
                };
            }
        }
    }
}());
