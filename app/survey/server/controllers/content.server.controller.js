'use strict';

var mongoose = require('mongoose');
var Content = mongoose.model('Content');

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

