
# 備忘です

JSONP(JSON"P")でサーバへアクセスする際のあったら良いな関数です

# 特徴

- JSONPのためドメインの違うサイトからデータを取得できます
- タイムアウト検知処理
 - 一定時間、サーバから応答が無い場合を検知できる

# 注意

タイムアウト検知処理のため、ランダムな文字列（key）をURLにつけてJSONPでアクセスします。
サーバから、callback関数の引数として、keyを返してもらい、タイムアウトしていないことを確認します。
そのため、callbackにkeyを返せるようサーバ処理を変更する必要があります。

タイムアウト処理が不要な場合は、このサイトを参考にするべきではありません