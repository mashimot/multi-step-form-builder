'use strict';

module.exports = function(app) {
    var survey = require('../controllers/survey.server.controller');
    //Survey Routes
    app.route('/api/survey')
        .post(survey.create_a_survey)
        .get(survey.list_all_surveys);
    app.route('/api/survey/:surveyId')
        .get(survey.read_a_survey)
        .delete(survey.delete_a_survey);

    //Page Routes
    app.route('/api/survey/:surveyId/page')
        .get(survey.list_all_pages)
        .post(survey.new_page)
        .put(survey.sort_page);
    app.route('/api/survey/:surveyId/page/:pageId')
        .get(survey.read_a_page)
        .put(survey.save_a_page)
        .delete(survey.delete_a_page);

    app.route('/api/survey/:surveyId/page/:pageId/push-content')
        .put(survey.create_a_content);
    app.route('/api/survey/:surveyId/content/:contentId')
        .delete(survey.delete_a_content)
        .put(survey.update_a_content);

};
