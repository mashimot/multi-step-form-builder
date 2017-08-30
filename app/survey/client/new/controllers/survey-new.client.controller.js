angular.module('survey')
    .controller('CreateController', CreateController);
CreateController.$inject = [ 'SurveyFactory', 'Notification' ];

function CreateController(SurveyFactory, Notification){
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
        SurveyFactory.newSurvey(vm.survey).then(function(res){
            if(res.data.errors){
                vm.message = {
                    success: true,
                    text: res.data.errors.name.message
                };
                Notification.success(vm.message.text);
            } else {
                vm.surveyList.push(res.data);
                vm.message = {};
            }
        }, function(err, status, headers, config){
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
            if(vm.message.success){
                Notification.success(vm.message.text);
            }
        }, function(err){
            console.log(err);
        });
    }
}