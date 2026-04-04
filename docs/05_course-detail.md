# 05 講座詳細ページ

## 概要

`/course/[id]` ページ。講座 → セクション → 動画の3階層構造を表示し、全体・セクションごとの進捗率を表示する。

## Todo

### データ取得

- [ ] `src/lib/courses.ts` に `getCourseById(id)` 関数を作成
- [ ] `src/lib/sections.ts` に `getSectionsByCourseId(courseId)` 関数を作成（動画も含めて取得）
- [ ] `src/lib/progress.ts` に `getUserProgress(userId, courseId)` 関数を作成

### コンポーネント

- [ ] `src/components/CourseDetail/CourseHeader.tsx` 講座タイトル・説明・サムネイルを表示
- [ ] `src/components/CourseDetail/ProgressBar.tsx` 進捗率バーを作成（全体・セクション単位）
- [ ] `src/components/CourseDetail/SectionList.tsx` セクション一覧を表示
- [ ] `src/components/CourseDetail/VideoList.tsx` セクション内の動画一覧を表示
  - [ ] 完了済み動画にチェックマーク表示
  - [ ] 無料動画と有料動画の区別表示
  - [ ] 動画視聴ページへのリンク

### ページ

- [ ] `src/app/(user)/course/[id]/page.tsx` を実装（Server Component）
- [ ] `src/app/(user)/course/[id]/loading.tsx` ローディング UI を作成
- [ ] `src/app/(user)/course/[id]/error.tsx` エラー UI を作成（Client Component）
- [ ] `generateMetadata` で動的 OGP タイトルを設定

### 進捗計算ロジック

- [ ] 全体進捗率 = 完了動画数 / 全動画数
- [ ] セクション進捗率 = セクション内完了動画数 / セクション内全動画数
