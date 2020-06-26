
'use strict';

/*********************************************************/
// access GAS --- JSON"P"


// JSONPでアクセス完了時に以下を実行し、タイムアウト待ち解除
// keyはcallbackとしてサーバから返してもらうこと
//
// AccessSuccessCheckList[key] = null;


// JSONPでアクセス中のリスト
var AccessSuccessCheckList:  { [key: string]: string; } = {};

function accessByJSONP(url:string, errfunc: Function):void{
    console.log(">> Call access");
    console.log(" URL " +url);

    const key = getUniqueStr();
    console.log(" key created by AccessSuccessCheckList ["+key+"]");

    const script: JQuery = $("<script></script>");
    script.attr("src", url+"&key="+key);
    $(document.head).append(script);

    AccessSuccessCheckList[key] = url;
    console.log(" access key ["+key+"]");
    console.log(" access url ["+AccessSuccessCheckList[key]+"]");

    script.on("error", function(): void{
        errfunc();
    });

    //呼び出しタイムアウトした場合の処理
    window.setTimeout(function(e){
        if(accessSuccessCheck(key)){
            console.log(" access Timeout key is cleared. "+key);
        }else{
            console.log(" Err access Timeout key ["+key+"]");
            const url = accessSuccessURL(key);
            console.log(" URL " +url);
            //errfunc();
        }
    },30000);//タイムアウト待ち３０秒


    function accessSuccessURL(key: string): string{
        return AccessSuccessCheckList[key];
    }
    function accessSuccessCheck(key: string): boolean{
        if( AccessSuccessCheckList[key] ){
            return false;
        }else{
            return true;
        }
    }

    function getUniqueStr(myStrong?: number): string {
        //let strong = 1000;//copy元
        let strong = 100;
        if (myStrong) strong = myStrong;
        return (
          "k" + new Date().getTime().toString(16) +
          Math.floor(strong * Math.random()).toString(16)
        );
    }
}

