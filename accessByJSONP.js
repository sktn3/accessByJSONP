'use strict';
/*********************************************************/
// access GAS --- JSON"P"
// JSONPでアクセス完了時に以下を実行し、タイムアウト待ち解除
// keyはcallbackとしてサーバから返してもらうこと
//
// AccessSuccessCheckList[key] = null;
// JSONPでアクセス中のリスト
var AccessSuccessCheckList = {};
function accessByJSONP(url, errfunc) {
    console.log(">> Call access");
    console.log(" URL " + url);
    var key = getUniqueStr();
    console.log(" key created by AccessSuccessCheckList [" + key + "]");
    var script = $("<script></script>");
    script.attr("src", url + "&key=" + key);
    $(document.head).append(script);
    AccessSuccessCheckList[key] = url;
    console.log(" access key [" + key + "]");
    console.log(" access url [" + AccessSuccessCheckList[key] + "]");
    script.on("error", function () {
        errfunc();
    });
    //呼び出しタイムアウトした場合の処理
    window.setTimeout(function (e) {
        if (accessSuccessCheck(key)) {
            console.log(" access Timeout key is cleared. " + key);
        }
        else {
            console.log(" Err access Timeout key [" + key + "]");
            var url_1 = accessSuccessURL(key);
            console.log(" URL " + url_1);
            //errfunc();
        }
    }, 30000); //タイムアウト待ち３０秒
    function accessSuccessURL(key) {
        return AccessSuccessCheckList[key];
    }
    function accessSuccessCheck(key) {
        if (AccessSuccessCheckList[key]) {
            return false;
        }
        else {
            return true;
        }
    }
    function getUniqueStr(myStrong) {
        //let strong = 1000;//copy元
        var strong = 100;
        if (myStrong)
            strong = myStrong;
        return ("k" + new Date().getTime().toString(16) +
            Math.floor(strong * Math.random()).toString(16));
    }
}
