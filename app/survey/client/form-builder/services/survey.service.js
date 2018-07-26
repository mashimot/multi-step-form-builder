(function() {
    'use strict';
    angular.module('survey')
        .factory('SurveyFactory', SurveyFactory);
    SurveyFactory.$inject = ['$http', 'Logger'];
    function SurveyFactory($http){
        var url = '../api/survey';
        var service = {
            newSurvey       : newSurvey,
            showAllSurveys  : showAllSurveys,
            getSurvey       : getSurvey,
            deleteSurvey    : deleteSurvey
        };
        return service;

        //Survey
        function newSurvey(data){
            return $http.post(url, data)
                .then(success)
                .catch(fail);
            function success(result, status, headers, config){
                return result.data;
            }
            function fail(){
                console.log('joeysworldtour');
            }
        }
        function showAllSurveys(){
            return $http.get(url)
                .then(success)
                .catch(fail);
            function success(result, status, headers, config){
                return result.data;
            }
            function fail(){

            }
        }
        function getSurvey(id){
            return $http.get(url + '/' + id)
                .then(success)
                .catch(fail);
            function success(result, status, headers, config){
                return result.data;
            }
            function fail(){

            }
        }
        function deleteSurvey(id){
            return $http.delete(url + '/' + id)
                .then(success)
                .catch(fail);
            function success(result, status, headers, config){
                return result.data;
            }
            function fail(){

            }
        }
      
 
    }
}());