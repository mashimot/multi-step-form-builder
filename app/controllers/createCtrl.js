var app = angular.module('app');
app.controller('createCtrl', [ '$scope', '$http', 'SurveyFactory', function($scope, $http, SurveyFactory){
    var vm = this;
    vm.surveyList = [];
    vm.message = {};

    function showSurveys(){
        SurveyFactory.showAllSurveys().then(function(res){
            vm.surveyList = res.data;
        });
    }
    function Survey(){
        this.name = ''
    }
    showSurveys();

    vm.survey = new Survey();

    vm.newSurvey = function(){
        $http.post('/survey', vm.survey).then(function(res) {
            console.log(res);
            if(res.data.errors){
                vm.message = {
                    success: true,
                    text: res.data.errors.name.message
                };
            } else {
                vm.surveyList.push(res.data);
                vm.message = {};
            }
        }, function(err, status, headers, config){
            console.log(err);
        })
            .catch(function(err){
                console.log(err);
            });
    };
    vm.deleteSurvey = function(surveyId){
        SurveyFactory.deleteSurvey( surveyId ).then(function(resp){
            showSurveys();
            vm.message = {
                success: resp.data.success,
                text: resp.data.text
            };
        }, function(err){
            console.log(err);
        });
    }
}]);


