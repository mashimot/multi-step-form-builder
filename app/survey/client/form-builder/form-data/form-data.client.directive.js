(function() {
    'use strict';
    angular.module('survey')
    .directive('renderContent', renderContent);
    
    renderContent.$inject = ['RenderHtml'];

    function renderContent(RenderHtml){
        return {
            scope: {
                data: '=content'
            },
            template: `<span bind-html-compile="result()"></span>` ,
            controller: function($scope){
                $scope.result = function(){
                    var data = $scope.data;
                    RenderHtml.setParams(data);
                    var result = RenderHtml.getHtml()[data.html.tag];
                    if(typeof result !== 'undefined'){
                        var required = '';
                        var tag = '';
                        /*var tag = "<span class='badge badge-primary'>" + data.html.tag + "</span>";
                        if(data.html.category === 'form'){
                            required = data.table.nullable? "<span class='badge badge-success'>required</span>" : "<span class='badge badge-danger'>not required</span>";
                        }*/
                        return  tag + ' ' + required + result;
                    }
                    return 'undefined';
                }
            }
        }   
    }
})();
