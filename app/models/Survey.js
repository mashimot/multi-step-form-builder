'use strict'
/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SurveySchema = new Schema({
    name: String,
    sections: [{
        contents: [{
            name: String,
            description: String,
            input: {
                _type: String,
                contents: [
                    {
                        _id: false,
                        "text": String,
                        "value": String
                    }
                ]
            }
        }]
    }]
});

module.exports = mongoose.model('Survey', SurveySchema);*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const SurveySchema = new Schema({
    name: String,
    pages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Page'
        }
    ]
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

const PageSchema = new Schema({
    name: String,
    contents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Input'
        }
    ]
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

const InputSchema = new Schema({
    name: String,
    number: String,
    description: String,
    "input": {
        "_type": String,
        "elements": [{
            _id: false,
            "text": String,
            "value": String
        }]
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});
PageSchema.pre('remove', function(next) {
    var page = this;
    page.model('Survey').update(
        {},
        { $pull: { pages: page._id } },
        { multi: true },
        next
    );
});
InputSchema.pre('remove', function(next) {
    var input = this;
    input.model('Page').update(
        {},
        { $pull: { contents: input._id } },
        { multi: true },
        next
    );
    //this.smodel('Page').remove({ pages: this._id }, next);
});
const Input = mongoose.model('Input', InputSchema);
const Page = mongoose.model('Page', PageSchema);
const Survey = mongoose.model('Survey', SurveySchema);
