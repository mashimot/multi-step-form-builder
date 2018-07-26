(function(){
    'use strict';
    angular.module('survey')
        .controller('FormNewController', FormNewController);
    FormNewController.$inject = [ 'SurveyFactory', 'Logger' ];

    function FormNewController(SurveyFactory, Logger){
        var vm = this;
        vm.surveyList = [];
        vm.survey = new Survey();
        vm.newSurvey = newSurvey;
        vm.deleteSurvey = deleteSurvey;

        //Placing start-up logic in a consistent place
        activate();

        function activate(){
            SurveyFactory.showAllSurveys().then(function(data){
                vm.surveyList = data;
                console.log(data);
            });
        }
        function Survey(){
            this.name = ''
        }
        function newSurvey(){
            SurveyFactory.newSurvey(vm.survey).then(function(data){
                if(data.errors){
                    Logger.warning(data.errors.name.message);
                } else {
                    vm.surveyList.push(data);
                }
            });
        }
        function deleteSurvey(surveyId){
            SurveyFactory.deleteSurvey( surveyId ).then(function(data){
                if(data.success){
                    Logger.success(data.message);
                    activate();
                } else {

                }
            });
        }
    }
}());
