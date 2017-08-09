angular.module('app')
    .service('TabService', function(){
        var modalUrl = "../views/modal/";
        var tabs = {
            general: {
                title: "Configuração Geral", url: '<general-tab content="content" form-name="editModal"></general-tab>'
            },
            choices: {
                title: "Escolhas", url: '<choices-tab content="content" form-name="editModal"></choices-tab>'
            },
            visibleIf: {
                title: "Vísivel Se", url: '<hide-when-tab content="content"></hide-when-tab>'
            },
            title: {
                title: "Title", url: '<title-tab content="content" form-name="editModal"></title-tab>'
            }
        };
        this.render = function(){
            return {
                'radio': {
                    templates: this.radio(), //is an array
                    hide: [] //ng-hide
                },
                'title': {
                    templates: this.title(), //is an array
                    hide: [] //ng-hide
                },
                'checkbox': {
                    templates: this.checkbox(), //is an array
                    hide: [] //ng-hide
                },
                'select': {
                    templates: this.select(), //is an array
                    hide: [] //ng-hide
                },
                'comments': {
                    templates: this.comments(), //is an array
                    hide: ['hasComment'] //ng-hide
                },
                'net-promoter-score':
                {
                    templates: this.netPromoterScore(), //is an array
                    hide: ['hasComment'] //ng-hide
                },
                'gradient':
                {
                    templates: this.gradient(), //is an array
                    hide: ['hasComment', 'hasOther'] //ng-hide
                },
                'identification':
                {
                    templates: this.identification(), //is an array
                    hide: ['hasComment'] //ng-hide
                },
                'conheco':
                {
                    templates: this.identification(), //is an array
                    hide: ['hasComment'] //ng-hide
                }
            };
        };

        this.radio = function(){
            return [tabs.general, tabs.choices, tabs.visibleIf];
        };
        this.title = function(){
            return [tabs.title];
        };
        this.gradient = function(){
            return [tabs.general, tabs.choices];
        };
        this.checkbox = function(){
            return [tabs.general, tabs.choices, tabs.visibleIf];
        };
        this.select = function(){
            return [tabs.general, tabs.choices, tabs.visibleIf];
        };
        this.comments = function(){
            return [tabs.general, tabs.visibleIf];
        };
        this.netPromoterScore = function(){
            return [tabs.general, tabs.visibleIf];
        };
        this.identification = function(){
            return [tabs.general, tabs.visibleIf];
        };

    });