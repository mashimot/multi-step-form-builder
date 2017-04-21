create.factory('SurveyService', function(){
    var _form = null;
    var _keyC = 0;
    var _keyP = 0;

    var SurveyService = function(keyC, keyP, form){
        _keyC = keyC;
        _keyP = keyP;
        _form = form;
    };
    SurveyService.prototype.remove = function(){
        this.getSections().splice(_keyP, 1);
    };
    SurveyService.prototype.clone = function(newObj){
        var nextIndex = _keyP + 1;
        this.getSections().insert(nextIndex, newObj);
    };
    SurveyService.prototype.add = function(numbers){
        var title = [];
        if(numbers !== undefined){
            var fLength = _form.length;
            console.log(fLength);

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
                if (fLength < 1) {
                    _form.push({sections:[]});
                }
                //angular.forEach(nums, function (value) {
                for(var i = 0; i < nums.length; i++){
                    var value =  nums[i];
                    fLength = _form.length - 1;
                    var sections = _form[fLength].sections;
                    if (fLength >= 0) {
                        var qL = sections.length;
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
                                sections.insert(qL, {});
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

                                sections[qL].input = sections[qL].input || {};
                                sections[qL].input.type = type || 'radio';
                                sections[qL].number = number || '';
                                sections[qL].description =  description || 'Description: ' + ( i + 1 );
                                sections[qL].input.contents = [{text: 'radio1', value: 'radio1'}] || contents;

                                //set values
                                //sections[qL].titles !== 'undefined'? title : '' ;
                                                 /*sections[qL].titles = title;
                                sections[qL].number = number;
                                sections[qL].description = description;
                                sections[qL].input.type = type;*/

                                if(hasNewSection){
                                    _keyC = fLength;
                                    _keyP = qL;
                                    this.createNewBlock(hasNewSection);
                                }
                                title = [];
                                hasNewSection = false;
                            }
                        }
                    }
                }
                //});
                return 'success';
            } else {
                return 'empty';
            }
        } else {
            return 'empty';
        }
    };
    SurveyService.prototype.createNewBlock = function(hasNewSection){
        var question = this.getSections();
        if(hasNewSection) {
            if (_keyC === 0) {
                if (_keyP !== 0) {
                    _form.insert(_keyC + 1, { sections:[] });
                    pushTo('next');
                    question.splice(_keyP, question.length);
                }
            } else {
                _form.insert(_keyC + 1, { sections:[] });
                pushTo('next');
                question.splice(_keyP, question.length);
            }
        } else {
            pushTo('previous');
            _form.splice(_keyC, 1);
        }
    };
    SurveyService.prototype.getSections = function(){
        //returns the entire section (whole page by number (_keyC))
        return _form[_keyC].sections;
    };
    SurveyService.prototype.getSection = function(){
        return _form[_keyC].sections[_keyP];
    };
    SurveyService.prototype.setKeyC = function(keyC){
        _keyC = keyC;
    };
    SurveyService.prototype.setKeyP = function(keyP){
        _keyP = keyP;
    };

    SurveyService.prototype.getKeyC = function(){
        return _keyC;
    };
    SurveyService.prototype.getKeyP = function(){
        return _keyP;
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
    return SurveyService;
});