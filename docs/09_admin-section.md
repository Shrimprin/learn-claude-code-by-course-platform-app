# 09 管理画面: セクション管理

## 概要

`/admin/courses/[id]/sections` ページ。講座内のセクションの作成・編集・削除・並び替えを行う。

## Todo

### データ操作

- [ ] `src/lib/admin/sections.ts` に以下の関数を作成
  - [ ] `getSectionsByCourse(courseId)` セクション一覧取得
  - [ ] `createSection(courseId, data)` セクション作成
  - [ ] `updateSection(id, data)` セクション更新
  - [ ] `deleteSection(id)` セクション削除
  - [ ] `reorderSections(courseId, orderedIds)` 並び替え

### Server Actions

- [ ] `src/app/actions/admin/sections.ts` に Server Actions を作成
  - [ ] `createSectionAction(courseId, formData)`
  - [ ] `updateSectionAction(id, formData)`
  - [ ] `deleteSectionAction(id)`
  - [ ] `reorderSectionsAction(courseId, orderedIds)`

### コンポーネント

- [ ] `src/components/Admin/SectionForm.tsx` セクション作成・編集フォームを作成
  - [ ] タイトル入力
- [ ] `src/components/Admin/SectionList.tsx` ドラッグ&ドロップで並び替え可能なリストを作成（Client Component）
  - [ ] 各セクションに動画管理ページへのリンク

### ページ

- [ ] `src/app/admin/courses/[id]/sections/page.tsx` セクション管理ページを実装
