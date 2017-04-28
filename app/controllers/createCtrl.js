var create = angular.module('app');
create.controller('createCtrl', [ '$scope', 'SurveyFactory', function($scope, SurveyFactory){
    $scope.surveyList = [];
    SurveyFactory.showAllSurveys().then(function(res){
        $scope.surveyList = res.data;
    });
}]);


