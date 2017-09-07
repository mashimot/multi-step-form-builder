(function() {
    'use strict';
    angular.module('survey')
        .directive('surveyPreview', function(){
            function Model(){
                this.description =  '';
                this.anwser = '';
            }
            return {
                templateUrl: '../survey/client/builder/views/preview.html',
                restrict: 'E',
                scope: {
                    survey: '=surveyData    '
                },
                controller: function($scope){
                    $scope.answers = {};
                    $scope.step = 0;
                },
                link: function($scope){
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
                        var elements = content.input.elements;
                        var elementlength = elements.length;
                        $scope.selected = [];

                        // If any object type is not checked, then uncheck the "allItemsSelected" checkbox
                        for (var i = 0; i < elementlength; i++) {
                            if (elements[i].isChecked) {
                                if($scope.selected.indexOf(elements[i].value) == -1) {
                                    $scope.selected.push(elements[i].value);
                                }
                            }
                        }
                        var model = new Model();
                        model.description = content.description;
                        model.anwser = $scope.selected;
                        $scope.answers[_id] = model;
                    }
                }
            }
        });
}());
