# 01 Supabase セットアップ & データベーススキーマ作成

## 概要

Supabase プロジェクトの初期設定と全テーブルのスキーマ作成。

## Todo

### Supabase プロジェクト設定

- [x] Supabase プロジェクト作成
- [x] `.env.local` に `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` を設定
- [x] `@supabase/supabase-js` `@supabase/ssr` をインストール
- [x] `lib/supabase/client.ts`・`lib/supabase/server.ts` にクライアント初期化コードを作成

### テーブル作成

- [x] `profiles` テーブル作成
- [x] `courses` テーブル作成
- [x] `sections` テーブル作成
- [x] `videos` テーブル作成
- [x] `user_progress` テーブル作成

### RLS（Row Level Security）設定

- [x] `profiles` テーブルに RLS を設定（自分のプロフィールのみ読み取り・更新可能）
- [x] `courses` テーブルに RLS を設定（全員読み取り可、管理者のみ書き込み可）
- [x] `sections` テーブルに RLS を設定
- [x] `videos` テーブルに RLS を設定
- [x] `user_progress` テーブルに RLS を設定（自分の進捗のみ操作可能）
- [x] emailとfull_nameはauth.usersからアクセスしてセキュリティを強化する

### トリガー設定

- [x] `auth.users` に INSERT 時に `profiles` を自動作成するトリガー関数 `handle_new_user` を作成
- [x] トリガー `on_auth_user_created` を設定

### TypeScript 型定義

- [x] `types/database.ts` に Supabase の型定義を作成（`supabase gen types` で自動生成）
