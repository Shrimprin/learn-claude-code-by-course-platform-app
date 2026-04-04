# 08 管理画面: 講座管理

## 概要

`/admin/courses` ページ。管理者が講座の作成・編集・削除を行う。`role === 'admin'` のユーザーのみアクセス可能。

## Todo

### データ操作

- [ ] `src/lib/admin/courses.ts` に以下の関数を作成
  - [ ] `getAdminCourses()` 全講座取得
  - [ ] `createCourse(data)` 講座作成
  - [ ] `updateCourse(id, data)` 講座更新
  - [ ] `deleteCourse(id)` 講座削除

### Server Actions

- [ ] `src/app/actions/admin/courses.ts` に Server Actions を作成
  - [ ] `createCourseAction(formData)`
  - [ ] `updateCourseAction(id, formData)`
  - [ ] `deleteCourseAction(id)`

### コンポーネント

- [ ] `src/components/Admin/CourseForm.tsx` 講座作成・編集フォームを作成（Client Component）
  - [ ] タイトル入力
  - [ ] 説明入力（テキストエリア）
  - [ ] サムネイル URL 入力
- [ ] `src/components/Admin/CourseTable.tsx` 講座一覧テーブルを作成
  - [ ] 編集・削除ボタン
  - [ ] セクション管理ページへのリンク

### ページ

- [ ] `src/app/admin/courses/page.tsx` 講座一覧ページを実装
- [ ] `src/app/admin/courses/new/page.tsx` 新規作成ページを実装
- [ ] `src/app/admin/courses/[id]/page.tsx` 編集ページを実装
- [ ] 管理者以外がアクセスした場合のリダイレクト処理
