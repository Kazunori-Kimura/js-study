# Node.js & React勉強会 ~ JavaScriptでWebアプリケーションをガッツリ作ろう!

Node.js & ReactによるWebアプリケーションの開発を通してモダンなJavaScript開発について知る

対象:
- プログラム経験者
- 言語問わずWebアプリケーション経験があれば理解しやすいと思います

## 勉強会予定

1. Node.js開発環境の整備と取り上げるWebアプリの仕様
2. expressによるWebAPI構築
3. Reactによるフロントエンド開発

開発環境はピュアなWindows 10
サーバーはGitHubとheroku

## 1. Node.js開発環境の整備と取り上げるWebアプリの仕様

### Gitのインストール

今回、herokuとGitHubを使いますが、どちらもGitが必須です。
開発マシンには必ずインストールしましょう。

### Node.jsのインストール

Node.jsの公式サイトからインストーラをダウンロードしてもいいですが、
Node.jsはバージョンアップが非常に早いのでバージョン管理ツールを使用します。

#### Windowsの場合

nvm-windows?
nodist?

#### MacOSの場合

nvm

### 参考: Node.jsの歴史

- io.jsについて
- リリースサイクルとLTSについて

### Visual Studio Codeのインストール

### eslintのインストール

### 参考: eslintについて

### 参考: ECMA Scriptについて

### Visual Studio Codeのeslint設定

### 参考: npmについて

### Hello, World!

動作確認も兼ねて、`HelloWorld` を作りましょう。

#### プロジェクトフォルダの作成

npm init

#### Visual Studio Codeでapp.jsを作成

#### node.jsで実行する

#### npm-scriptで実行する

npm start
npm run xxx

### 取り上げるWebアプリ

#### Demo

#### システム構成

サーバーレスな感じで作ります

- WebAPI: heroku
- FrontEnd: GitHub

#### 参考: herokuについて

#### 参考: GitHubについて

### 次回予告



## 2. expressによるWebAPI構築

### おさらい: 取り上げるWebアプリのシステム構成

### Redisのインストール

### 参考: Redisについて

### WebAPIの設計

#### データ構造

```
# アンケート
enquete {list}

enquete:<id> {hash}
  title {string}
  description {string}
  enabled {boolean}
  createAt {string} UTC(iso形式)とする
  updateAt {string} UTC(iso形式)とする

# 設問のリスト
enquete:<id>/question {list}

# 設問
enquete:<id>/question:<id> {hash}
  body {string}
  type {string} single/multi
  createAt {string} UTC(iso形式)とする
  updateAt {string} UTC(iso形式)とする

# 選択肢
enquete:<id>/question:<id>/choice {list} 選択肢の表示順
enquete:<id>/question:<id>/choice:<id> {string} 選択肢の文字列

# 回答
enquete:<id>/question:<id>/user:<userid> {set} choiceのidをsetに格納
```

ここまで書いて思ったけど、Redisに向いていない題材だな...

~~Redisのデータ設計はRDBと違ってちょっと発想の転換が必要です。~~

#### URI設計

- GET: /enquete

[
  {
    id,
    title,
    description,
    order,
    createAt,
    updateAt,
  }
]

- POST: /enquete

{
  title,
  description,
  order,
}

- GET: /enquete/{id}

{
  id,
  title,
  description,
  order,
  createAt,
  updateAt,
  questions: [
    {
      id,
      body,
      type,
      order,
      createAt,
      updateAt,
      choices: [
        {
          id,
          text,
          order,
          createAt,
          updateAt,
        }
      ]
    }
  ]
}

- PUT: /enquete/{id}

{
  title,
  description,
  order,
  enabled,
}

- DELETE: /enquete/{id}

- POST: /enquete/{id}/question

{
  body,
  type,
  order,
}

- PUT: /enquete/{id}/question/{id}

{
  body,
  type,
  order,
}

- DELETE: /enquete/{id}/question/{id}

- POST: /enquete/{id}/question/{id}/choice

{
  text,
  order,
}

- PUT: /enquete/{id}/question/{id}/choice/{id}

{
  text,
  order,
}

- DELETE: /enquete/{id}/question/{id}/choice/{id}

- POST: /enquete/{id}/ask

[
  {
    user_id,
    enquete_id,
    question_id,
    choice_id,
    createAt,
  }
]

- POST: /login

{
  username,
  password,
}

- POST: /logout

{
  token,
}

### 参考: REST APIとは？

### WebAPI実装

#### プロジェクトフォルダの作成

#### expressのインストール

#### app.js

#### model

#### router

#### nodemonの導入

### 参考: modules.exportsとrequire

### 参考: UUIDとは

> *UUID（Universally Unique Identifier）* とは、ソフトウェア上でオブジェクトを一意に識別するための識別子である。UUIDは128ビットの数値だが、十六進法による`550e8400-e29b-41d4-a716-446655440000` というような文字列による表現が使われることが多い。元来は分散システム上で統制なしに作成できる識別子として設計されており、したがって将来にわたって重複や偶然の一致が起こらない前提で用いることができる。

v1 ~ v5 まであり、v4はランダムな値で生成される。

### 参考: POSTMANによる動作確認


#### 認証機能の実装 (1)

- login
- logout

### 参考: middlewareとは

#### 認証機能の実装 (2)

- authenticate

### 参考: JsonWebTokenについて

### 参考: CORSについて

### 環境変数による設定管理

### herokuへのアップロード

### POSTMANでの動作確認

### 次回予告



## 3. Reactによるフロントエンド開発

### おさらい: 取り上げるWebアプリのデモ

### おさらい: 取り上げるWebアプリのシステム構成

### おさらい: 取り上げるWebアプリの設計

### Reactのインストール

create-react-app

### 参考: Reactとは

### Reactの起動とデバッグ

### 画面設計

#### 管理画面

#### 回答画面

#### 集計画面

### 管理画面の作成

#### 認証機能の実装

#### 参考: import/exportについて

#### 参考: fetchについて

#### 参考: localStorageについて

#### アンケート作成機能の実装

#### 設問作成機能の実装

#### 環境変数による設定管理

#### 動作確認

### 回答画面の作成

#### react-routerによる画面遷移

[react-router@v4を使ってみよう：シンプルなtutorial - Qiita](https://qiita.com/m4iyama/items/b4ca1773580317e7112e)

#### アンケート・設問の表示

#### 参考: Componentの設計思想

#### 参考: ライフサイクルメソッド

#### 回答機能の実装

### 集計画面の作成

#### 円グラフ表示のライブラリ導入

#### Reactのbuild

### GitHubでの公開

### 動作確認
