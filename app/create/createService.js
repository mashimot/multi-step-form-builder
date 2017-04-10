
create.service('EditFormCollection', function(){
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

create.factory('blockEdit', function(){
    var _form = [];
    var keyC = 0;
    var keyP = 0;
    var key = {};

    key.setKeyC = function(key){
        keyC = key;
    };
    key.setKeyP = function(key){
        keyP = key;
    };
    var init = function(scope){
        scope.newQuestions = [];
        scope.newQuestions.push(getQuestion());
        scope.columns = getMainObject();
        scope.sortableSection = {
            connectWith: ".connected-apps-container",
            stop: function (e, ui) {
                // if the element is removed from the first container
                if ($(e.target).hasClass('first') &&
                    ui.item.sortable.droptarget &&
                    e.target != ui.item.sortable.droptarget[0]) {
                    // clone the original model to restore the removed item
                    scope.newQuestions.push(getQuestion());
                }
            }
        };
        _form = scope.columns.form;
    };
    var add = function(numbers){
        var title = [];
        if(numbers !== undefined){
            var fLength = _form.length;
            var hasNewSection = false;
            var nums = numbers.split('\n');
            if (nums.length > 0) {
                if (fLength <= 0) {
                    _form.push(generateNewSection());
                }
                angular.forEach(nums, function (value) {
                    fLength = _form.length - 1;
                    var questions = _form[fLength].section;
                    if (fLength >= 0) {
                        var qL = questions.length;
                        if(qL >= 0){
                            var description = null, contents = null, number = null, type = 'radio', splitValues = [];
                            if(value.indexOf('[title]') != -1) {
                                var text = value.split("[title]");
                                title.push({
                                    text: text[1],
                                    type: ''
                                });
                            } else if(value.indexOf('**new**') != -1){
                                hasNewSection = true;
                            } else {
                                questions.insert(qL, getQuestion());
                                if (value.indexOf('|') != -1) {
                                    splitValues = value.split("|");
                                    angular.forEach(splitValues, function(v, i){
                                        v = v.trim();
                                        switch(i){
                                            case 0:
                                                number = v;
                                                break;
                                            case 1:
                                                description = v;
                                                break;
                                            case 2:
                                                type = v;
                                                break;
                                            case 3:
                                                contents = v;
                                                contents = (contents !== undefined)? contents.split(',') : [];
                                                break;
                                            default:
                                                break;
                                        }
                                    });
                                } else {
                                    number = value;
                                    description = "";
                                }

                                //set values
                                questions[qL].hasNewSection = hasNewSection;
                                questions[qL].titles = title;
                                questions[qL].number = number;
                                questions[qL].description = description;
                                questions[qL].input.type = type;
                                //questions[qL].input.contents = contents;

                                if(hasNewSection){
                                    keyC = fLength;
                                    keyP = qL;
                                    createNewBlock();
                                }
                                title = [];
                                hasNewSection = false;
                            }
                        }
                    }
                });
                return 'success';
            } else {
                return 'empty';
            }
        } else {
            return 'empty';
        }
        //_form.push(generateNewSection());
    };
    var createNewBlock = function(){
        var question = _form[keyC].section;
        var currentQuestion = question[keyP];
        if(currentQuestion.hasNewSection) {
            if (keyC === 0) {
                if (keyP !== 0) {
                    _form.insert(keyC + 1, generateNewSection());
                    pushTo('next');
                    question.splice(keyP, question.length);
                }
            } else {
                _form.insert(keyC + 1, generateNewSection());
                pushTo('next');
                question.splice(keyP, question.length);
            }
        } else {
            pushTo('previous');
            _form.splice(keyC, 1);
        }
    };
    var remove = function(type){
        var question = _form[keyC].section;
        var currentQuestion = question[keyP];
        if(type === 'section'){
            _form.splice(keyC, 1);
        } else {
            if(question.length > 1){
                question.splice(keyP, 1);
                if(currentQuestion.hasNewSection){
                    pushTo('previous');
                    _form.splice(keyC, 1);
                }
            } else {
                _form.splice(keyC, 1);
            }
        }
    };
    var removeAll = function(){
        _form = init();
    };
    var clone = function(){
        var nextIndex = keyP + 1;
        _form[keyC].section.insert(nextIndex, getQuestion());
    };
    var getMainObject = function(){
        return {
            "id": null,
            "formType": 1, //default (formulário telefonico)
            "surveyName": null,
            "projectName": null,
            "form": []
        };
    };
    var generateNewSection = function(){
        return {
            "blockPos": Math.random(),
            "section": []
        };
    };
    var getQuestion = function(){
        return {
            //"hasNewSection": false,
            "titles": [], // string
            "number": null, // int
            "description": 'Description: ' + Math.random(), // string
            "option": {
                "isHide": false, // boolean
                "hasJustifica": true, // boolean
                "isRequired": true // boolean
            },
            "input": {
                type: 'radio',
                contents: [{
                    text: 'radio 1',
                    value: '1'
                },{
                    text: 'radio 2',
                    value: '2'
                },{
                    text: 'radio 3',
                    value: '3'
                }]
            },
            "conditional-statements": []
        };
    };
    var pushTo = function(copyTo){
        var p = _form[keyC].section, qlength = p.length;
        var k = (copyTo === 'next')? (keyC + 1) : (keyC - 1);
        for(var i = keyP; i < qlength; i++ ){
            _form[k].section.push(p[i]);
        }
    };
    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };
    return {
        init: init,
        key: key,
        createNewBlock: createNewBlock,
        add: add,
        remove: remove,
        removeAll: removeAll,
        clone: clone
    }
});
