'use strict';
var mongoose = require('mongoose');
var Survey = mongoose.model('Survey');
var Page = mongoose.model('Page');
var Content = mongoose.model('Content');

exports.list_all_surveys = function(req, res) {
    Survey.find({}, function(err, surveys) {
        if (err){ res.send(err); }
        res.json(surveys);
    });
};
exports.create_a_survey = function(req, res) {
    var new_survey = new Survey(req.body);
    new_survey.save(function(err, survey) {
        if (err){ res.send(err); } else {
            res.json(survey);
        }
    });
};

//return an entire survey page and content
exports.read_a_survey = function(req, res) {
    var survey = {};
    survey.id = req.params.surveyId;
    Survey.findOne(
        { _id: survey.id }
    ).populate({
            path: 'pages',
            populate: {
                path: 'contents',
                model: 'Content'
            }
        })
        .exec(function(err, model){
            if(err) res.send(err);
            res.json({
                success: true,
                model: model
            });
        });
};
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

//create a new page
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
            var newpage = arraymove(_survey.pages, old_position, new_position);
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
exports.create_a_content = function(req, res){
    var p = {};
    p.survey_id = req.params.surveyId;
    p.page_id = req.params.pageId;
    p.content = req.body;
    Page.findById(
        { _id: p.page_id },
        function(err, _page){
            if(err) res.send(err);
            var newContent = new Content();
            newContent = mixObject(p.content, newContent);
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
            if (typeof survey.content._id === "undefined") {
                var newContent = new Content();
                newContent = mixObject(survey.content, newContent);
                _page.contents.insert( survey.new_position, { _id: newContent._id } );
                newContent.save(function(err){
                    if(err) res.send(err);
                });
            } else {
                var new_contents_swap = swap(_page.contents, survey.new_position, survey.old_position);
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
exports.update_a_content = function(req, res){
    var i = {};
    i._id = req.params.contentId;
    i.content = req.body;
    //console.log(i);
    Content.findByIdAndUpdate(
        { _id: i._id },
        { '$set': i.content },
        function(err, model){
            if(err)
                res.send(err);
            res.json({
                success: true,
                message: 'Survey successfully updated'
            });
        }
    )
};

//Contents
exports.delete_a_content = function(req, res) {
    var p = {};
    p.page_id = req.params.surveyId;
    p.content_id = req.params.contentId;

    Content.findOne(
        { '_id' : p.content_id },
        function(err, input){
            if(err)
                res.send(err)
            input.remove(function(err, model) {
                if(err) res.send(err);
                res.json({
                    success: true,
                    message: 'Survey successfully deleted'
                });
            });
        }
    )
};
exports.update_a_survey = function(req, res) {
    Survey.findOneAndUpdate(req.params.surveyId, req.body, {new: true}, function(err, survey) {
        if (err) res.send(err);
        res.json(survey);
    });
};
exports.delete_a_survey = function(req, res) {
    Survey.remove({
        _id: req.params.surveyId
    }, function(err) {
        if (err)
            res.send(err);
        res.json({
            success: true,
            message: 'Survey successfully deleted'
        });
    });
};

function swap(input, index_A, index_B) {
    var temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;

    return input;
}
Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};
function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
}
function mixObject(source, target) {
    for(var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}