# 02 認証機能（Google OAuth）

## 概要

Supabase Auth を使った Google OAuth 認証の実装。最初の動画は未認証で閲覧可能、2本目以降は認証必須。

## Todo

### Supabase Auth 設定

- [ ] Supabase ダッシュボードで Google OAuth プロバイダーを有効化 ※手動作業
- [ ] Google Cloud Console で OAuth クライアント ID を作成し、Supabase に設定 ※手動作業
- [ ] リダイレクト URL を設定（`/auth/callback`） ※手動作業

### 実装

- [x] `lib/supabase/client.ts`・`lib/supabase/server.ts` は チケット01で作成済み
- [x] `app/(auth)/login/page.tsx` ログインページを作成（Google ログインボタン）
- [x] `app/auth/callback/route.ts` OAuth コールバックハンドラーを作成
- [x] ログアウト処理を実装（`app/actions/auth.ts`）

### 認証ガード

- [x] `proxy.ts` で未認証ユーザーのアクセス制御を実装（Next.js 16 の新規約）
- [ ] 動画視聴ページで「1本目は無料、2本目以降は認証必須」のロジックを実装 → チケット06で対応
- [x] 管理者ページへのアクセスを `role === 'admin'` のみに制限（`proxy.ts`）

### UI

- [x] ヘッダーにログイン/ログアウトボタンを追加（`components/Header.tsx`）
- [x] ログイン済みの場合はユーザーアバターを表示
