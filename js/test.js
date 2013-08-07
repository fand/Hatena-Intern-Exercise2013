"use strict";

QUnit.module("課題 JS-1");

QUnit.test("関数定義の確認", function () {
    QUnit.ok(typeof parseLTSVLog === "function", "`parseLTSVLog` という名前の関数がある");
});

QUnit.test("`parseLTSVLog` 関数の動作確認", function () {
    var logStr;
    var logRecords;

    logStr = "path:/\treqtime_microsec:500000\n";
    logRecords = parseLTSVLog(logStr);
    QUnit.deepEqual(logRecords, [
        { path: "/", reqtime_microsec: 500000 }
    ], "1 行のみのログデータが期待通りパースされる");

    logStr =
        "path:/\treqtime_microsec:400000\n" +
        "path:/uname\treqtime_microsec:123456\n" +
        "path:/\treqtime_microsec:500000\n";
    logRecords = parseLTSVLog(logStr);
    QUnit.deepEqual(logRecords, [
        { path: "/",      reqtime_microsec: 400000 },
        { path: "/uname", reqtime_microsec: 123456 },
        { path: "/",      reqtime_microsec: 500000 }
    ], "3 行からなるログデータが期待通りパースされる");

    logStr = "";
    logRecords = parseLTSVLog(logStr);
    QUnit.deepEqual(logRecords, [], "空文字列を渡したときは空の配列を返す");

    // テストを追加する場合は、この下に追加しても構いませんし、
    // `QUnit.test` 関数や `QUnit.asyncTest` 関数を用いて別に定義しても良いです。

});

QUnit.module("課題 JS-2");

QUnit.test("関数定義の確認", function () {
    QUnit.ok(typeof createLogTable === "function", "`createLogTable` という名前の関数がある");
});

QUnit.test("`createLogTable` 関数の動作確認", function () {
    // #qunit-fixture という要素は、QUnit が自動的に後片付けしてくれる要素
    var fixtureElem = document.getElementById("qunit-fixture");
    var elem = fixtureElem.appendChild(document.createElement("div"));

    createLogTable(elem, [
        { path: "/", reqtime_microsec: 400000 },
        { path: "/uname", reqtime_microsec: 123456 },
        { path: "/", reqtime_microsec: 500000 },
    ]);

    QUnit.strictEqual(elem.childNodes.length, 1, "渡した要素に子ノードが 1 つ追加されている");
    var tableElem = elem.firstChild;
    QUnit.strictEqual(tableElem.tagName, "TABLE", "渡した要素に追加された子ノードは table 要素");

    QUnit.strictEqual(tableElem.childNodes.length, 2, "table 要素の子ノードは 2 個");
    var theadElem = tableElem.firstChild;
    QUnit.strictEqual(theadElem.tagName, "THEAD", "table 要素の 1 つ目の子ノードは thead 要素");
    QUnit.strictEqual(theadElem.childNodes.length, 1, "thead 要素の子ノードは 1 個");
    var tbodyElem = theadElem.nextSibling;
    QUnit.strictEqual(tbodyElem.tagName, "TBODY", "table 要素の 2 つ目の子ノードは tbody 要素");
    QUnit.strictEqual(tbodyElem.childNodes.length, 3, "tbody 要素の子ノードは 3 個");

    var expectedTrElem = document.createElement("tr");

    var actualTheadTrElem = theadElem.firstChild;
    expectedTrElem.innerHTML = "<th>path</th><th>reqtime_microsec</th>";
    QUnit.ok(expectedTrElem.isEqualNode(actualTheadTrElem),
            "thead 要素の子要素の tr 要素の中身: " + expectedTrElem.innerHTML);

    var actualTbodyTrElem = tbodyElem.firstChild;
    expectedTrElem.innerHTML = "<td>/</td><td>400000</td>";
    QUnit.ok(expectedTrElem.isEqualNode(actualTbodyTrElem),
            "tbody 要素の子要素の 1 番目の tr 要素の中身: " + expectedTrElem.innerHTML);

    actualTbodyTrElem = actualTbodyTrElem.nextSibling;
    expectedTrElem.innerHTML = "<td>/uname</td><td>123456</td>";
    QUnit.ok(expectedTrElem.isEqualNode(actualTbodyTrElem),
            "tbody 要素の子要素の 2 番目の tr 要素の中身: " + expectedTrElem.innerHTML);

    actualTbodyTrElem = actualTbodyTrElem.nextSibling;
    expectedTrElem.innerHTML = "<td>/</td><td>500000</td>";
    QUnit.ok(expectedTrElem.isEqualNode(actualTbodyTrElem),
            "tbody 要素の子要素の 3 番目の tr 要素の中身: " + expectedTrElem.innerHTML);

    // テストを追加する場合は、この下に追加しても構いませんし、
    // `QUnit.test` 関数や `QUnit.asyncTest` 関数を用いて別に定義しても良いです。

});




