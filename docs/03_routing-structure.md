# 03 基本ページ構造 & ルーティング

## 概要

App Router のルートグループを使った基本的なページ構造とレイアウトの整備。

## Todo

### ディレクトリ構造の作成

- [ ] `src/app/(auth)/` ルートグループ作成
- [ ] `src/app/(user)/` ルートグループ作成
- [ ] `src/app/admin/` ディレクトリ作成
- [ ] `src/components/` ディレクトリ作成
- [ ] `src/lib/` ディレクトリ作成
- [ ] `src/types/` ディレクトリ作成

### レイアウト

- [ ] `src/app/layout.tsx` ルートレイアウトを整備（グローバルヘッダー等）
- [ ] `src/app/(user)/layout.tsx` ユーザー向け共通レイアウトを作成
- [ ] `src/app/(auth)/layout.tsx` 認証ページ用レイアウトを作成
- [ ] `src/app/admin/layout.tsx` 管理画面用レイアウトを作成

### 共通コンポーネント

- [ ] `src/components/Header.tsx` グローバルヘッダーを作成
- [ ] `src/components/Footer.tsx` フッターを作成（必要に応じて）

### ページのスタブ作成（中身は後のチケットで実装）

- [ ] `src/app/(user)/course/[id]/page.tsx`
- [ ] `src/app/(user)/course/[id]/video/[videoId]/page.tsx`
- [ ] `src/app/(user)/dashboard/page.tsx`
- [ ] `src/app/(auth)/login/page.tsx`
- [ ] `src/app/admin/page.tsx`
- [ ] `src/app/admin/courses/page.tsx`
- [ ] `src/app/admin/courses/[id]/page.tsx`
- [ ] `src/app/admin/courses/[id]/sections/page.tsx`
