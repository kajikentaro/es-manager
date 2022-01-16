## 就活 ES エディター

就活生のためのエントリーシートエディター
https://es-editor.kajindowsxp.com

## Feature

- バージョン管理<br/>変更履歴をすべて保存し、好きなバージョンにロールバック,
- 検索機能<br/>文章中の文字、企業名、項目名を併せて検索,
- 企業、項目別管理<br/>「ガクチカ」「長所」「志望動機」などの項目ラベルを付けて、まとめて管理,
- 文字数カウント<br/>一文字入力するごとにリアルタイム表示。(coming soon)更に指定文字数の目安となる目印を表示,
- ローカル保存 | (coming soon)クラウド保存<br/>端末内かクラウド、またはその両方に書いたデータを保存。更に word 形式でダウンロードすることも可能,
- (coming soon)コメントアウト機能<br/>一瞬思いついた語彙を逃さず保存。コメントとして記入することで、ダウンロードやまとめてコピー時にはその部分を無視して取得できます。

## How to Dev

1. docker-compose.yml と dev.Dockerfile を用意します
1. 空フォルダに入れ、`docker-compose up dev`コマンドを実行します
1. コンテナ`es_editor_dev`にアタッチ
1. `/root/es-editor/frontend`フォルダ内で`yarn dev`コマンドを実行する
1. http://localhost:3000 にアクセス

## How to Prod

1. このリポジトリをクローンします
1. `docker-compose up prod`を実行
1. ポート 4125 にサーバーが立ちます
