'use strict';

var mongoose = require('mongoose');
var Input = mongoose.model('Input');

exports.list_all_inputs = function(req, res){
    Input.find({}, function(err, inputs){
        if(err) return res.send(err);
        res.json(inputs);
    });
    //res.redirect('https://www.youtube.com/watch?v=QlbmiLcX2sQ');
};