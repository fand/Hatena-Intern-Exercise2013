// transform thread url to .dat url
function transformUrl(url){
    if (url === "") { return url; }
    if (url.match(/.*\.dat$/)) { return url; }

    // get rid of scheme "http://"
    if (url.match(/:\/\//)) {
        url = url.split("://")[1];
    }

    // get domain, board name, thread id
    var paths = url.match(/^(.*\.2ch\.net)\/.*\.cgi\/([^\/]*)\/([0-9]*)\/?/);
    url = "http://" + paths[1] + "/" + paths[2] + "/dat/" + paths[3] + ".dat";
        
    return url;
}


// parse whole dat file
function parseDat(dat){
    var thread = "";
    var lines = dat.split("\n");

    // thread title
    var title = lines[0].split("<>")[4];
    thread += "<div id='thread_title'>" + title + "</div>";

    // parse responses
    for (var i = 0; i < lines.length; i++) {
        if (lines[i] === "") {
            continue;
        }
        var l = lines[i].split("<>");
        thread += parseRes(l, i+1);
    }

    return thread;
}


// parse 1 res
function parseRes(line, num){

    var res = "";
    
    // username, email
    if (line[1] == "") {
        res += "<span class='username'><b>" + line[0] + "</b></span>";
    }
    else {
        res += "<a class='username' href='mailto:'" + line[1] + "'><b>" + line[0] + "</b></a>";
    }

    // time, id
    res += "<span class='time'>" + line[2] + "</span>";
    
    // text
    var text = line[3];
    res += "<div class='res_text'>" + text + "</div>";

    // res number
    res = "<a name='#" + num + "'></a><div class='res'>" + num + ": " + res + "</div>";
    
    return res;
}


$(function(){
    
    // url
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
