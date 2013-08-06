// submitボタンを押すとテーブルを表示
$("submit-button").addEventListener("click", function(){
    var log = $("log-input").value;
    var dst = $("table-container");

    // テーブルが重複していないことを確認し、要素を追加
    if (dst.innerHTML == "") {
        createLogTable(dst, parseLTSVLog(log));
    }
});

// alias for getElementById
function $(id){
    return document.getElementById(id);
}
