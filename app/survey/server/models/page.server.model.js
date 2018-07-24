var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({
    name: String,
    contents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Content'
        }
    ]
}, {
    versionKey: false // You should be aware of the outcome after set to false
}, {
    usePushEach: true 
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

var Page = mongoose.model('Page', PageSchema);
