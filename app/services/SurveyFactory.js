app.factory('SurveyFactory', ['$http', function($http){
    var url = 'survey';
    var SurveyFactory = {};

    //Survey
    SurveyFactory.showAllSurveys = function(){
        return $http.get(url + '/list-all');
    };
    SurveyFactory.getSurvey = function(id){
        return $http.get(url + '/' + id);
    };
    SurveyFactory.deleteSurvey = function(id){
        return $http.delete(url + '/' + id);
    };
    //Page
    SurveyFactory.newPage = function(id, data){
        return $http.post(url + '/' + id  + '/' + 'new-page', data);
    };
    SurveyFactory.deletePage = function(surveyId, pageId){
        return $http.delete(url + '/' + surveyId  + '/page/' + pageId);
    };
    SurveyFactory.savePerPage = function(id, pageId, data){
        return $http.put(url + '/' + id  + '/page/' + pageId, data);
    };
    SurveyFactory.sortPage = function(id, toAdd){
        return $http.put(url + '/' + id  + '/sort-page', toAdd);
    };
    //Content
    SurveyFactory.pushNewContent = function(surveyId, pageId, data){
        //survey/{surveyid}/page/{pageid}/push-content
        return $http.put(url + '/' + surveyId  + '/page/' + pageId + '/push-content', data);
    };
    SurveyFactory.deleteContent = function(surveyId, contentId){
        return $http.delete(url + '/' + surveyId  + '/content/' + contentId);
    };
    SurveyFactory.updateContent = function(surveyId, contentId, data){
        return $http.put(url + '/' + surveyId  + '/content/' + contentId, data);
    };
    return SurveyFactory;
}]);