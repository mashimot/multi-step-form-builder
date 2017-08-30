(function () {
    'use strict';

    angular
        .module('survey')
        .run(menuConfig);

    menuConfig.$inject = ['menuService'];

    function menuConfig(menuService) {
        // Set top bar menu items
        menuService.addMenuItem('topbar', {
            title: 'Survey',
            state: 'survey.new'
        });
    }
}());
