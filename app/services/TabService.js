app.service('TabService', function(){
    var modalUrl = "../views/modal/";
    var tabs = {
        general: {
            title: "Configuração Geral", url: modalUrl + "general-config.html"
        },
        choices: {
            title: "Escolhas", url: modalUrl + "choice.html"
        },
        visibleIf: {
            title: "Vísivel Se", url: modalUrl + "is-hide-when.html"
        },
        title: {
            title: "Title", url: modalUrl + "title.html"
        }
    };
    this.render = function(){
        return {
            'radio': {
                templates: this.radio(), //is an array
                hide: []
            },
            'title': {
                templates: this.title(), //is an array
                hide: []
            },
            'checkbox': {
                templates: this.checkbox(), //is an array
                hide: []
            },
            'comments': {
                templates: this.comments(), //is an array
                hide: ['hasComment']
            },
            'net-promoter-score':
            {
                templates: this.netPromoterScore(), //is an array
                hide: ['hasComment']
            }
        };
    };

    this.radio = function(){
        return [tabs.general, tabs.choices, tabs.visibleIf];
    };
    this.title = function(){
        return [tabs.title];
    };
    this.checkbox = function(){
        return [tabs.general, tabs.choices, tabs.visibleIf];
    };
    this.comments = function(){
        return [tabs.general, tabs.visibleIf];
    };
    this.netPromoterScore = function(){
        return [tabs.general, tabs.visibleIf];
    };

});