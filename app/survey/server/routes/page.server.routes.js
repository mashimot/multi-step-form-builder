'use strict';

module.exports = function(app){
    var page = require('../controllers/page.server.controller');

    //Page Routes
    app.route('/api/survey/:surveyId/page')
        .get(page.list_all_pages)
        .post(page.new_page)
        .put(page.sort_page);
    app.route('/api/survey/:surveyId/page/:pageId')
        .get(page.read_a_page)
        .put(page.save_a_page)
        .delete(page.delete_a_page);
    app.route('/api/survey/:surveyId/page/:pageId/push-content')
        .put(page.push_content_to_a_page);
};
