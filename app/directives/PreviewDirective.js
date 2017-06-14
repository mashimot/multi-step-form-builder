app.directive('surveyPreview', function(){
    var getModel =  function(){
        return {
            description: '',
            anwser: ''
        }
    };
    return {
        templateUrl: '../views/preview.html',
        restrict: 'E',
        controller: function($scope){
            $scope.answers = {};
        },
        link: function($scope){
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
                var model = getModel();
                model.description = content.description;
                model.anwser = $scope.selected;
                $scope.answers[_id] = model;
            }
        }
    }
});