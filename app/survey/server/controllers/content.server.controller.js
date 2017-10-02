'use strict';

var mongoose = require('mongoose');
var Page     = mongoose.model('Page');
var Content  = mongoose.model('Content');
var collection = require('../common/survey.collection');

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

exports.push_content_to_a_page = function(req, res){
    var p = {};
    p.survey_id = req.params.surveyId;
    p.page_id = req.params.pageId;
    p.content = req.body;
    delete p.content._id;
    //console.log(p.content._id);
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