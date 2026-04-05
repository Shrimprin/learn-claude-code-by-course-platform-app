# 09 管理画面: セクション管理

## 概要

`/admin/courses/[id]/sections` ページ。講座内のセクションの作成・編集・削除・並び替えを行う。

## Todo

### データ操作

- [x] `lib/admin/sections.ts` に以下の関数を作成
  - [x] `getAdminSections(courseId)` セクション一覧取得
  - [x] `createSection(courseId, data)` セクション作成
  - [x] `updateSection(id, data)` セクション更新
  - [x] `deleteSection(id)` セクション削除
  - [x] `reorderSections(orderedIds)` 並び替え

### Server Actions

- [x] `app/actions/admin/sections.ts` に Server Actions を作成
  - [x] `createSectionAction(courseId, formData)`
  - [x] `updateSectionAction(id, courseId, formData)`
  - [x] `deleteSectionAction(id, courseId)`
  - [x] `reorderSectionsAction(courseId, orderedIds)`

### コンポーネント

- [x] `components/Admin/SectionList.tsx` ドラッグ&ドロップで並び替え可能なリストを作成（Client Component）
  - [x] 各セクションに動画管理ページへのリンク
  - [x] 削除ボタン（確認ダイアログ付き）

### ページ

- [x] `app/admin/courses/[id]/sections/page.tsx` セクション管理ページを実装
  - [x] セクション一覧（ドラッグ並び替え）
  - [x] インラインの新規追加フォーム
