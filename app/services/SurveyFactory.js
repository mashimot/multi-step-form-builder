create.factory('SurveyFactory', ['$http', function($http){
    var url = 'survey';

    var SurveyFactory = {};
    //Survey
    SurveyFactory.  showAllSurveys = function(){
        return $http.get(url + '/list-all');
    }
    SurveyFactory.getSurvey = function(id){
        return $http.get(url + '/' + id);
    };
    SurveyFactory.remove = function(){
        this.getSections().splice(_keyP, 1);
    };
    SurveyFactory.clone = function(newObj){
        var nextIndex = _keyP + 1;
        this.getSections().insert(nextIndex, newObj);
    };
    //Page
    SurveyFactory.addPage = function(id, toAdd){
        return $http.post(url + '/' + id  + '/' + 'new-page', toAdd);
    };
    SurveyFactory.deletePage = function(surveyId, pageId){
        return $http.delete(url + '/' + surveyId  + '/page/' + pageId);
    };
    SurveyFactory.savePerPage = function(id, pageId, toAdd){
        return $http.put(url + '/' + id  + '/page/' + pageId, toAdd);
    };

    //Content
    SurveyFactory.deleteContent = function(surveyId, contentId){
        return $http.delete(url + '/' + surveyId  + '/content/' + contentId);
    };

    var pushTo = function(copyTo){
        var p = _form[_keyC].sections, qlength = p.length;
        var k = (copyTo === 'next')? (_keyC + 1) : (_keyC - 1);
        for(var i = _keyP; i < qlength; i++ ){
            _form[k].sections.push(p[i]);
        }
    };
    Array.insert = function (index, item) {
        this.splice(index, 0, item);
    };
    return SurveyFactory;
}]);