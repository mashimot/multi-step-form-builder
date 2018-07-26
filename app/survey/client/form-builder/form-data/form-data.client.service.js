(function() {
    'use strict';
    angular.module('survey')
        .factory('DataFactory', DataFactory);
    DataFactory.$inject = ['$http', 'Logger'];
    function DataFactory($http){
        var url = '../api/survey';
        var service = {
            pushNewContent  : pushNewContent,
            deleteContent   : deleteContent,
            updateContent   : updateContent
        };
        return service;

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