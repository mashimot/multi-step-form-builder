(function() {
    'use strict';
    angular.module('survey')
        .factory('PageFactory', PageFactory);
    PageFactory.$inject = ['$http', 'Logger'];
    function PageFactory($http){
        var url = '../api/survey';
        var service = {
            newPage         : newPage,
            deletePage      : deletePage,
            savePerPage     : savePerPage,
            sortPage        : sortPage
        };
        return service;

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
    }
}());