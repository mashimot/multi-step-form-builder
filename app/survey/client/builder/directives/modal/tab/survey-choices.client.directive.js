(function() {
    'use strict';
    angular.module('survey')
        .directive('choicesTab', function(SurveyCollectionService){
            return {
                templateUrl: '../survey/client/builder/views/modal/choice.html',
                scope: {
                    content: '=content',
                    formName: '=formName'
                },
                controller: function($scope){
                    $scope.sortableElements = {
                        handle: '.element-handle',
                        stop: function(){
                            $scope.sortType      = undefined;
                            $scope.sortReverse   = undefined;
                        }
                    };
                },
                link: function (scope, element) {
                    scope.text          = {};
                    scope.removeContent = removeContent;
                    scope.addElement    = addElement;
                    scope.cloneThis     = cloneThis;
                    scope.orderBy       = orderBy;
                    scope.string        = string;
                    scope.$watch('content.input.elements', function(e){
                        var string = '';
                        for(var i = 0; i < e.length; i++){
                            var str = e[i];
                            var value = '';
                            var text = '';
                            var pipe = '|';
                            text = str.text;
                            value = str.value;
                            if(str.text == undefined) text = '';
                            if(str.value == undefined) value = '';
                            if(value == '') pipe = '';
                            string += (text + pipe + value) + (i == e.length - 1 ? '' : "\n");
                        }
                        scope.text.string = string;
                    }, true);

                    function addElement() {
                        scope.content.input.elements.push({
                            text: '',
                            value: ''
                        });
                    }
                    function string(e, s){
                        var string = s.split('\n');
                        if(string.length > 0) {
                            var newElements = [];
                            for (var i = 0; i < string.length; i++) {
                                var obj = {};
                                var str = string[i];
                                var firstMatch = str;
                                var secondMatch = '';
                                if(str.indexOf('|') != -1){
                                    var match = str.split('|');
                                    firstMatch = match[0];
                                    //var secondMatch = match[1];
                                    secondMatch = str.substring(firstMatch.length + 1); //return '' if '|' was not found
                                }
                                obj.text = (firstMatch == undefined)? '' : firstMatch;
                                obj.value = (secondMatch == undefined)? '' : secondMatch;
                                newElements.push(obj);
                            }
                            scope.content.input.elements = newElements;
                        }
                    }
                    function removeContent($index) {
                        scope.content.input.elements.splice($index, 1);
                    }
                    function orderBy(type){
                        if(scope.sortType != type){
                            scope.sortReverse = true;
                        }
                        scope.sortReverse = !scope.sortReverse;
                        scope.sortType    = type;
                        var sort = SurveyCollectionService.sortBy(type, scope.sortReverse);
                        scope.content.input.elements.sort(sort);
                    }
                    function cloneThis(name, elements){
                        var elementsLength = elements.length;
                        if(elementsLength > 0){
                            var cloneThisObjectName = (name == 'value')? 'text' : 'value';
                            for(var i = 0; i < elementsLength; i++){
                                elements[i][name] = elements[i][cloneThisObjectName];
                            }
                        }
                    }
                }
            }
        });
}());
