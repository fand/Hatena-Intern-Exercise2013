// 課題 JS-1: 関数 `parseLTSVLog` を記述してください
function parseLTSVLog(logStr){
    
    // 区切り文字の正規表現
    var re_nl = /\s*\n\s*/;
    var re_tab = /\s*\t\s*/;
    var re_colon = /\s*:\s*/;

    // return する配列
    var records = [];
    
    // 空白文字列は削除
    var lines = logStr.split(re_nl).filter(function(e){return e != "";});

    // 1行ずつJSON文字列に変換してparseし、records に格納する
    for (var i=0; i < lines.length; i++) {
        var fields = lines[i].split(re_tab).filter(function(e){return e != "";});

        var str_json = "";

        for (var j=0; j < fields.length; j++) {
            // valueが数値の場合、(") を付けてはいけない
            var f = fields[j].split(re_colon);
            var key = '\"' + f[0] + '\"';
            var value = (f[1].match(/\D/gi))? ('\"' + f[1] + '\"') : f[1];
            str_json += key + ":" + value;

            // (,) の処理. JSON.parseは (,) にうるさい…
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
function createLogTable(dst, obj){
    var table = document.createElement("table");
    var head = "", body = "";
    var keys = [];

    // thead 内部を生成
    for (var key in obj[0]) {
        head += "<th>" + key + "</th>";
        keys.push(key);
    }

    // tbody 内部を生成
    // (配列は for in 構文では回せないので、for 文で処理)
    for (var i=0; i < obj.length; i++) {
        body += "<tr>";
        for (var j=0; j < keys.length; j++) {
            body += "<td>" + obj[i][keys[j]] + "</td>";
        }
        body += "</tr>";
    }

    // 結合して表示
    table.innerHTML = "<thead><tr>" + head + "</tr></thead>" + "<tbody>" + body + "</tbody>";
    dst.appendChild(table);
};
