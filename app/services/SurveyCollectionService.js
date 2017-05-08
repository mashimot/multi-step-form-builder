app.service('SurveyCollectionService', function(){
    this.getKeyValue = function(array){
        var keys = [];
        var values = [];
        var tam = array.length;
        for (var i = 0; i < tam; i++) {
            keys.push(i);
            values.push(array[i]);
        }
        return {
            keys: keys,
            values: values
        }
    };
    this.webForm = function(contents){
        var newContent = [];
        var lastPos = contents.length - 1;
        var value = 0;
        for(var i = 0; i <= lastPos ; i++){
            var text =  contents[i];
            if(i === lastPos){
                value = 0;
            } else {
                value = lastPos - i;
            }
            newContent.push({
                text: text,
                value: value
            });
        }
        return newContent;
    };
    this.telForm = function(contents){
        var newContent = [];
        var lastPos = contents.length - 1;
        var lastObj = {};
        for(var i = lastPos; i >= 0; i--) {
            var obj = new Object();
            var text =  contents[i];
            if(i === lastPos){
                lastObj.value = 0;
                lastObj.text = text;
            } else {
                obj.text  = text;
                obj.value = lastPos - i;
                newContent.push(obj);
            }
        }
        newContent.push(lastObj);
        return newContent;
    };
    this.createGroupedArray = function(arr, chunkSize){
        var groups = [], i;
        for (i = 0; i < arr.length; i += chunkSize) {
            groups.push(arr.slice(i, i + chunkSize));
        }
        return groups;
    };
});