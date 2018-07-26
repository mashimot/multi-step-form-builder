(function() {
    'use strict';
    angular.module('survey')
        .service('TabService', function () {
            var tabs = {
                general: {
                    title: "Configuração Geral", template: '<general-tab content="content" form-name="editModal"></general-tab>'
                },
                choices: {
                    title: "Escolhas", template: '<choices-tab content="content" form-name="editModal"></choices-tab>'
                },
                visibleIf: {
                    title: "Vísivel Se", template: '<hide-when-tab content="content"></hide-when-tab>'
                },
                title: {
                    title: "Title", template: '<title-tab content="content" form-name="editModal"></title-tab>'
                }
            };
            this.render = function () {
                return {
                    'radio': {
                        tabs: [tabs.general, tabs.choices, tabs.visibleIf], //is an array
                        hide: [] //ng-hide
                    },
                    'title': {
                        tabs: [tabs.title], //is an array
                        hide: [] //ng-hide
                    },
                    'checkbox': {
                        tabs: [tabs.general, tabs.choices, tabs.visibleIf], //is an array
                        hide: [] //ng-hide
                    },
                    'select': {
                        tabs: [tabs.general, tabs.choices, tabs.visibleIf], //is an array
                        hide: [] //ng-hide
                    },
                    'textarea': {
                        tabs: [tabs.general, tabs.visibleIf], //is an array
                        hide: ['hasComment'] //ng-hide
                    },
                    'net-promoter-score': {
                        tabs: [tabs.general, tabs.visibleIf], //is an array
                        hide: ['hasComment'] //ng-hide
                    },
                    'gradient': {
                        tabs: [tabs.general, tabs.choices], //is an array
                        hide: ['hasComment', 'hasOther'] //ng-hide
                    },
                    'identification': {
                        tabs: [tabs.general, tabs.visibleIf], //is an array
                        hide: ['hasComment'] //ng-hide
                    }
                };
            };
        });
}());