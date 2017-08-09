'use strict';
module.exports = function(app) {
    var todoList = require('./controllers/todoListController');
    //Survey Routes
    app.route('/api/survey')
        .post(todoList.create_a_survey)
        .get(todoList.list_all_surveys);
    app.route('/api/survey/:surveyId')
        .get(todoList.read_a_survey)
        .delete(todoList.delete_a_survey);

    //Page Routes
    app.route('/api/survey/:surveyId/page')
        .get(todoList.list_all_pages)
        .post(todoList.new_page)
        .put(todoList.sort_page);
    app.route('/api/survey/:surveyId/page/:pageId')
        .get(todoList.read_a_page)
        .put(todoList.save_a_page)
        .delete(todoList.delete_a_page);

    app.route('/api/survey/:surveyId/page/:pageId/push-content')
        .put(todoList.create_a_content);
    app.route('/api/survey/:surveyId/content/:contentId')
        .delete(todoList.delete_a_content)
        .put(todoList.update_a_content);

};