QUnit.module("課題 JS-5");

QUnit.test("関数定義の確認", function () {
    QUnit.ok(typeof transformUrl === "function", "`transformUrl` という名前の関数がある");       QUnit.ok(typeof parseRes === "function", "`parseRes` という名前の関数がある"); 
    QUnit.ok(typeof parseDat === "function", "`parseDat` という名前の関数がある");
});

QUnit.test("`transformUrl` 関数の動作確認", function () {

    QUnit.deepEqual(transformUrl(""), "", "空行が期待通りパースされる");
    QUnit.deepEqual(
        transformUrl("http://anago.2ch.net/gline/dat/1373774042.dat"),
        "http://anago.2ch.net/gline/dat/1373774042.dat",
        "`.dat`で終わるURLが期待通りパースされる");

    QUnit.deepEqual(transformUrl("http://anago.2ch.net/test/read.cgi/gline/1373774042/"),
                    "http://anago.2ch.net/gline/dat/1373774042.dat",
                   "スレURLが期待通りパースされる");

    QUnit.deepEqual(transformUrl("anago.2ch.net/test/read.cgi/gline/1373774042/"),
                    "http://anago.2ch.net/gline/dat/1373774042.dat",
                   "`http://`抜きのスレURLが期待通りパースされる");
    
});

QUnit.test("`parseRes` 関数の動作確認", function () {
    var res = "水先案名無い人<><>2013/08/05(月) 16:51:19.61 ID:p6K6PJcx0<> だったらコラテラルダメージを見ればいいだろ <>";
    var res_sage = "水先案名無い人<>sage<>2013/07/22(月) 23:47:35.02 ID:cZh3NA4U0<> ロードは何章まであるんですか？ <>";

    var elem = $("#qunit-fixture");    
    elem.append($(parseRes(res)));
    QUnit.strictEqual(elem[0].childNodes.length, 2, "渡した要素に子ノードが 2 つ追加されている");

    QUnit.strictEqual(elem[0].childNodes[0].tagName, "A", "子ノードの最初の要素は a 要素");
    QUnit.strictEqual(elem[0].childNodes[1].tagName, "DIV", "子ノードの最初の要素は div 要素");
    QUnit.strictEqual(elem.find(".username")[0].tagName, "SPAN", "ユーザ名は span 要素");

    elem.empty();
    elem.append($(parseRes(res_sage)));
    QUnit.strictEqual(elem.find(".username")[0].tagName, "A", "メールアドレス付きユーザは a 要素");
});

QUnit.test("`parseDat` 関数の動作確認", function () {
    var dat = "デフォルトの名無しさん<><>2007/07/15(日) 16:16:50 <> 俺、がんばる。みてて。 <>Perlを使って２ちゃんねるにHello Worldを書き込む\nデフォルトの名無しさん<>sage<>2007/07/15(日) 16:23:17 <> とりあえず、http://www.activestate.com/ からperlをインストール。 <br>  <br> というか、すでに入っているんだけど^^; <>\nデフォルトの名無しさん<>sage<>2007/07/15(日) 16:46:02 <> さて、httpをしゃべるライブラリには何を使ったら良いだろうか？ <br> むかしLWP::Simpleを使ったことはあるとはいえ、 <br> Simpleっていうぐらいだからもっと高度なことをするときには <br> 別のものがいいのだろうか？ <br>  <>";
    
    var elem = $("#qunit-fixture");    
    elem.append($(parseDat(dat)));
    var thread = elem.find("#thread_title")[0];
    console.log(elem.children("a"));
    QUnit.strictEqual(elem.children("a").length, 3, "レス数の分だけ a 要素（ラベル）が存在する");
    QUnit.strictEqual(elem.children("#thread_title").length, 1, "スレタイ要素がただ 1 つ存在する");

});
