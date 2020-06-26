'use strict';
/*********************************************************/
// access GAS --- JSON"P"
// タイムアウト待ち解除はcallback関数内で以下を実行
//   AccessSuccessCheckList[key] = null;
// keyはcallbackとしてサーバから返してもらうこと
function callback(data, key) {
    AccessSuccessCheckList[key] = null;
}
// JSONPでアクセス中のリスト
// レスポンスタイムアウトをチェックする
var AccessSuccessCheckList = {};
// JSONPでアクセスする関数
function accessByJSONP(url, errfunc) {
    console.log(">> Call access");
    console.log(" URL " + url);
    var key = createUniqueStr();
    console.log(" key created by AccessSuccessCheckList [" + key + "]");
    var script = document.createElement("script");
    script.src = url + "&key=" + key; //一意となるkeyを勝手に追加
    document.head.appendChild(script);
    AccessSuccessCheckList[key] = url;
    console.log(" access key [" + key + "]");
    console.log(" access url [" + AccessSuccessCheckList[key] + "]");
    script.onerror = function (e) {
        console.log(" Error on accessByJSONP");
        errfunc();
    };
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
    function createUniqueStr(myStrong) {
        //let strong = 1000;//copy元
        var strong = 100;
        if (myStrong)
            strong = myStrong;
        return ("k" + new Date().getTime().toString(16) +
            Math.floor(strong * Math.random()).toString(16));
    }
}
