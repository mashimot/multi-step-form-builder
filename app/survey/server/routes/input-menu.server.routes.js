'use strict';

module.exports = function(app){

    var input = require('../controllers/input-menu.server.controller');

    //app.route('/api/input').get(input.list_all_inputs);
    app.route('/api/input/seed').get(input.seeding_inputs);
    app.route('/api/input/').get(input.showAll);
};


