'use strict';
var mongoose = require('mongoose');
var Survey = mongoose.model('Survey');
var Page = mongoose.model('Page');
var Content = mongoose.model('Content');

exports.list_all_surveys = async (req, res) => {
    Survey.find({}, function(err, surveys) {
        if (err){ res.status(500).send(err); }
        res.status(200).json(surveys);
    });
};

exports.create_a_survey = async (req, res) => {
    var new_survey = new Survey(req.body);
    new_survey.save(function(err, survey) {
        if (err){ 
            res.status(500).send(err); 
        } else {
            res.status(200).json(survey);
        }
    });
};

//return an entire survey page and content
exports.read_a_survey = async (req, res) => {
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

            res.status(200).json({
                model: surveys
            });
        });
};

exports.update_a_survey = async (req, res) => {
    Survey.findOneAndUpdate(req.params.surveyId, req.body, {new: true}, function(err, survey) {
        if (err) res.status(500).send(err);
        res.status(200).json(survey);
    });
};

exports.delete_a_survey = async (req, res) => {
    Survey.remove({
        _id: req.params.surveyId
    }, function(err) {
        if (err) res.status(500).send(err);

        res.status(200).json({
            success: true,
            message: 'Survey successfully deleted'
        });
    });
};


