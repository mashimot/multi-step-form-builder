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
                        tabs: this.radio(), //is an array
                        hide: [] //ng-hide
                    },
                    'title': {
                        tabs: this.title(), //is an array
                        hide: [] //ng-hide
                    },
                    'checkbox': {
                        tabs: this.checkbox(), //is an array
                        hide: [] //ng-hide
                    },
                    'select': {
                        tabs: this.select(), //is an array
                        hide: [] //ng-hide
                    },
                    'comments': {
                        tabs: this.comments(), //is an array
                        hide: ['hasComment'] //ng-hide
                    },
                    'net-promoter-score': {
                        tabs: this.netPromoterScore(), //is an array
                        hide: ['hasComment'] //ng-hide
                    },
                    'gradient': {
                        tabs: this.gradient(), //is an array
                        hide: ['hasComment', 'hasOther'] //ng-hide
                    },
                    'identification': {
                        tabs: this.identification(), //is an array
                        hide: ['hasComment'] //ng-hide
                    },
                    'conheco': {
                        tabs: this.identification(), //is an array
                        hide: ['hasComment'] //ng-hide
                    }
                };
            };

            this.radio = function () {
                return [tabs.general, tabs.choices, tabs.visibleIf];
            };
            this.title = function () {
                return [tabs.title];
            };
            this.gradient = function () {
                return [tabs.general, tabs.choices];
            };
            this.checkbox = function () {
                return [tabs.general, tabs.choices, tabs.visibleIf];
            };
            this.select = function () {
                return [tabs.general, tabs.choices, tabs.visibleIf];
            };
            this.comments = function () {
                return [tabs.general, tabs.visibleIf];
            };
            this.netPromoterScore = function () {
                return [tabs.general, tabs.visibleIf];
            };
            this.identification = function () {
                return [tabs.general, tabs.visibleIf];
            };
        });
}());