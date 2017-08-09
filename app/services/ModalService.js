angular.module('app')
    .factory('ModalService', [ 'SurveyFactory', 'TabService', 'SurveyCollectionService', function(SurveyFactory, TabService, SurveyCollectionService){
    var getTemplateToLoad = function(pageContent){
        var render = TabService.render();
        var tabToRender = [];
        var type = pageContent.input.type;
        tabToRender = render[type];
        if(tabToRender !== undefined){
            return {
                templateUrl: 'configTemplate.html',
                controller: ConfigModalController,
                resolve: {
                    render: function(){
                        return tabToRender;
                    },
                    pageContent: function () {
                        return pageContent;
                    },
                    SurveyFactory: function () {
                        return SurveyFactory;
                    }
                }
            };
        } else {
            return 'error';
        }
    };
    //dinamically generate the modal content
    return {
        getTemplateToLoad: getTemplateToLoad
    }
}]);
