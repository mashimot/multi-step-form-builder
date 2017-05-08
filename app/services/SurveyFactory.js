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
    SurveyFactory.clone = function(newObj){
        var nextIndex = _keyP + 1;
        this.getSections().insert(nextIndex, newObj);
    };
    //Page
    SurveyFactory.newPage = function(id, toAdd){
        return $http.post(url + '/' + id  + '/' + 'new-page', toAdd);
    };
    SurveyFactory.deletePage = function(surveyId, pageId){
        return $http.delete(url + '/' + surveyId  + '/page/' + pageId);
    };
    SurveyFactory.savePerPage = function(id, pageId, toAdd){
        return $http.put(url + '/' + id  + '/page/' + pageId, toAdd);
    };
    SurveyFactory.sortPage = function(id, toAdd){
        return $http.put(url + '/' + id  + '/sort-page', toAdd);
    };
    //Content
    SurveyFactory.deleteContent = function(surveyId, contentId){
        return $http.delete(url + '/' + surveyId  + '/content/' + contentId);
    };
    return SurveyFactory;
}]);