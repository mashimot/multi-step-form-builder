(function() {
    'use strict';
    function ThemeSwitcherDirective(){
        var defaultTheme = '//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/sandstone/bootstrap.min.css';
        return {
            restrict: 'E',
            scope: {
                themes: '='
            },
            template: `<div class="well well-sm">
            <label>Select your Theme</label>
            <select ng-model="urlCSS" ng-change="change()" ng-options="t.url as t.name for t in themes" class="form-control"></select>
            </div>`,
            controller: function($scope){
                $scope.uniqueId = Date.now();
            },
            link: function(scope){
                var id = 'theme-switcher-' + scope.uniqueId;
                angular.element(document.querySelectorAll('head')).append('<link id="' + id + '" href="" rel="stylesheet">');

                scope.themes = [
                    { name: "Amelia", url: "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/amelia/bootstrap.min.css"},
                    { name: "Cerulean", url: "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/cerulean/bootstrap.min.css"},
                    { name: "Cosmo", url: "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/cosmo/bootstrap.min.css"},
                    { name: "Cyborg", url: "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/cyborg/bootstrap.min.css"},
                    { name: "Flatly", url: "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/flatly/bootstrap.min.css"},
                    { name: "Journal", url: "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/journal/bootstrap.min.css"},
                    { name: "Readable", url: "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/readable/bootstrap.min.css"},
                    { name: "Simplex", url: "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/simplex/bootstrap.min.css"},
                    { name: "Slate", url: "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/slate/bootstrap.min.css"},
                    { name: "Spacelab", url: "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/spacelab/bootstrap.min.css"},
                    { name: "United", url: "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/united/bootstrap.min.css"},
                    { name: "Sandstorm", url: "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/sandstone/bootstrap.min.css"},
                    { name: "Yeti", url: "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/yeti/bootstrap.min.css"}
                ];
                scope.urlCSS = {};

                scope.change = function(){
                    var selector = angular.element(document.querySelectorAll('#' + id))[0];
                    selector.href = scope.urlCSS;
                };
            }
        }
    }
    angular.module('theme.switcher', [])
        .directive('themeSwitcher', ThemeSwitcherDirective);
})();