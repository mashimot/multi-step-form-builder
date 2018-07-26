var express = require('express'),
    app = express(),
    path = require('path'),
    port = process.env.PORT || 3001,
    mongoose = require('mongoose'),
    Survey = require('./app/survey/server/models/survey.server.model'),
    Page = require('./app/survey/server/models/page.server.model'),
    Content = require('./app/survey/server/models/content.server.model'),
    Input = require('./app/survey/server/models/input-menu.server.model'),
    bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'app')));

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Tododb', { useMongoClient: true });
mongoose.connection.openUri('mongodb://localhost/Tododb');

//app.use(express.static(__dirname, '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/survey/server/routes/survey.server.routes')(app);
require('./app/survey/server/routes/page.server.routes')(app);
require('./app/survey/server/routes/content.server.routes')(app);
require('./app/survey/server/routes/input-menu.server.routes')(app);

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);