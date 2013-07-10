// 課題 JS-1: 関数 `parseLTSVLog` を記述してください
var parseLTSVLog = function(logStr){
    
    // 区切り文字の正規表現
    var re_nl = /\s*\n\s*/;
    var re_tab = /\s*\t\s*/;
    var re_colon = /\s*:\s*/;

    // 空白文字列は削除
    var lines = logStr.split(re_nl).filter(function(e){return e != "";});

    var records = [];
    
    for (var i=0; i < lines.length; i++) {
        var fields = lines[i].split(re_tab).filter(function(e){return e != "";});

        var str_json = "";

        for (var j=0; j < fields.length; j++) {
            var f = fields[j].split(re_colon);
            var key = '\"' + f[0] + '\"';
            var value = (f[1].match(/\D/gi))? ('\"' + f[1] + '\"') : f[1];
            // var value = f[1];
            // value = (value.match(/\D/gi))? ('\"' + value + '\"') : value;
            str_json += key + ":" + value;

            // , の処理
            // JSON.parseは , にうるさい…
            if (j != fields.length - 1) {
                str_json += ",";
            }
        }
        str_json = "{" + str_json + "}";

        records.push(JSON.parse(str_json));
    }
    return records;
};


// 課題 JS-2: 関数 `createLogTable` を記述してください
