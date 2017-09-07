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
};
