# 03 基本ページ構造 & ルーティング

## 概要

App Router のルートグループを使った基本的なページ構造とレイアウトの整備。
※ このプロジェクトは `src/` ディレクトリを使わず、ルート直下に `app/`・`components/`・`lib/`・`types/` を配置。

## Todo

### ディレクトリ構造の作成

- [x] `app/(auth)/` ルートグループ作成
- [x] `app/(user)/` ルートグループ作成
- [x] `app/admin/` ディレクトリ作成
- [x] `components/` ディレクトリ作成
- [x] `lib/` ディレクトリ作成
- [x] `types/` ディレクトリ作成

### レイアウト

- [x] `app/layout.tsx` ルートレイアウト整備（グローバルヘッダー）
- [x] `app/(user)/layout.tsx` ユーザー向け共通レイアウトを作成
- [x] `app/(auth)/layout.tsx` 認証ページ用レイアウトを作成
- [x] `app/admin/layout.tsx` 管理画面用レイアウト（サイドバー付き）を作成

### 共通コンポーネント

- [x] `components/Header.tsx` グローバルヘッダーを作成（チケット02）
- [x] フッターは `app/page.tsx` 内にインライン実装

### ページのスタブ作成

- [x] `app/(user)/course/[id]/page.tsx`
- [x] `app/(user)/course/[id]/loading.tsx`
- [x] `app/(user)/course/[id]/error.tsx`
- [x] `app/(user)/course/[id]/video/[videoId]/page.tsx`
- [x] `app/(user)/dashboard/page.tsx`
- [x] `app/(auth)/login/page.tsx`（チケット02で実装済み）
- [x] `app/admin/page.tsx`
- [x] `app/admin/courses/page.tsx`
- [x] `app/admin/courses/[id]/page.tsx`
- [x] `app/admin/courses/[id]/sections/page.tsx`
