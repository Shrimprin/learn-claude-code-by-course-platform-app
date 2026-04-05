# 08 管理画面: 講座管理

## 概要

`/admin/courses` ページ。管理者が講座の作成・編集・削除を行う。`role === 'admin'` のユーザーのみアクセス可能。

## Todo

### データ操作

- [x] `lib/admin/courses.ts` に以下の関数を作成
  - [x] `getAdminCourses()` 全講座取得
  - [x] `createCourse(data)` 講座作成
  - [x] `updateCourse(id, data)` 講座更新
  - [x] `deleteCourse(id)` 講座削除

### Server Actions

- [x] `app/actions/admin/courses.ts` に Server Actions を作成
  - [x] `createCourseAction(formData)`
  - [x] `updateCourseAction(id, formData)`
  - [x] `deleteCourseAction(id)`

### コンポーネント

- [x] `components/Admin/CourseForm.tsx` 講座作成・編集フォームを作成（Client Component）
  - [x] タイトル入力
  - [x] 説明入力（テキストエリア）
  - [x] サムネイル URL 入力
- [x] `components/Admin/DeleteCourseButton.tsx` 削除ボタン（確認ダイアログ付き）
- [x] `app/admin/courses/page.tsx` テーブル形式の講座一覧（編集・セクション・削除リンク）

### ページ

- [x] `app/admin/courses/page.tsx` 講座一覧ページを実装
- [x] `app/admin/courses/new/page.tsx` 新規作成ページを実装
- [x] `app/admin/courses/[id]/page.tsx` 編集ページを実装
- [x] 管理者以外がアクセスした場合のリダイレクト処理（proxy.ts で対応済み）
