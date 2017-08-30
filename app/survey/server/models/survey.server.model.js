'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SurveySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required : true
    },
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

var Survey = mongoose.model('Survey', SurveySchema);
