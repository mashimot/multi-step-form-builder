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
var SurveySchema = new Schema({
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

var PageSchema = new Schema({
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
function toLower (v) {
    console.log(v);
}
var InputSchema = new Schema({
    name: String,
    number: String,
    description: {
        type: String,
        lowercase: true
    },
    isRequired: Boolean,
    isHide: Boolean,
    isHideWhen: {
        type: String,
        lowercase: true
    },
    "input": {
        "type": {
            type: String,
            enum: ["radio", "checkbox", "comments", "net-promoter-score"],
            required: true
        },
        "elements": [{
            _id: false,
            "text": String,
            "value": String
        }]
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

InputSchema.pre("save", function (next) {
    console.log(this.description);
    this.description = 'joeysworldtour';
    next();
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
function deleteEmpty (v) {
    if(v== ''){
        return undefined;
    }
    return v;
}

var Input = mongoose.model('Input', InputSchema);
var Page = mongoose.model('Page', PageSchema);
var Survey = mongoose.model('Survey', SurveySchema);
