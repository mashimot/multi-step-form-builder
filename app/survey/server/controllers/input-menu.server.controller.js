'use strict';

var mongoose = require('mongoose');
var Input = mongoose.model('Input');

exports.showAll = async (req, res) => {
    html.find({}, [], {'group': 'html.tag'}).sort('html.tag').exec(function(err, input){
        if(err) return res.status(500).send(err);
        res.status(200).send(input);
    });
};

exports.seeding_inputs = async (req, res) => {
    const inputs =  [
        {
            group_name: "Radio",
            icon_class: 'fa fa-dot-circle-o',
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
        },
        {
            group_name: "Checkbox",
            icon_class: 'fa fa-dot-circle-o',
            name: "Checkbox",
            input: {
                type: 'checkbox',
                elements: [{
                    text: 'checkbox 1',
                    value: '1'
                }, {
                    text: 'checkbox 2',
                    value: '2'
                }, {
                    text: 'checkbox 3',
                    value: '3'
                }]
            }
        },
        {
            group_name: "Radio",
            icon_class: 'fa fa-dot-circle-o',
            name: 'Sim/Não',
            input: {
                type: 'radio',
                elements: [{
                    text: 'Sim',
                    value: 'Sim'
                }, {
                    text: 'Não',
                    value: 'Não'
                }]
            }
        },
        {
            group_name: "Select",
            icon_class: 'fa fa-dot-circle-o',
            name: 'Sim/Não',
            input: {
                type: 'select',
                elements: [{
                    text: 'Sim',
                    value: 'Sim'
                }, {
                    text: 'Não',
                    value: 'Não'
                }]
            }
        }, {
            group_name: "Gradients",
            icon_class: 'fa fa-dot-circle-o',
            name: 'disagreement',
            input: {
                type: 'gradient',
                elements: [{
                    text: 'Discordo plenamente',
                    value: '1'
                }, {
                    text: 'Discordo parcialmente',
                    value: '2'
                }, {
                    text: 'Não concordo nem discordo',
                    value: '3'
                }, {
                    text: 'Concordo parcialmente',
                    value: '4'
                }, {
                    text: 'Concordo plenamente',
                    value: '5'
                }, {
                    text: 'NA (Não Aplicável)',
                    value: '0'
                }]
            }
        },
        {
            group_name: "Textarea",
            icon_class: 'fa fa-commenting-o',
            name: 'comments',
            input: {
                type: 'comments'
            }
        }, {
            group_name: "Title",
            icon_class: 'fa fa-header',
            name: 'H1',
            input: {
                type: 'title',
                title: {
                    text: 'Title',
                    color: '#FFFFFF'
                }
            }
        },
        {
            group_name: "Net Promoter Score",
            icon_class: 'fa fa-commenting-o',
            name: 'net-promoter-score',
            input: {
                type: 'net-promoter-score',
                elements: [{
                    text: '0',
                    value: '0'
                }, {
                    text: '1',
                    value: '1'
                }, {
                    text: '2',
                    value: '2'
                }, {
                    text: '3',
                    value: '3'
                }, {
                    text: '4',
                    value: '4'
                }, {
                    text: '5',
                    value: '5'
                }, {
                    text: '6',
                    value: '6'
                }, {
                    text: '7',
                    value: '7'
                }, {
                    text: '8',
                    value: '8'
                }, {
                    text: '9',
                    value: '9'
                }, {
                    text: '10',
                    value: '10'
                }]
            }
        }, {
            group_name: "Custom Input's Per Company",
            icon_class: 'fa fa-user-o',
            name: 'identification',
            input: {
                type: 'identification'
            }
        }
    ];

    // use the Event model to insert/save
    for (var input of inputs) {
        var newEvent = new Input(input);
        newEvent.save();
    }

    // seeded!
    res.status(200).send('Database seeded!');
}

exports.list_all_inputs = async (req, res) => {
    html.find({}, function(err, inputs){
        if(err) return res.status(500).send(err);
        res.status(200).json(inputs);
    });
    //res.redirect('https://www.youtube.com/watch?v=QlbmiLcX2sQ');
};