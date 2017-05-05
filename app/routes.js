'use strict';
module.exports = function(app) {
    var todoList = require('./controllers/todoListController');

    // todoList Routes
    //Survey Routes
    app.route('/survey/new')
        .post(todoList.create_a_survey);
    app.route('/survey/list-all')
        .get(todoList.list_all_surveys);
    app.route('/survey/:surveyId')
        .get(todoList.read_a_survey)
        .delete(todoList.delete_a_survey);
    //app.route('/survey/:surveyId/delete')

    //Page Routes
    app.route('/survey/:surveyId/new-page')
        .post(todoList.new_page);
    app.route('/survey/:surveyId/page/list-all')
        .get(todoList.list_all_pages);
    app.route('/survey/:surveyId/page/:pageId')
        .get(todoList.read_a_page)
        .delete(todoList.delete_a_page)
        .put(todoList.save_per_page);


    app.route('/survey/:surveyId/sort-page')
        .put(todoList.sort_page);
    app.route('/survey/:surveyId/content/:contentId')
        .delete(todoList.delete_a_content);

};
