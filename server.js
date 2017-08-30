var express = require('express'),
    app = express(),
    path = require('path'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    /*Survey = require('./app/models/Survey'),
    Page = require('./app/models/Page'),
    Content = require('./app/models/Content'),*/
    Survey = require('./app/survey/server/models/survey.server.model'),
    Page = require('./app/survey/server/models/survey-page.server.model'),
    Content = require('./app/survey/server/models/survey-content.server.model'),
    bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'app')));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

//app.use(express.static(__dirname, '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/survey/server/routes/survey.server.routes')(app);
app.listen(port);


console.log('todo list RESTful API server started on: ' + port);