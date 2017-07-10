var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
    name: String,
    number: String,
    description: {
        type: String
    },
    isRequired: Boolean,
    isHide: Boolean,
    hasOther: Boolean,
    isHideWhen: {
        type: String,
        lowercase: true
    },
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

ContentSchema.pre("save", function (next) {
//    this.options.runValidators = true;
    this.description = 'Add Your Question';
    if(this.input.type == 'title'){
        this.input.title.text = 'Title';
        this.description = undefined;
        this.isRequired = undefined;
    }
    next();
});

ContentSchema.pre('remove', function(next) {
    var content = this;
    content.model('Page').update(
        {},
        { $pull: { contents: content._id } },
        { multi: true },
        next
    );
    //this.smodel('Page').remove({ pages: this._id }, next);
});

var Content = mongoose.model('Content', ContentSchema);