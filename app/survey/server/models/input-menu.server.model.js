var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InputSchema = new Schema({
    /*group_name: "Radio",
    icon_class: 'fa fa-dot-circle-o'
    inputs: [{
        name: 'radio group',
        input: {
            type: 'radio',
            elements: [{
                text: 'radio 1',
                value: '1'
            }, {
                text: 'radio 2',
                value: '2'
            }, {
                text: 'radio 3',
                value: '3'
            }]
        }
    }]*/
}, {
    timestamps: true
});
/*
{
    group_name: "Radio",
        icon_class: 'fa fa-dot-circle-o',
    inputs: [{
    name: 'radio group',
    content_to_drop: {
        input: {
            type: 'radio',
            elements: [{
                text: 'radio 1',
                value: '1'
            }, {
                text: 'radio 2',
                value: '2'
            }, {
                text: 'radio 3',
                value: '3'
            }]
        }
    }
}]
}

 */
var Input = mongoose.model('Input', InputSchema);