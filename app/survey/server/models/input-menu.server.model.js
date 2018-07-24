var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InputSchema = new Schema({
    group_name: String,
    icon_class: String,
    name: String,
    "input": {
        "type": {
            type: String,
            enum: ["radio", "title", "checkbox", "comments", "net-promoter-score", "gradient", "identification", "conheco", "select"],
            required: true
        },
        title: {
            text: { type: String },
            color: {
                type: String,
                trim: true
            }
        },
        "elements": [{
            _id: false,
            "text": String,
            "value": String
        }]
    }
}, {
    timestamps: true
}, {
    usePushEach: true 
});

var Input = mongoose.model('Input', InputSchema);