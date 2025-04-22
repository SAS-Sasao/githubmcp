# GitHub MCP サーバー

このMCPサーバーは、GitHub APIを使用して、リポジトリの情報取得やイシュー・プルリクエストの操作を行うための機能を提供します。

## MCP（Model Context Protocol）サーバー

このプロジェクトでは、以下のMCPサーバーを利用して機能を拡張しています。

### GitHub MCPサーバー

GitHub APIを操作するためのMCPサーバーです。以下の機能を提供します：

- **get_repo_info**: GitHubリポジトリの情報を取得
- **create_issue**: GitHubリポジトリに新しいイシューを作成
- **list_issues**: GitHubリポジトリのイシュー一覧を取得
- **create_pull_request**: GitHubリポジトリに新しいプルリクエストを作成
- **list_pull_requests**: GitHubリポジトリのプルリクエスト一覧を取得

### PlaywriteMCP（login-test-server）

ログイン機能をテストするためのMCPサーバーです。以下の機能を提供します：

- **login_test**: ユーザーIDとパスワードを使用してログイン機能をテスト
  - 指定されたAPIエンドポイント（デフォルト: http://localhost:4322）にログインリクエストを送信
  - ログイン結果をJSON形式で返却

これらのMCPサーバーは、AIアシスタントが直接APIと連携するための仕組みを提供し、開発効率と機能性を向上させています。

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
3. **@octokit/rest**: GitHub REST APIを簡単に使用するためのライブラリ
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

## .clinerules ファイルについて

`.clinerules` ファイルは、Clineがアプリケーション開発を行う際に従うべきルールを定義したものです。このファイルには以下の内容が含まれています：

### ドメイン駆動設計 (DDD) の原則
- **値オブジェクトとエンティティの区別**：同一性の有無による区別、イミュータブル性の確保など
- **集約による整合性の保証**：関連するエンティティと値オブジェクトのグループ化、トランザクション境界の設定
- **リポジトリによるデータアクセスの抽象化**：永続化の詳細を隠蔽し、ドメインモデルに集中
- **境界付けられたコンテキストの意識**：大きなドメインを明確な境界を持つ小さなコンテキストに分割

### 技術スタックの選定
- アプリケーション開発開始時に最適な技術スタックを提案し、選定理由を明確に説明
- 一度決定した技術スタックの変更を検討する場合は、必ずユーザーに確認を行い、承認を得てから実施

### コード修正のプロセス
- 既存コードを修正する際は、影響範囲の調査を行い、調査結果をユーザーに説明
- ユーザーから明示的な許可を得た場合のみ修正を実行

### その他の開発ルール
- コーディング規約（DRY原則、SOLID原則、命名規則の一貫性など）
- テスト戦略（ユニットテスト、統合テスト、E2Eテスト、TDDの実践）
- パフォーマンスとセキュリティ対策
- ドキュメンテーション（コードドキュメント、プロジェクトドキュメント）
- 継続的改善（技術的負債の管理、コードレビュー）
- コミュニケーション（進捗報告、意思決定の透明性）

これらのルールに従うことで、高品質で保守性の高いアプリケーション開発を実現します。
