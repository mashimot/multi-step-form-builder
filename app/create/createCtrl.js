var create = angular.module('app');
create.controller('createCtrl', [ '$scope', '$uibModal', 'SurveyBuilder', function($scope, $uibModal, SurveyBuilder){
    var Survey = new SurveyBuilder($scope);
    $scope.types = type();
    $scope.string = '';
    $scope.add = function(){
        var msg = Survey.add($scope.numbers);
        /*if(msg !== 'success'){
            alert(msg);
        }*/
    };
    $scope.developer = function(){
        $.ajax({
            //url: 'geraFormulario2.php',
            url: 'http://localhost/daniel/Projetos/2016/only-human/main.php',
            type: 'POST',
            data:  {
                data : JSON.stringify($scope.columns)
            },
            success: function (data) {
                console.log(data);
                var resultado = JSON.parse(data);
                //$('.resultado').html(data);
                alert(resultado);
                $('#htmlResult').html(resultado.arquivoHTML);
                $('#javascriptResult').html(resultado.arquivoJavascript);
                $('#customScriptResult').html(resultado.customScript);
                $('#showOrhideScriptResult').html(resultado.showOrhideScript);
            }
        });
    };
    $scope.config = function(keyC, keyP){
        Survey.setKeyC(keyC);
        Survey.setKeyP(keyP);
        Survey.config($uibModal);
    };
    $scope.configPages = function(keyC, keyP){
        Survey.setKeyC(keyC);
        Survey.setKeyP(keyP);
        Survey.configPages();
    };
    $scope.removeAll = function(){
        Survey.removeAll();
    };
    $scope.clone = function(keyC, keyP){
        Survey.setKeyC(keyC);
        Survey.setKeyP(keyP);
        Survey.clone();
    };

    $scope.remove = function(keyC, keyP){
        Survey.setKeyC(keyC);
        Survey.setKeyP(keyP);
        Survey.remove();
    };

    $scope.updateType = function(p){
        var types = type();
        var value = p.input.type;
        p.input.contents = [];
        angular.forEach(types, function(d){
            if(d.value === value){
                angular.forEach(d.content.split('\n'), function(c){
                    p.input.contents.push({
                        text: c,
                        value: c
                    });
                });
                return false;
            }
        });
    };

    var isUnChanged = false;
    var shouldRemoveWhen = {
        'description' : '',
        'number' : '',
        'isRequired' : false,
        'isHide' : false,
        'isHideWhen' : ''
    };
    $scope.$watch(function(){
        if (!isUnChanged) {
            for(var i = 0; i < $scope.columns.form.length; i++) {
                var d = $scope.columns.form[i];
                for(var j = 0; j < d.sections.length; j++) {
                    var s = d.sections[j];
                    for (var key in s) {
                        if (s.hasOwnProperty(key)) {
                            if(s[key] === shouldRemoveWhen[key]){
                                delete s[key];
                                break;
                            }
                        }
                    }
                }
            }
        }
    });
    $scope.sortableContents = {
        items: '.sortable-item-contents'
    };
}]);

var type = function(){
    return [
        {
            "value": "discordo",
            "text": "Discordo",
            "content": "Concordo Totalmente\nConcordo\nNão concordo nem discordo\nDiscordo\nDiscordo Totalmente\nNA (Não Aplicável)",
        },
        {
            "value": "satisfeito",
            "text": "Satisfeito",
            "content": "Muito insatisfeito\nInsatisfeito\nNem satisfeito e Nem insatisfeito\nSatisfeito\nMuito Satisfeito\nNA (Não Aplicável)"
        },
        {
            "value": "escala0a10_comNA",
            "text": "NPS (de 0 a 10) com NA",
            "content": ""
        },

        {
            "value": "conhecoYNUseiYN_VariasPergunta",
            "text": "Conheco(SIM/NAO) | Usei (SIM/NAO) Várias",
            "content": ""
        },
        {
            "value": "conhecoYNUseiYN_1Pergunta",
            "text": "Conheco(SIM/NAO) | Usei (SIM/NAO)",
            "content": ""
        },
        {
            "value": "justifica",
            "text": "Somente Justifica",
            "content": ""
        },
        {
            "value": "SIM-NAO",
            "text": "SIM-NAO",
            "content": "SIM\nNÃO"
        },
        {
            "value": "SIM-NAO-NA",
            "text": "SIM-NAO-NA",
            "content": "SIM\nNÃO\nNA (Não Aplicável)"
        },
        {
            "value": "NPS",
            "text": "NPS Contaminado?",
            "content": "SIM\nNÃO"
        },
        {
            "value": "Identificacao",
            "text": "Pergunta Identificação",
            "content": "SIM\nNÃO"
        },
        {
            "value": "listaMelhores",
            "text": "Lista Melhores",
            "content": ""
        },
        {
            "value": "radio",
            "text": "Radio",
            "content": ""
        },
        {
            "value": "checkbox",
            "text": "Checkbox",
            "content": ""
        },
        {
            "value": "select",
            "text": "select-option",
            "content": ""
        },
        {
            "value": "FRBEN_mesmaLinha",
            "text": "FRBEN_mesmaLinha",
            "content": ""
        },
        {
            "value": "radio_comJustifica",
            "text": "RADIO COM JUSTIFICA",
            "content": ""
        },
        {
            "value": "chkBox_mesmaLinha",
            "text": "chkBox_mesmaLinha",
            "content": ""
        },
        {
            "value": "text-inputs",
            "text": "text-inputs",
            "content": ""
        },
        {
            "value": "percent",
            "text": "percent",
            "content": ""
        },
        {
            "value": "nao-participou",
            "text": "nao-participou",
            "content": ""
        }
    ];
}

