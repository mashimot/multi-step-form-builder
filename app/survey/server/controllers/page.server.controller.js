'use strict';

var mongoose = require('mongoose');
var Survey = mongoose.model('Survey');
var Page = mongoose.model('Page');
var Content = mongoose.model('Content');
var collection = require('../common/survey.collection');

//return page with content
exports.list_all_pages = function(req, res) {
    Page.find({}, function(err, pages) {
        if (err)
            res.send(err);
        res.json(pages);
    });
};
exports.read_a_page = function(req, res){
    var s = {};
    s.survey_id = req.params.surveyId;
    s.page_id = req.params.pageId;
    Page.findById(
        s.page_id
    ).populate('contents')
        .exec(function(err, page){
            if(err)
                res.send(err)
            res.json(page);
        });
};

exports.new_page = function(req, res) {
    var s = {
        id: req.params.surveyId
    };
    Survey.findById({ _id: s.id }, function(err, survey) {
        if (err)
            res.send(err);
        //survey is finded
        var new_page = new Page({
            name: 'page name'
        });
        new_page.save(function(err){
            if(err) res.send(err);
            survey.pages.push({ _id: new_page._id });
            survey.save(function(err){
                if(err) res.send(err);
                res.json({
                    success: true,
                    message: 'Page created successfully!'
                });
            });
        });
    });
};

//remove entire page
exports.delete_a_page = function(req, res) {
    var s = {
        id: req.params.surveyId,
        page_id: req.params.pageId
    };
    Page.findOne({ '_id' : s.page_id }, function(err, pg) {
        pg.remove(function(err, model) {
            if(err)
                res.send(err);
            res.json({
                success: true,
                message: 'Page deleted successfully!'
            });
        });
    });
};
exports.sort_page = function(req, res) {
    var survey = {};
    survey.survey_id = req.params.surveyId;
    var new_position = req.body.new_position;
    var old_position = req.body.old_position;
    Survey.findById(
        { _id: survey.survey_id },
        function(err, _survey){
            if(err) res.send(err);
            var newpage = collection.arraymove(_survey.pages, old_position, new_position);
            _survey.pages = [];
            _survey.pages = newpage;
            _survey.save(function(err){
                if(err) res.send(err);
                res.json({
                    success: true,
                    message: 'Page sorted successfully!'
                });
            });
        }
    )
};
exports.push_content_to_a_page = function(req, res){
    var p = {};
    p.survey_id = req.params.surveyId;
    p.page_id = req.params.pageId;
    p.content = req.body;
    Page.findById(
        { _id: p.page_id },
        function(err, _page){
            if(err) res.send(err);
            var newContent = new Content();
            newContent = collection.mixObject(p.content, newContent);
            _page.contents.push(newContent._id);
            _page.save(function(err){
                if(err) res.send(err);
                newContent.save(function(err){
                    if(err) res.send(err);
                    res.json({
                        success: true,
                        message: 'Content created successfully!'
                    });
                });
            });
        }
    );
};
exports.save_a_page = function(req, res) {
    var survey = {};
    survey.id = req.params.surveyId;
    survey.page_id = req.params.pageId;
    survey.content = req.body.content;
    survey.new_position = req.body.new_position;
    survey.old_position = req.body.old_position;
    Page.findById(
        { _id: survey.page_id },
        function(err, _page){
            if(err) res.send(err);
            if (survey.content._id === undefined) {
                var newContent = new Content();
                newContent = collection.mixObject(survey.content, newContent);
                _page.contents = collection.insertAt(_page.contents, survey.new_position, { _id: newContent._id } );
                newContent.save(function(err){
                    if(err) res.send(err);
                });
            } else {
                var new_contents_swap = collection.swap(_page.contents, survey.new_position, survey.old_position);
                _page.contents = [];
                _page.contents = new_contents_swap;
            }
            _page.save(function(err, _page){
                if(err) res.send(err);
                res.json({
                    success: true,
                    message: 'Content sorted successfully!'
                });
            });
        }
    );
};