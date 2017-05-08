'use strict';
var mongoose = require('mongoose');
var Survey = mongoose.model('Survey');
var Page = mongoose.model('Page');
var Input = mongoose.model('Input');

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
            //return res.redirect('/#/survey/' + survey._id);
            res.json(survey);
        }
    });
};

//return an entire survey page and content
exports.read_a_survey = function(req, res) {
    var s = {};
    s.survey_id = req.params.surveyId;
    Survey.findOne(
        { _id: s.survey_id }
    ).populate({
            path: 'pages',
            populate: {
                path: 'contents',
                model: 'Input'
            }
        })
        .exec(function(err, survey){
            if(err)
                res.send(err);
            res.json(survey)
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
    /* Single Survey Schema
    Survey.findByIdAndUpdate(
        { _id: survey.id },
        { $push: {'sections': { contents: [] } } },
        function(err, survey){
            if(err)
                res.send(err)
            res.json(survey);
        }
    );*/
    Survey.findById({ _id: s.id }, function(err, survey) {
        if (err)
            res.send(err);
        var number = survey.length + 1;
        //survey is finded
        var new_page = new Page({
            name: 'joeysworldtour'
        });
        survey.pages.push({ _id: new_page._id });
        new_page.save();
        survey.save();
        res.json(survey);
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
            res.json(model)
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
        function(err, s){
            if(err){
                res.send(err);
            } else {
                var newpage = arraymove(s.pages, old_position, new_position);
                s.pages = [];
                s.pages = newpage;
                s.save();
                res.json(s);
            }
        }
    )

}

exports.save_per_page = function(req, res) {
    var survey = {};
    survey.id = req.params.surveyId;
    survey.page_id = req.params.pageId;
    survey.content = req.body.content;
    survey.new_position = req.body.new_position;
    survey.old_position = req.body.old_position;
    console.log(survey.page_id);
    //return false;
    Page.findById(
        { _id: survey.page_id },
        function(err, pg){
            if(err){
                res.send(err);
            } else {
                var content = survey.content;
                var new_position = survey.new_position;
                var old_position = survey.old_position;

                if (typeof content._id === "undefined") {
                    var inpt = new Input();
                    inpt.input.type = content.input.type;
                    inpt.input.elements = content.input.elements;
                    //pg.contents.push({_id: inpt._id});
                    pg.contents.insert(new_position, {_id: inpt._id});
                    inpt.save();
                } else {
                    var new_contents_swap = swap(pg.contents, new_position, old_position);
                    pg.contents = [];
                    pg.contents = new_contents_swap;
                }
                pg.save();
                res.json(pg);
            }
        }
    );
};

//Contents
exports.delete_a_content = function(req, res) {
    var p = {};
    p.page_id = req.params.sectionId;
    p.content_id = req.params.contentId;

    Input.findOne(
        { '_id' : p.content_id },
        function(err, input){
            if(err)
                res.send(err)
            input.remove(function(err, model) {
                if(err)
                    res.send(err);
                res.json(model)
            });
        }
    )
};
exports.update_a_survey = function(req, res) {
    Survey.findOneAndUpdate(req.params.surveyId, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};
exports.delete_a_survey = function(req, res) {
    Survey.remove({
        _id: req.params.surveyId
    }, function(err, survey) {
        if (err)
            res.send(err);
        res.json({
            success: true,
            text: 'Survey successfully deleted'
        });
    });
};

function swap(input, index_A, index_B) {
    console.log('-> before : ');
    console.log(input);

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