var app = angular.module('app');
app.controller('createCtrl', [ '$scope', '$http', 'SurveyFactory', function($scope, $http, SurveyFactory){
    $scope.surveyList = [];
    $scope.message = {};

    function showSurveys(){
        SurveyFactory.showAllSurveys().then(function(res){
            $scope.surveyList = res.data;
        });
    }
    function Survey(){
        this.name = ''
    }
    showSurveys();

    $scope.survey = new Survey();

    $scope.newSurvey = function(){
        $http.post('/survey/new', $scope.survey).then(function(res) {
            $scope.surveyList.push(res.data);
            $scope.message = {};
        });
    };
    $scope.deleteSurvey = function(surveyId){
        SurveyFactory.deleteSurvey( surveyId ).then(function(resp){
            showSurveys();
            $scope.message = {
                success: resp.data.success,
                text: resp.data.text
            };
        }, function(err){
            console.log(err);
        });
    }
}]);


