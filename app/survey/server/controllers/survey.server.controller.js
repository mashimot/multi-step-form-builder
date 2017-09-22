'use strict';
var mongoose = require('mongoose');
var Survey = mongoose.model('Survey');
var Page = mongoose.model('Page');
var Content = mongoose.model('Content');

exports.list_all_surveys = function(req, res) {
    Survey.find({}, function(err, surveys) {
        if (err){ res.status(500).send(err); }
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
        .exec(function(err, surveys){
            if(err) return res.status(500).send(err);
            res.json({
                model: surveys
            });
        });
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


