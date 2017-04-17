create.directive('addTitles', ['blockEdit', function(blockEdit){
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
        '                   <button class="btn btn-default "><i class="fa fa-arrows" aria-hidden="true"></i></button>' +
        '               </div>' +
        '           </div>' +
        '       </div>' +
        '   </div>' +
        '</section>',
        link: function(scope, element, attr){
            scope.addTitle = function(p){
                p.titles.push({text: '', type: ''});
            };
            scope.removeTitle = function(p, $index){
                p.titles.splice($index, 1);
            }
        }
    };
}]);

create.directive('surveyBuilder',  function(){
    return {
        templateUrl: '../templates/survey-builder.html'
    }
});