var app = angular.module('app');
app.controller('inputMenuCtrl', [ '$scope', 'SortableService', function($scope, SortableService){
    $scope.mainInputs = [];
    var mainInputs = function(){
        return [
            {
                name: 'Radio group',
                icon: '<i class="fa fa-dot-circle-o" aria-hidden="true"></i>',
                content_to_drop: {
                    input: {
                        type: 'radio',
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
                }
            },
            {
                name: 'Sim/Nâo',
                icon: '<i class="fa fa-dot-circle-o" aria-hidden="true"></i>',
                content_to_drop: {
                    input: {
                        type: 'radio',
                        elements: [{
                            text: 'Sim',
                            value: 'Sim'
                        },{
                            text: 'Não',
                            value: 'Não'
                        }]
                    }
                }
            },
            {
                name: 'checkbox',
                icon: '<i class="fa fa-check-square-o" aria-hidden="true"></i>',
                content_to_drop: {
                    input: {
                        type: 'checkbox',
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
                }
            },
            {
                name: 'disagreement',
                icon: '<i class="fa fa-dot-circle-o" aria-hidden="true"></i>',
                content_to_drop: {
                    input: {
                        type: 'radio',
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
                }

            },
            {
                name: 'comments',
                icon: '<i class="fa fa-commenting-o" aria-hidden="true"></i>',
                content_to_drop: {
                    input: {
                        type: 'comments'
                    }
                }
            },
            {
                name: 'net-promoter-score',
                icon: '<i class="fa fa-dot-circle-o" aria-hidden="true"></i>',
                content_to_drop: {
                    input: {
                        type: 'net-promoter-score',
                        elements: [{
                            text: '0',
                            value: '0'
                        },{
                            text: '1',
                            value: '1'
                        },{
                            text: '2',
                            value: '2'
                        },{
                            text: '3',
                            value: '3'
                        },{
                            text: '4',
                            value: '4'
                        },{
                            text: '5',
                            value: '5'
                        },{
                            text: '6',
                            value: '6'
                        },{
                            text: '7',
                            value: '7'
                        },{
                            text: '8',
                            value: '8'
                        },{
                            text: '9',
                            value: '9'
                        },{
                            text: '10',
                            value: '10'
                        }]
                    }
                }
            }
        ];
    };
    $scope.mainInputs = mainInputs();
    $scope.sortableContent = {
        connectWith: ".connected-apps-container",
        placeholder: 'ui-state-highlight',
        update: function(event, ui) {
            //var index = ui.item.sortable.dropindex;

            if ( // ensure we are in the first update() callback
            !ui.item.sortable.received &&
                // check that it's an actual moving between the two lists
            ui.item.sortable.source[0] !== ui.item.sortable.droptarget[0]) {
                ui.item.sortable.cancel(); // cancel drag and drop
                var object = jQuery.extend({}, ui.item.sortable.model.content_to_drop);
                SortableService.setObjectToDrop(object);
            }
        },
        stop: function (e, ui){
            $scope.mainInputs = mainInputs();
            /*if ($(e.target).hasClass('first') &&
             ui.item.sortable.droptarget &&
             e.target != ui.item.sortable.droptarget[0]) {
             }*/
        }
    };
}]);