(function() {
    'use strict';
    angular.module('survey')
        .service('InputService', InputService);
    InputService.inject = ['$http'];

    function InputService($http){
        //var url = '/api/input/';
        var url = '../survey/client/form-builder/json/inputs.json';

        var input = {};
        var service = {
            getScopeInput: getScopeInput,
            setInputScope: setInputScope,
            getInputs: getInputs
        };
        return service;

        function getScopeInput() {
            return input;
        }

        function setInputScope(i) {
            input = i;
        }
        
        function getInputs() {
            return $http.get(url).then(function(result){
                return result.data;
            });
        }
    }
}());