'use strict';

module.exports = function(app) {
    var content = require('../controllers/content.server.controller');

    //Content Routes
    app.route('/api/survey/:surveyId/content/:contentId')
        .delete(content.delete_a_content)
        .put(content.update_a_content);
};
