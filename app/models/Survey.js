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
    timestamps: true,
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
            enum: ["radio", "title", "checkbox", "comments", "net-promoter-score"],
            required: true
        },
        title: {
            text: { type: String },
            color: {
                type: String,
                trim: true,
                required: false
            }
        },
        "elements": [{
            _id: false,
            "text": String,
            "value": String
        }]
    }
}, {
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to false
});

InputSchema.pre("save", function (next) {
    this.description = 'question';
    if(this.input.type == 'title'){
        this.input.title.text = 'Title';
        this.description = undefined;
        this.isRequired = undefined;
    }
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
