# GitHub API レート制限ガイド

## 発生した問題

GitHub MCPサーバーを使用中に以下のエラーが発生しました：

```
API rate limit exceeded for 221.242.66.218. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)
```

これは、GitHubのAPIレート制限に達したことを示しています。

## 解決方法

### 1. GitHub トークンの確認

`.env` ファイルに正しいGitHubトークンが設定されているか確認してください：

1. `C:/Users/sasao020211/Documents/Cline/MCP/github-server/.env` ファイルを開く
2. `GITHUB_TOKEN` の値が正しく設定されているか確認する
3. トークンが期限切れでないか確認する

### 2. 新しいGitHubトークンの生成

トークンが無効または期限切れの場合は、新しいトークンを生成してください：

1. [GitHub設定ページ](https://github.com/settings/tokens) にアクセス
2. 「Generate new token」をクリック
3. 適切な権限（repo, user など）を選択
4. トークンを生成し、`.env` ファイルの `GITHUB_TOKEN` に設定

### 3. 認証の確認

GitHub MCPサーバーが正しく認証されているか確認するには：

1. サーバーを再起動する
2. 低レート制限のAPIエンドポイント（リポジトリ情報の取得など）をテスト
3. レスポンスヘッダーで残りのレート制限を確認

## GitHubのAPIレート制限について

- 未認証リクエスト: 1時間あたり60リクエスト
- 認証済みリクエスト: 1時間あたり5,000リクエスト

詳細は [GitHub API Rate Limiting](https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting) をご覧ください。
