var create = angular.module('app');

create.controller('inputMenuCtrl', [ '$scope', function($scope){
    $scope.mainInputs = [];
    var mainInputs = function(){
        return [
        {
            name: 'Radio group',
            input: {
                type: 'radio',
                contents: [{
                    text: 'radio 1',
                    value: '1'
                },{
                    text: 'radio 2',
                    value: '2'
                },{
                    text: 'radio 3',
                    value: '3'
                }]
            }
        },
        {
            name: 'checkbox',
            input: {
                type: 'checkbox',
                contents: [{
                    text: 'checkbox 1',
                    value: '1'
                },{
                    text: 'checkbox 2',
                    value: '2'
                },{
                    text: 'checkbox 3',
                    value: '3'
                }]
            }
        },
        {
            name: 'comments',
            input: {
                type: 'comments'
            }
        }
        ];
    };
    $scope.mainInputs = mainInputs();
    $scope.sortableSection = {
        connectWith: ".connected-apps-container",
        update: function(e, ui){

        },
        stop: function (e, ui){
            if ($(e.target).hasClass('first') &&
                ui.item.sortable.droptarget &&
                e.target != ui.item.sortable.droptarget[0]) {
                // clone the original model to restore the removed item
                $scope.mainInputs = mainInputs();
            }
        }
    };
}]);