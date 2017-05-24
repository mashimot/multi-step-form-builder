app.directive('renderContent', ['$uibModal', 'ModalService', 'SurveyFactory',  function($uibModal, ModalService, SurveyFactory){
    return {
        //template: '<div class="disable-all-contents"><div class="form-group"><ng-include src="getInputTemplate()"/></div></div>',
        templateUrl: '../views/survey/content.html',
        scope: {
            content: '=content',
            number: '=number'
        },
        restrict: 'E',
        controller: function($scope) {
            var type = $scope.content.input.type;
            $scope.getInputTemplate = function() {
                return 'input-' + type + '-template.html';
            }
        },
        link: function($scope){
            $scope.deleteContent = function(surveyId, contentId){
                SurveyFactory.deleteContent( surveyId, contentId ).then(function(response){
                    $scope.$parent.updateSurvey($scope.$parent.activeTabIndex);
                }, function(err){
                    console.log(err);
                });
            };
            $scope.edit = function(pageContent){
                console.log();
                var templateToLoad = ModalService.getTemplateToLoad(pageContent);
                if(templateToLoad !== 'error'){
                    var modalInstance = $uibModal.open({
                        templateUrl: templateToLoad.templateUrl,
                        controller: templateToLoad.controller, //return a string and then converts to a function
                        resolve: templateToLoad.resolve
                    });
                    modalInstance.result.then(function(result){
                        console.log(result);
                        if(result === 'success'){
                            $scope.$parent.updateSurvey($scope.$parent.activeTabIndex);
                        }
                    });
                } else {
                    alert('Template not Founded!');
                }
            };
        }
    };

}]);
app.directive('surveyBuilder',  function(){
    return {
        restrict: 'E',
        templateUrl: '../views/survey/builder.html'
    }
});