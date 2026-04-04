# 02 認証機能（Google OAuth）

## 概要

Supabase Auth を使った Google OAuth 認証の実装。最初の動画は未認証で閲覧可能、2本目以降は認証必須。

## Todo

### Supabase Auth 設定

- [ ] Supabase ダッシュボードで Google OAuth プロバイダーを有効化
- [ ] Google Cloud Console で OAuth クライアント ID を作成し、Supabase に設定
- [ ] リダイレクト URL を設定（`/auth/callback`）

### 実装

- [ ] `src/lib/supabase.ts` に Server / Client 用 Supabase クライアントを作成
- [ ] `src/app/(auth)/login/page.tsx` ログインページを作成（Google ログインボタン）
- [ ] `src/app/auth/callback/route.ts` OAuth コールバックハンドラーを作成
- [ ] ログアウト処理を実装

### 認証ガード

- [ ] `src/middleware.ts` で未認証ユーザーのアクセス制御を実装
- [ ] 動画視聴ページで「1本目は無料、2本目以降は認証必須」のロジックを実装
- [ ] 管理者ページへのアクセスを `role === 'admin'` のみに制限

### UI

- [ ] ヘッダーにログイン/ログアウトボタンを追加
- [ ] ログイン済みの場合はユーザーアバターを表示
