# 01 Supabase セットアップ & データベーススキーマ作成

## 概要

Supabase プロジェクトの初期設定と全テーブルのスキーマ作成。

## Todo

### Supabase プロジェクト設定

- [ ] Supabase プロジェクト作成
- [ ] `.env.local` に `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` を設定
- [ ] `@supabase/supabase-js` をインストール
- [ ] `src/lib/supabase.ts` にクライアント初期化コードを作成

### テーブル作成

- [ ] `profiles` テーブル作成
- [ ] `courses` テーブル作成
- [ ] `sections` テーブル作成
- [ ] `videos` テーブル作成
- [ ] `user_progress` テーブル作成

### RLS（Row Level Security）設定

- [ ] `profiles` テーブルに RLS を設定（自分のプロフィールのみ読み取り・更新可能）
- [ ] `courses` テーブルに RLS を設定（全員読み取り可、管理者のみ書き込み可）
- [ ] `sections` テーブルに RLS を設定
- [ ] `videos` テーブルに RLS を設定
- [ ] `user_progress` テーブルに RLS を設定（自分の進捗のみ操作可能）

### トリガー設定

- [ ] `auth.users` に INSERT 時に `profiles` を自動作成するトリガー関数 `handle_new_user` を作成
- [ ] トリガー `on_auth_user_created` を設定

### TypeScript 型定義

- [ ] `src/types/database.ts` に Supabase の型定義を作成（または `supabase gen types` で自動生成）
