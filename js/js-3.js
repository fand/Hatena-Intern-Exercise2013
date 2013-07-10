// 課題 JS-3 の実装をここに記述してください。
$("submit-button").addEventListener("click", function(){
    var log = $("log-input").value;
    var dst = $("table-container");

    // make sure there is only 1 table.
    if (dst.innerHTML == "") {
        createLogTable(dst, parseLTSVLog(log));
    }
});

// getElementById
function $(id){
    return document.getElementById(id);
}
