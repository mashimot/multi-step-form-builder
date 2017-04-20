
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

create.factory('SurveyBuilder', function(){
    var _form = null;
    var _keyC = 0;
    var _keyP = 0;

    var SurveyBuilder = function($scope){
        $scope.columns = getMainObject();
        _form = $scope.columns.form;
        _form.push(generateNewSection());

    };

    SurveyBuilder.prototype.setKeyC = function(keyC){
        _keyC = keyC;
    };
    SurveyBuilder.prototype.setKeyP = function(keyP){
        _keyP = keyP;
    };
    SurveyBuilder.prototype.config = function($uibModal){
        var type = getSection()[_keyP].input.type;
        var templateToLoad = getTemplateToLoad();
        var modalInstance = $uibModal.open({
            templateUrl: templateToLoad[type].templateUrl,
            controller: templateToLoad[type].controller,
            resolve: templateToLoad[type].resolve
        });
    }
    SurveyBuilder.prototype.add = function(numbers){
        var title = [];
        if(numbers !== undefined){
            var fLength = _form.length;
            var hasNewSection = false;
            /*var pageRegex = /<page>([\s\S]*?)<\/page>/g;
            var radioRegex = /<radio>([\s\S]*?)<\/radio>/g;
            var newPage, newRadio;

            while (newPage = pageRegex.exec(numbers)) {
                if (fLength <= 0) {
                    _form.push(generateNewSection());
                }
                //hasNewSection = true;
                fLength = _form.length - 1;
                if (fLength >= 0) {
                    var questions = _form[fLength].sections;
                    while (newRadio = radioRegex.exec(newPage[1])) {
                        var qL = questions.length;
                        var r = newRadio[1].replace(/^\s+|\s+$/g, '').split('\n');
                        if (r.length > 0) {
                            questions.push({input: {'type': 'radio', contents: []}}) ;
                            for (var i = 0; i < r.length; i++) {
                                questions[qL].input.contents.push({
                                    text: r[i].trim(),
                                    value: r[i].trim()
                                })
                            }
                        }
                    }
                }
            }*/
            var nums = numbers.split('\n');
            if (nums.length > 0) {
                if (fLength <= 0) {
                    _form.push(generateNewSection());
                }
                angular.forEach(nums, function (value) {
                    fLength = _form.length - 1;
                    var questions = _form[fLength].sections;
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
                                questions[qL].titles = title;
                                questions[qL].number = number;
                                questions[qL].description = description;
                                questions[qL].input.type = type;

                                if(hasNewSection){
                                    _keyC = fLength;
                                    _keyP = qL;
                                    createNewBlock(hasNewSection);
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
    };

    SurveyBuilder.prototype.add = function(){
        _form.push(generateNewSection());
    };
    SurveyBuilder.prototype.configPages = function(){
        var fL = _form.length;
    };
    SurveyBuilder.prototype.remove = function(){
        getSection().splice(_keyP, 1);
    };
    SurveyBuilder.prototype.clone = function(){
        var nextIndex = _keyP + 1;
        getSection().insert(nextIndex, getQuestion());
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
            "sections": []
        };
    };
    var getQuestion = function(){
        return {
            "titles": [], // string
            //"number": '', // int
            //"description": 'Description: ' + Math.random(), // string
            //"isHide": false, // boolean
            //"isHideWhen": '', // boolean
            //"isRequired": true, // boolean
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
            }
        };
    };
    var getSection = function(){
        return _form[_keyC].sections;
    };
    var createNewBlock = function(hasNewSection){
        var question = getSection();
        if(hasNewSection) {
            if (_keyC === 0) {
                if (_keyP !== 0) {
                    _form.insert(_keyC + 1, generateNewSection());
                    pushTo('next');
                    question.splice(_keyP, question.length);
                }
            } else {
                _form.insert(_keyC + 1, generateNewSection());
                pushTo('next');
                question.splice(_keyP, question.length);
            }
        } else {
            pushTo('previous');
            _form.splice(_keyC, 1);
        }
    };
    var pushTo = function(copyTo){
        var p = _form[_keyC].sections, qlength = p.length;
        var k = (copyTo === 'next')? (_keyC + 1) : (_keyC - 1);
        for(var i = _keyP; i < qlength; i++ ){
            _form[k].sections.push(p[i]);
        }
    };
    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };
    var getTemplateToLoad = function(){
        return {
            'radio': {
                templateUrl: 'radioTemplate.html',
                controller: RadioModalController,
                resolve: { //passa variavel para o modal, no caso a variavel p.
                    p: function () {
                        return getSection()[_keyP];
                    }
                }
            },
            'checkbox': {
                templateUrl: 'radioTemplate.html',
                controller: RadioModalController,
                resolve: { //passa variavel para o modal, no caso a variavel p.
                    p: function () {
                        return getSection()[_keyP];
                    }
                }
            }
        };
    };
    var RadioModalController = function ($scope, $uibModalInstance, p) {
        $scope.p = p;

        $scope.removeContent = function($index){
            getContent().splice($index, 1);
        };
        $scope.addToInput = function(string){
            var error = {};
            if(typeof string !== 'undefined'){
                var strlen = string.length;
                if(strlen > 0){
                    setContentToEmpty();
                    for(var i = 0; i < strlen; i++){
                        getContent().push({
                            text: string[i],
                            value: string[i]
                        });
                    }
                } else {
                    error.hasError = true;
                    error.message = "Adicione um Valor";
                }
            } else {
                error.hasError = true;
                error.message = "Adicione um Valor";
            }
            if(error.hasError){
               alert(error.message);
            }
        };
        $scope.addContent = function(){
            getContent().push({text: '', value: ''});
        };
        $scope.ok = function () {
            $uibModalInstance.close();
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('Cancelar');
        };
        var setContentToEmpty = function(){
            p.input.contents = [];
        };
        var getContent = function(){
            return p.input.contents;
        };
    };

    return SurveyBuilder;

});
