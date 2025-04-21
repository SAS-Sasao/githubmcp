# GitHubトークンの取得方法

GitHubのAPIを使用するには、個人アクセストークン（Personal Access Token）が必要です。以下の手順でトークンを取得できます。

## 手順

1. GitHubにログインします。

2. 右上のプロフィールアイコンをクリックし、「Settings」を選択します。

3. 左側のサイドバーで一番下までスクロールし、「Developer settings」をクリックします。

4. 左側のサイドバーで「Personal access tokens」を選択し、「Tokens (classic)」をクリックします。

5. 「Generate new token」ボタンをクリックし、「Generate new token (classic)」を選択します。

6. 必要に応じてパスワードを再入力します。

7. 「Note」フィールドにトークンの用途を入力します（例：「GitHub MCP Server」）。

8. トークンの有効期限を設定します（推奨：30日または60日）。

9. 以下のスコープを選択します：
   - `repo`（すべてのリポジトリ操作に必要）
   - `read:org`（組織のリポジトリにアクセスする場合）

10. 「Generate token」ボタンをクリックします。

11. 生成されたトークンをコピーします（**重要**: このページを離れると二度とトークンを表示できません）。

12. コピーしたトークンを`.env`ファイルの`GITHUB_TOKEN=`の後に貼り付けます：

```
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 注意事項

- トークンは秘密情報です。公開リポジトリにコミットしないでください。
- トークンには必要最小限のスコープのみを付与してください。
- 定期的にトークンを更新することをお勧めします。
- トークンが漏洩した場合は、すぐにGitHubの設定ページで無効化してください。
