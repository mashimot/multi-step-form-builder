var create = angular.module('app');

create.controller('inputMenuCtrl', [ '$scope', function($scope){
    $scope.mainInputs = [];
    var mainInputs = function(){
        return [
        {
            name: 'Radio group',
            input: {
                _type: 'radio',
                elements: [{
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
                _type: 'checkbox',
                elements: [{
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
            name: 'disagreement',
            input: {
                _type: 'radio',
                elements: [{
                    text: 'Discordo plenamente',
                    value: '1'
                },{
                    text: 'Discordo parcialmente',
                    value: '2'
                },{
                    text: 'Não concordo nem discordo',
                    value: '3'
                },{
                    text: 'Concordo parcialmente',
                    value: '4'
                },{
                    text: 'Concordo plenamente',
                    value: '5'
                },{
                    text: 'NA (Não Aplicável)',
                    value: '0'
                }]
            }
        },
        {
            name: 'comments',
            input: {
                _type: 'comments'
            }
        }
        ];
    };
    $scope.mainInputs = mainInputs();
    $scope.sortableContent = {
        connectWith: ".connected-apps-container",
        stop: function (e, ui){
            $scope.mainInputs = mainInputs();

            /*if ($(e.target).hasClass('first') &&
                ui.item.sortable.droptarget &&
                e.target != ui.item.sortable.droptarget[0]) {
            }*/
        }
    };
}]);