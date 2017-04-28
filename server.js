var express = require('express'),
    app = express(),
    path = require('path'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Survey = require('./app/models/Survey'),
    Page = require('./app/models/Survey'),
    Input = require('./app/models/Survey'),
    bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'app')));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

//app.use(express.static(__dirname, '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/routes')(app);
app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
