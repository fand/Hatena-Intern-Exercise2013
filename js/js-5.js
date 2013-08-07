// datファイルのURLを生成
function transformUrl(url){
    if (url === "") { return url; }
    if (url.match(/.*\.dat$/)) { return url; }

    // スキーム"http://"を取り除く
    if (url.match(/:\/\//)) {
        url = url.split("://")[1];
    }

    // ドメイン、板名、スレIDからURL生成
    var paths = url.match(/^(.*\.2ch\.net)\/.*\.cgi\/([^\/]*)\/([0-9]*)\/?/);
    url = "http://" + paths[1] + "/" + paths[2] + "/dat/" + paths[3] + ".dat";
        
    return url;
}


// datファイルをパース
function parseDat(dat){
    var thread = "";
    var lines = dat.split("\n");

    // スレタイ取得
    var title = lines[0].split("<>")[4];
    thread += "<div id='thread_title'>" + title + "</div>";

    // 各レスをパース
    for (var i = 0; i < lines.length; i++) {
        if (lines[i] === "") {
            continue;
        }
        thread += parseRes(lines[i], i+1);
    }

    return thread;
}


// レス1件をパース
function parseRes(line, num){

    var res = "";
    var l = line.split("<>");
    
    // ユーザ名、メールアドレス
    // メールアドレスがある場合はmailtoリンク作成
    if (l[1] == "") {
        res += "<span class='username'><b>" + l[0] + "</b></span>";
    }
    else {
        res += "<a class='username' href='mailto:" + l[1] + "'><b>" + l[0] + "</b></a>";
    }

    // time, id
    res += "<span class='time'>" + l[2] + "</span>";
    
    // レス本文
    var text = l[3];
    res += "<div class='res_text'>" + text + "</div>";

    // レス番号
    res = "<a name='#" + num + "'></a><div class='res'>" + num + ": " + res + "</div>";
    
    return res;
}


$(function(){
    
    // ボタンを押すとスレ描画
    $("#get-thread").click(function(){
        
        $("#thread").html("<div id='loading'>Loading...</div>");
        var thread_url = transformUrl($("#url-input").val());
        
        if (thread_url !== "") {
            
            $.ajax({
                type: "POST",
                url: "cgi-bin/load.pl",
                data: "url="+ thread_url,
                dataType: "text",
                success: function(dat){
                    $("#thread").html(parseDat(dat));
                    $("html, body").animate({
                        scrollTop:  $("#thread").offset().top
                    }, "slow");
                },
                error: function(msg){
                    $("#thread").html("error: " + msg);                
                }
            });
            
        } else {
            
            var dat = $("#dat-input").val();
            $("#thread").html(parseDat(dat));
            $('html,body').animate({
                scrollTop:  $("#thread").offset().top
            }, 'slow');
            
        }
    });

});
