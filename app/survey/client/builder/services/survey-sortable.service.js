angular.module('survey')
    .service('SortableService', function(){
        this.objectToDrop = false;

        this.setObjectToDrop = function(object){
            this.objectToDrop = object;
        };
        this.getObjectToDrop = function(){
            return this.objectToDrop;
        };
    });