var create = angular.module('app');
create.controller('createCtrl', [ '$scope', '$http', 'SurveyFactory', function($scope, $http, SurveyFactory){
    $scope.surveyList = [];
    SurveyFactory.showAllSurveys().then(function(res){
        console.log(res.data);
        $scope.surveyList = res.data;
    });
    function Survey(){
        this.name = ''
    }
    $scope.survey = new Survey();

    $scope.newSurvey = function(){
        $http.post('/survey/new', $scope.survey).then(function(res) {
            //console.log($scope.surveyList);
            $scope.surveyList.push(res.data);
            console.log($scope.surveyList);
        });
    }
}]);


