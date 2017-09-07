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
            deleteSurvey    : deleteSurvey,
            newPage         : newPage,
            deletePage      : deletePage,
            savePerPage     : savePerPage,
            sortPage        : sortPage,
            pushNewContent  : pushNewContent,
            deleteContent   : deleteContent,
            updateContent   : updateContent
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
        //Page
        function newPage(id, data){
            return $http.post(url + '/' + id  + '/' + 'page', data)
                .then(success)
                .catch(fail);
            function success(result, status, headers, config){
                return result.data;
            }
            function fail(){

            }
        }
        function deletePage(surveyId, pageId){
            return $http.delete(url + '/' + surveyId  + '/page/' + pageId)
                .then(success)
                .catch(fail);
            function success(result, status, headers, config){
                return result.data;
            }
            function fail(){

            }
        }
        function savePerPage(id, pageId, data){
            return $http.put(url + '/' + id  + '/page/' + pageId, data)
                .then(success)
                .catch(fail);
            function success(result, status, headers, config){
                return result.data;
            }
            function fail(){

            }
        }
        function sortPage(id, toAdd){
            return $http.put(url + '/' + id  + '/page', toAdd)
                .then(success)
                .catch(fail);
            function success(result, status, headers, config){
                return result.data;
            }
            function fail(){

            }
        }
        //Content
        function pushNewContent(surveyId, pageId, data){
            //survey/{surveyid}/page/{pageid}/push-content
            return $http.put(url + '/' + surveyId  + '/page/' + pageId + '/push-content', data)
                .then(success)
                .catch(fail);
            function success(result, status, headers, config){
                return result.data;
            }
            function fail(){

            }
        }
        function deleteContent(surveyId, contentId){
            return $http.delete(url + '/' + surveyId  + '/content/' + contentId)
                .then(success)
                .catch(fail);
            function success(result, status, headers, config){
                return result.data;
            }
            function fail(){

            }
        }
        function updateContent(surveyId, contentId, data){
            return $http.put(url + '/' + surveyId  + '/content/' + contentId, data)
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