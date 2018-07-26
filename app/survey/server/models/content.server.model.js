var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
    name: String,
    number: String,
    html: {
        category: String,
        description: {
            type: String
        }, 
        label: String,       
        tag: {
            type: String,
            enum: ["radio", "select", "checkbox", "title", "textarea", "net-promoter-score", "gradient"],
            required: true
        },
        elements: [{
            _id: false,
            text: String,
            value: String
        }],        
        title: {
            text: { type: String },
            color: {
                type: String,
                trim: true
            }            
        },
        hasOther: Boolean,
        isHide: Boolean,
        isHideWhen: {
            type: String,
            lowercase: true
        },        
    },
    table: {
        nullable: Boolean,
        columnName: String
    }
},{
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to false
});

ContentSchema.pre("save", function (next) {
//    this.options.runValidators = true;
    if(typeof this.html.description == 'undefined' && this.html.tag != 'title')
        this.description = 'Add your Question';
    if(this.html.tag == 'title' && this.html.title.text == ''){
            this.html.title.text ='Title';
        this.html.description = undefined;
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