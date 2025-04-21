# GitHub API レート制限の解消方法

GitHub APIを使用する際に「API rate limit exceeded」（APIレート制限超過）エラーが発生した場合の対処法について説明します。

## レート制限とは

GitHubのAPIには、短時間に送信できるリクエスト数に制限があります：

- **認証なし**: 1時間あたり60リクエスト（IPアドレスごと）
- **認証あり**: 1時間あたり5,000リクエスト（ユーザーごと）

## 解決方法

### 1. GitHubトークンの設定

最も効果的な解決方法は、GitHubの個人アクセストークンを設定することです：

1. [GITHUB_TOKEN_GUIDE.md](./GITHUB_TOKEN_GUIDE.md)の手順に従ってGitHubトークンを取得します
2. `.env`ファイルにトークンを設定します：
   ```
   GITHUB_TOKEN=your_github_token_here
   ```
3. GitHub MCPサーバーを再起動します：
   ```
   cd C:/Users/sasao020211/Documents/Cline/MCP/github-server
   npm run build
   ```

### 2. リクエスト頻度の調整

トークンを設定しても問題が解決しない場合は、以下の対策を検討してください：

- リクエストの間隔を空ける
- 必要最小限のデータのみを取得する
- キャッシュを活用する

### 3. レート制限の確認

現在のレート制限状況を確認するには：

```
use_mcp_tool
server_name: github.com/modelcontextprotocol/servers/tree/main/src/github
tool_name: get_repo_info
arguments: {
  "owner": "octocat",
  "repo": "hello-world"
}
```

レスポンスヘッダーに以下の情報が含まれています：
- `X-RateLimit-Limit`: 1時間あたりの最大リクエスト数
- `X-RateLimit-Remaining`: 残りのリクエスト数
- `X-RateLimit-Reset`: 制限がリセットされる時間（Unix時間）

## 注意事項

- トークンは秘密情報です。公開リポジトリにコミットしないでください。
- 大量のリクエストを送信する場合は、GitHub APIのドキュメントを参照して適切な使用方法を確認してください。
- 企業や組織で大規模に使用する場合は、GitHub Enterprise APIの利用を検討してください。
