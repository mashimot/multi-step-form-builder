var create = angular.module('app');
create.controller('createCtrl', [ '$scope', 'blockEdit', function($scope, blockEdit){
    blockEdit.init($scope);
    $scope.types = type();
    $scope.add = function(){
        var msg = blockEdit.add($scope.numbers);
        /*if(msg !== 'success'){
            alert(msg);
        }*/
    };
    $scope.developer = function(){
        alert('Under construction');
    };
    $scope.config = function(){
        alert('Under construction');
    };
    $scope.removeAll = function(){
        blockEdit.removeAll();
    };
    $scope.createNewBlock = function(type, keyC, keyP){
        blockEdit.key.setKeyC(keyC);
        blockEdit.key.setKeyP(keyP);
        blockEdit.createNewBlock();
    };
    $scope.clone = function(keyC, keyP){
        blockEdit.key.setKeyC(keyC);
        blockEdit.key.setKeyP(keyP);
        blockEdit.clone();
    };
    $scope.removeContent = function(p, $index){
        p.input.contents.splice($index, 1);
    };
    $scope.addContent = function(p, $index){
        p.input.contents.push({text: '', value: ''});
    };
    $scope.remove = function(type, keyC, keyP){
        blockEdit.key.setKeyC(keyC);
        blockEdit.key.setKeyP(keyP);
        blockEdit.remove(type);
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

