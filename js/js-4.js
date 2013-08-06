function parseLTSVLog(logStr){
    
    // 区切り文字の正規表現
    var re_nl = /\s*\n\s*/;
    var re_tab = /\s*\t\s*/;
    var re_colon = /\s*:\s*/;

    // 空白文字列は削除
    var lines = _.without(logStr.split(re_nl), "");

    // JSON文字列に変換してparseし、まとめて return する
    return _.map(lines, function(line){
        var fields = _.without(line.split(re_tab), "");

        var str_json = _.map(fields, function(field){
            // valueが数値の場合、(") を付けてはいけない
            var f = field.split(re_colon);
            var key = '\"' + f[0] + '\"';
            var value = (f[1].match(/\D/gi))? ('\"' + f[1] + '\"') : f[1];
            return key + ":" + value;
        }).join(',');
        
        str_json = "{" + str_json + "}";
        return JSON.parse(str_json);
    });
};


// jQueryオブジェクトを受けとるように変更
function createLogTable(dst, obj){

    var keys = _.keys(obj[0]);

    // thead 内部を生成
    var head = _.map(keys, function(key){
        return "<th>" + key + "</th>";
    }).join("");
    
    // tbody 内部を生成
    var body = _.map(obj, function(rec){
        var row = _.map(rec, function(value, key){
            return "<td>" + value + "</td>";
        }).join("");
        return "<tr>" + row + "</tr>";
    }).join("");
    
    // 結合して表示
    dst.append("<table><thead><tr>" + head + "</tr></thead>" + 
               "<tbody>" + body + "</tbody></table>");
};


// submitボタンを押すとテーブルを表示
$(function(){
    $("#submit-button").click(function(){
        var log = $("#log-input").val();
        var dst = $("#table-container");
        
        // テーブルが重複していないことを確認し、要素を追加        
        if (dst.html() == "") {
            createLogTable(dst, parseLTSVLog(log));
        }
    });
});
