# 05 講座詳細ページ

## 概要

`/course/[id]` ページ。講座 → セクション → 動画の3階層構造を表示し、全体・セクションごとの進捗率を表示する。

## Todo

### データ取得

- [x] `lib/courses.ts` に `getCourseById(id)` 関数を作成
- [x] `lib/sections.ts` に `getSectionsByCourseId(courseId)` 関数を作成（動画も含めて取得）
- [x] `lib/progress.ts` に `getUserProgressByCourse(userId, videoIds)` 関数を作成

### コンポーネント

- [x] 講座タイトル・説明・サムネイルをページ内に直接実装
- [x] `components/CourseDetail/ProgressBar.tsx` 進捗率バーを作成（全体・セクション単位）
- [x] `components/CourseDetail/SectionList.tsx` セクション一覧 + 動画リストを表示
  - [x] 完了済み動画にチェックマーク表示
  - [x] 無料動画と有料動画の区別表示
  - [x] 動画視聴ページへのリンク

### ページ

- [x] `app/(user)/course/[id]/page.tsx` を実装（Server Component）
- [x] `app/(user)/course/[id]/loading.tsx` ローディング UI を作成（チケット03）
- [x] `app/(user)/course/[id]/error.tsx` エラー UI を作成（チケット03）
- [x] `generateMetadata` で動的 OGP タイトルを設定

### 進捗計算ロジック

- [x] 全体進捗率 = 完了動画数 / 全動画数
- [x] セクション進捗率 = セクション内完了動画数 / セクション内全動画数
