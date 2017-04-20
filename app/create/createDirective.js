create.directive('addTitles', [ function(){
    return {
        template: '' +
        '<section class="well well-sm">' +
        '<button ng-click="addTitle(p)" class="btn btn-default btn-sm"> add title</button>' +
        '   <div as-sortable="sortableTitles" ng-model="p.titles"><br/>'+
        '       <div ng-repeat="(id_title, title) in p.titles">' +
        '           <div class="row">' +
        '               <div class="col-md-10"><input type="text" class="form-control" value="{{ title.text }}" ng-model="title.text"/></div>' +
        '               <div class="col-md-2">' +
        '                   <button ng-click="removeTitle(p, id_title)" class="btn btn-danger"><i class="fa fa-times" aria-hidden="true"></i></button>' +
        '               </div>' +
        '           </div>' +
        '       </div>' +
        '   </div>' +
        '</section>' +
        '<div class="text-right">'+
        '   <span class="btn-group" ng-click="clone(keyC, keyP)">'+
        '       <button class="btn btn-primary btn-sm form-control"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> </button>'+
        '   </span>'+
        '   <span class="btn-group" ng-click="remove(keyC, keyP)">'+
        '       <button class="btn btn-danger btn-sm form-control"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> </button>'+
        '   </span>'+
        '</div>',
        link: function(scope, element, attr){
            scope.addTitle = function(p){
                if(typeof p.titles !== 'undefined'){
                    p.titles.push({text: '', type: ''});
                } else {
                    p.titles = [{text: '', type: ''}];
                }
            };
            scope.removeTitle = function(p, $index){
                p.titles.splice($index, 1);
            }
        }
    };
}]);
create.directive('renderInputs',  function(){
    return {
        template: '<ng-include src="getInputTemplate()"/>',
        scope: {
            input: '=input'
        },
        restrict: 'E',
        controller: function($scope) {
            //function used on the ng-include to resolve the template
            $scope.getInputTemplate = function() {
                return '../templates/inputs/' + $scope.input.type + '.html' || '../templates/inputs/default.html';
                //return 'input-' + $scope.input.type + '-template.html';
            }
        }
    };
});
create.directive('surveyBuilder',  function(){
    return {
        templateUrl: '../templates/survey-builder.html'
    }
});