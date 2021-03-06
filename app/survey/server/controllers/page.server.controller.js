'use strict';

var mongoose = require('mongoose');
var Survey = mongoose.model('Survey');
var Page = mongoose.model('Page');
var Content = mongoose.model('Content');
var collection = require('../common/survey.collection');

//return page with content
exports.list_all_pages = async (req, res) => {
    Page.find({}, function(err, pages) {
        if (err)
            res.status(500).send(err);
        res.status(200).json(pages);
    });
};

exports.read_a_page = async (req, res) =>{
    var s = {};
    s.survey_id = req.params.surveyId;
    s.page_id = req.params.pageId;
    Page.findById(
        s.page_id
    ).populate('contents')
        .exec(function(err, page){
            if(err)
                res.status(500).send(err)
            res.status(200).json(page);
        });
};

exports.new_page = async (req, res) => {
    var s = {
        id: req.params.surveyId
    };
    Survey.findById({ _id: s.id }, function(err, survey) {
        if (err)
            res.status(500).send(err);
        //survey is finded
        var new_page = new Page({
            name: 'page name'
        });
        new_page.save(function(err){
            if(err) res.status(500).send(err);
            survey.pages.push({ _id: new_page._id });
            survey.save(function(err){
                console.log(err);
                if(err) res.status(500).send(err);
                res.status(200).json({
                    success: true,
                    message: 'Page created successfully!'
                });
            });
        });
    });
};

//remove entire page
exports.delete_a_page = async (req, res) => {
    var s = {
        id: req.params.surveyId,
        page_id: req.params.pageId
    };
    Page.findOne({ '_id' : s.page_id }, function(err, pg) {
        pg.remove(function(err, model) {
            if(err) res.status(500).send(err);
            res.status(200).json({
                success: true,
                message: 'Page deleted successfully!'
            });
        });
    });
};

exports.sort_page = async (req, res) => {
    var survey = {};
    survey.survey_id = req.params.surveyId;
    var new_position = req.body.new_position;
    var old_position = req.body.old_position;
    /*Survey.findOne(
        { _id: survey.survey_id },
        function(err, doc) {
            if(err) return res.send(err);
            var $doc = {};
            $doc["pages." + new_position] = doc.pages[old_position];
            $doc["pages." + old_position] = doc.pages[new_position];

            Survey.update(
                { _id: survey.survey_id },
                {
                    $set: $doc
                },
                function(err){
                    if(err) return res.send(err);
                    res.json({
                        success: true,
                        message: 'Page sorted successfully!'
                    });
                }
            )
        }
    );*/
    // Segundo Modo:
    Survey.findById(
        { _id: survey.survey_id },
        function(err, _survey){
            if(err) res.status(500).send(err);
            var newpage = collection.arraymove(_survey.pages, old_position, new_position);
            _survey.pages = [];
            _survey.pages = newpage;
            _survey.save(function(err){
                if(err) res.status(500).send(err);
                res.status(200).json({
                    success: true,
                    message: 'Page sorted successfully!'
                });
            });
        }
    )
};

exports.save_a_page = async (req, res) => {
    var survey = {};
    survey.id = req.params.surveyId;
    survey.page_id = req.params.pageId;
    survey.content = req.body.content;
    survey.new_position = req.body.new_position;
    survey.old_position = req.body.old_position;
    Page.findById(
        { _id: survey.page_id },
        function(err, _page){
            if(err) res.status(500).send(err);
            if (survey.content._id === undefined) {
                var newContent = new Content();
                newContent = collection.mixObject(survey.content, newContent);
                _page.contents = collection.insertAt(_page.contents, survey.new_position, { _id: newContent._id } );
                newContent.save(function(err){
                    if(err) res.status(500).send(err);
                });
            } else {
                var new_contents_swap = collection.swap(_page.contents, survey.new_position, survey.old_position);
                _page.contents = [];
                _page.contents = new_contents_swap;
            }
            _page.save(function(err, _page){
                if(err) res.status(500).send(err);
                res.status(200).json({
                    success: true,
                    message: 'Content sorted successfully!'
                });
            });
        }
    );
};