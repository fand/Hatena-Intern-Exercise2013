// parse whole dat file
function parseDat(dat){
    var thread = "";
    var lines = dat.split("\n");

    // thread title
    var title = lines[0].split("<>")[4];
    thread += "<div class='thread_title'>" + title + "<div>";

    // parse responses
    for (var i = 0; i < lines.length; i++) {
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
        res += "<span class='username'>" + line[0] + "</span>";
    }
    else {
        res += "<a class='username' href='mailto:'" + line[1] + "'>" + line[0] + "</a>";
    }

    // time, id
    res += "<span class='time'>" + line[2] + "</span>";
    
    // text
    res += "<div class='res_text'>" + line[3] + "</div>";

    // res number
    res = "<a name='#" + num + "'></a><div class='res'>" + num + ": " + res + "</div>";
    
    return res;
}


$(function(){
    
    // url
    $("#draw-url").click(function(){
        var t_url = $("#url-input").val();
        $.ajax({
            type: "POST",
            url: "cgi-bin/load.pl",
            data: "url="+ t_url,
            dataType: "text",
            success: function(dat){
                console.log(dat);                
                $("#thread").html(parseDat(dat));
            },
            error: function(msg){
                $("#thread").html("error: " + msg);                
            }
        });
    });
    
    $("#draw-dat").click(function(){
        var dat = $("#dat-input").val();
        $("#thread").html(parseDat(dat));
    });

    
    $().click(function(){
        $("#dat-textarea").fadeIn();
    });
    
});
