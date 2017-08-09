angular.module('app')
.directive('choicesTab', function(SurveyCollectionService){
        return {
            templateUrl: '../views/modal/choice.html',
            scope: {
                content: '=content',
                formName: '=formName'
            },
            controller: function($scope){
                $scope.sortableElements = {
                    handle: '.element-handle'
                };
            },
            link: function ($scope, element) {
                $scope.text = {};
                $scope.addElement = function () {
                    $scope.content.input.elements.push({
                        text: '',
                        value: ''
                    });
                };
                $scope.removeContent = function ($index) {
                    $scope.content.input.elements.splice($index, 1);
                };
                $scope.orderBy = function(key){
                    var sort = SurveyCollectionService.sortBy(key);
                    $scope.content.input.elements.sort(sort);
                };
                $scope.cloneThis = function(name, elements){
                    var elementsLength = elements.length;
                    if(elementsLength > 0){
                        var cloneThisObjectName = (name == 'value')? 'text' : 'value';
                        for(var i = 0; i < elementsLength; i++){
                            elements[i][name] = elements[i][cloneThisObjectName];
                        }
                    }
                };
                /*$scope.teste = function(e, s){
                    var string = s.split('\n');
                    if(string.length > 0) {
                        var newElements = [];
                        for (var i = 0; i < string.length; i++) {
                            var obj = {};
                            var str = string[i];
                            if(str.indexOf('|') !== -1){
                                var match = str.split('|');
                                var firstMatch = match[0];
                                //var secondMatch = match[1];
                                var secondMatch = str.substring(firstMatch.length + 1); //return '' if '|' was not found
                            } else {
                                firstMatch = str;
                                secondMatch = '' ;
                            }
                            obj.text = firstMatch;
                            obj.value = secondMatch;

                            newElements.push(obj);
                        }
                        $scope.content.input.elements = newElements;
                    }
                }*/
                /*$scope.$watch('text.string', function(s){
                    var string = s.split('\n');
                    if(string.length > 0) {
                        var newElements = [];
                        for (var i = 0; i < string.length; i++) {
                            var obj = {};
                            var str = string[i];
                            var match = str.split('|');
                            var firstMatch = match[0];
                            //var secondMatch = match[1];
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
                        var text = '';
                        var pipe = '|';
                        text = str.text;
                        value = str.value;
                        if(value == ''){
                            pipe = '';
                        }
                        string += (text + pipe + value) + (i == e.length - 1 ? '' : "\n");
                    }
                    $scope.text.string = string;
                }, true);*/
            }
        }
    });

