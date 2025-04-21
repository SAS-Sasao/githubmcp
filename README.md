# GitHub MCP サーバー

このMCPサーバーは、GitHubのAPIを使用して、リポジトリの情報取得やイシュー・プルリクエストの操作を行うための機能を提供します。

## 機能

このMCPサーバーは以下の機能を提供します：

1. **リポジトリ情報の取得** (`get_repo_info`)
   - リポジトリのオーナー名とリポジトリ名を指定して、リポジトリの詳細情報を取得します

2. **イシューの作成** (`create_issue`)
   - リポジトリにイシューを作成します
   - タイトル、本文、ラベル、担当者を指定できます

3. **イシュー一覧の取得** (`list_issues`)
   - リポジトリのイシュー一覧を取得します
   - 状態、ラベル、ソート方法などでフィルタリングできます

4. **プルリクエストの作成** (`create_pull_request`)
   - リポジトリにプルリクエストを作成します
   - タイトル、本文、ブランチ情報などを指定できます

5. **プルリクエスト一覧の取得** (`list_pull_requests`)
   - リポジトリのプルリクエスト一覧を取得します
   - 状態、ソート方法などでフィルタリングできます

## セットアップ

1. `.env.example`ファイルを`.env`にコピーします
2. `.env`ファイルを編集して、`GITHUB_TOKEN`に自分のGitHubトークンを設定します
   - GitHubトークンは[GitHub設定ページ](https://github.com/settings/tokens)から取得できます
   - リポジトリへのアクセス権限を持つトークンを生成してください

3. 依存関係をインストールします
   ```
   npm install
   ```

4. TypeScriptをコンパイルします
   ```
   npm run build
   ```

## 使用方法

Cline MCPの設定ファイルに以下の設定が追加されています：

```json
"github.com/modelcontextprotocol/servers/tree/main/src/github": {
  "autoApprove": [],
  "disabled": false,
  "timeout": 60,
  "command": "node",
  "args": [
    "C:/Users/sasao020211/Documents/Cline/MCP/github-server/build/index.js"
  ],
  "transportType": "stdio"
}
```

Clineで以下のように使用できます：

```
use_mcp_tool
server_name: github.com/modelcontextprotocol/servers/tree/main/src/github
tool_name: get_repo_info
arguments: {
  "owner": "octocat",
  "repo": "hello-world"
}
```

## 使用例

### リポジトリ情報の取得

```
use_mcp_tool
server_name: github.com/modelcontextprotocol/servers/tree/main/src/github
tool_name: get_repo_info
arguments: {
  "owner": "octocat",
  "repo": "hello-world"
}
```

このコマンドは、指定されたリポジトリの詳細情報（スター数、フォーク数、説明文など）を返します。

### イシューの作成

```
use_mcp_tool
server_name: github.com/modelcontextprotocol/servers/tree/main/src/github
tool_name: create_issue
arguments: {
  "owner": "自分のユーザー名",
  "repo": "自分のリポジトリ名",
  "title": "テストイシュー",
  "body": "これはテスト用のイシューです。",
  "labels": ["bug", "documentation"],
  "assignees": ["自分のユーザー名"]
}
```

このコマンドは、指定されたリポジトリに新しいイシューを作成し、作成されたイシューの情報を返します。

### イシュー一覧の取得

```
use_mcp_tool
server_name: github.com/modelcontextprotocol/servers/tree/main/src/github
tool_name: list_issues
arguments: {
  "owner": "octocat",
  "repo": "hello-world",
  "state": "open"
}
```

このコマンドは、指定されたリポジトリのオープン状態のイシュー一覧を返します。

## 実装の詳細

このMCPサーバーは以下の技術とライブラリを使用して実装されています：

1. **TypeScript**: 型安全なコードを記述するために使用
2. **@modelcontextprotocol/sdk**: MCP（Model Context Protocol）サーバーを構築するためのSDK
3. **@octokit/rest**: GitHubのREST APIを簡単に使用するためのライブラリ
4. **dotenv**: 環境変数を管理するためのライブラリ

サーバーの主要なコンポーネント：

- **Server クラス**: MCPサーバーの基本機能を提供
- **StdioServerTransport**: 標準入出力を使用してClineと通信
- **GitHubServer クラス**: GitHub APIとの連携を担当

各ツールは、GitHubのAPIエンドポイントに対応しており、引数の検証、エラーハンドリング、レスポンスのフォーマットなどの機能を提供しています。

## 注意事項

- GitHubトークンは秘密情報です。`.env`ファイルを公開リポジトリにコミットしないでください。
- GitHubのAPI利用制限に注意してください。短時間に多数のリクエストを送信すると、制限に達する可能性があります。
- このMCPサーバーは、sales-manageアプリケーションと連携して使用することを想定しています。
