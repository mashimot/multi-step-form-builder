(function() {
    'use strict';
    angular.module('survey')
        .directive('formPreview', function(){
            function Model(){
                this.description =  '';
                this.answer = '';
            }
            return {
                templateUrl: '../survey/client/form-builder/form-preview/form-preview.html',
                restrict: 'E',
                scope: {
                    survey: '=surveyData'
                },
                controller: function($scope){
                    $scope.answers = {
                        "59b5cbcf113d7314a466b8be": {
                            "description": "asdsadsadasasdas",
                            "answer": "Não"
                        },
                        "59b5d3464627451cdc62ecdf": {
                            "description": "Add Your Question",
                            "answer": [
                                "1",
                                "2"
                            ]
                        }
                    };
                    $scope.isInvalid = [];
                    $scope.selected = {};
                    $scope.step = 0;
                },
                link: function($scope) {
                    $scope.nextStep = function() {
                        $scope.step++;
                    }

                    $scope.prevStep = function() {
                        $scope.step--;
                    }

                    $scope.submitForm = function() {
                        // submit code goes here
                    }
                    $scope.checkbox = function(_id, content){
                        var elements = content.html.elements;
                        var elementLength = elements.length;
                        var checkboxes = [];
                        // If any object type is not checked, then uncheck the "allItemsSelected" checkbox
                        for (var i = 0; i < elementLength; i++) {
                            if (elements[i].isChecked) {
                                if(checkboxes.indexOf(elements[i].value) == -1) {
                                    checkboxes.push(elements[i].value);
                                }
                            }
                        }
                        var model = new Model();
                        model.description = content.description;
                        model.answer = checkboxes;
                        $scope.answers[_id] = model;
                    }
                    $scope.radio = function(_id, content){
                        var model = $scope.answers[_id];
                        model.description = content.description;
                        $scope.answers[_id] = model;
                    }
                }
            }
        });
}());
