create.directive('generateForm', ['$compile','$injector', '$http', '$templateCache', '$sce', 'EditForm', function( $compile, $http, $injector, $templateCache, $sce, EditForm) {
    /*
     var getTemplate = function(contentType) {
     var templateMap = {
     discordo: 'getDiscordo'
     };
     return templateMap[contentType];
     }*/
    return {
        scope: {
            data: '='
        },
        controller: function(){

        },
        link: function(scope, element, attr){
            var h = '';
            element.click(function(){
                angular.forEach(scope.data, function(column, keyC){
                    var hideBlock = (keyC > 0)? 'style="display: block;"' : '' ;
                    h += '<div id="bloco' + (keyC  + 1) +'" class="bloco primeiro-bloco bloco-atual well well-sm" ' + hideBlock + ' >' + ' BLOCO ' + keyC;
                    angular.forEach(column.perguntas, function(p){
                        EditForm.init(p);
                        if(p.titles.length > 0){
                            angular.forEach(p.titles, function(title){
                                h += '<h1 class="alert alert-info">' + title.text.trim() + '</h1>'
                            });
                        }
                        h += EditForm.generate();
                    });
                    h += '</div>';
                });
                $(".wooo").html(h);
            });

        }
    };
}]);
create.directive('addTitles', ['blockEdit', function(blockEdit){
    return {
        controller: function($scope){
        },
        template: '' +
        '<section class="well well-sm">' +
        '<button ng-click="addTitle(p)" class="btn btn-default btn-sm"> add title</button>' +
        '   <div as-sortable="sortableTitles" ng-model="p.titles"><br/>'+
        '       <div ng-repeat="(id_title, title) in p.titles" as-sortable-item>' +
        '           <div class="row">' +
        '               <div class="col-md-10"><input type="text" class="form-control" value="{{ title.text }}" ng-model="title.text"/></div>' +
        '               <div class="col-md-2">' +
        '                   <button ng-click="removeTitle(p, id_title)" class="btn btn-danger"><i class="fa fa-times" aria-hidden="true"></i></button>' +
        '                   <button class="btn btn-default" as-sortable-item-handle><i class="fa fa-arrows" aria-hidden="true"></i></button>' +
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