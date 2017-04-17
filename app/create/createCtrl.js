var create = angular.module('app');
create.controller('createCtrl', [ '$scope', 'SurveyBuilder', function($scope, SurveyBuilder){
    var Survey = new SurveyBuilder($scope);
    $scope.types = type();
    $scope.add = function(){
        var msg = Survey.add($scope.numbers);
        if(msg !== 'success'){
            alert(msg);
        }
    };
    $scope.developer = function(){
        alert('Under construction');
    };
    $scope.config = function(){
        alert('Under construction');
    };
    $scope.removeAll = function(){
        Survey.removeAll();
    };
    $scope.createNewBlock = function(type, keyC, keyP){
        Survey.setKeyC(keyC);
        Survey.setKeyP(keyP);
        Survey.createNewBlock();
    };
    $scope.clone = function(keyC, keyP){
        Survey.setKeyC(keyC);
        Survey.setKeyP(keyP);
        Survey.clone();
    };
    $scope.removeContent = function(p, $index){
        p.input.contents.splice($index, 1);
    };
    $scope.addContent = function(p, $index){
        p.input.contents.push({text: '', value: ''});
    };
    $scope.remove = function(keyC, keyP){
        Survey.setKeyC(keyC);
        Survey.setKeyP(keyP);
        Survey.remove();
    };
    $scope.orderBy = function(){

    };
    $scope.updateType = function(p){
        var types = type();
        var value = p.input.type;
        p.input.contents = [];
        angular.forEach(types, function(d){
            if(d.value === value){
                angular.forEach(d.content.split('\n'), function(c){
                    p.input.contents.push({
                        text: c,
                        value: c
                    });
                });
                return false;
            }
        });
    };
    /*$scope.$watch(function() {
        var check = "";
        for (var i = 0; i < $scope.columns.form.length; i++) {
            var item = $scope.columns.form[i];
            for (var j = 0; j < item.sections.length; j++) {
                var section = item.sections[j];
                if(section.description === ''){
                    console.log('joeysworldtour');
                }
            }
        }
        return check;
    });*/

    var isUnChanged = false;
    var shouldRemoveWhen = {
        'description' : '',
        'number' : '',
        'isRequired' : false,
        'isHide' : false,
        'isHideWhen' : ''
    };
    $scope.$watch(function(){
        if (!isUnChanged) {
            for(var i = 0; i < $scope.columns.form.length; i++) {
                var d = $scope.columns.form[i];
                for(var j = 0; j < d.sections.length; j++) {
                    var s = d.sections[j];
                    for (var key in s) {
                        if (s.hasOwnProperty(key)) {
                            if(s[key] === shouldRemoveWhen[key]){
                                delete s[key];
                                break;
                            }
                        }
                    }
                }
            }
        }
    });
    $scope.sortableContents = {
        items: '.sortable-item-contents'
    };
}]);
var type = function(){
    return [
        {
            "value": "radio",
            "text": "radio",
            "content": "radio 1\nradio 2\nradio 3\nradio 4"
        },
        {
            "value": "checkbox",
            "text": "checkbox",
            "content": "checkbox 1\ncheckbox 2\ncheckbox 3\ncheckbox 4"
        },
        {
            "value": "text",
            "text": "text",
            "content": ""
        }
    ];
}

