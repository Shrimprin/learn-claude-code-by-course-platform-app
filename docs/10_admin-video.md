# 10 管理画面: 動画管理

## 概要

セクション内の動画の追加・編集・削除・並び替えを行う。YouTube URL を手動入力し、無料フラグを設定できる。

## Todo

### データ操作

- [x] `lib/admin/videos.ts` に以下の関数を作成
  - [x] `getAdminVideos(sectionId)` 動画一覧取得
  - [x] `createVideo(sectionId, data)` 動画作成
  - [x] `updateVideo(id, data)` 動画更新
  - [x] `deleteVideo(id)` 動画削除
  - [x] `reorderVideos(orderedIds)` 並び替え

### Server Actions

- [x] `app/actions/admin/videos.ts` に Server Actions を作成
  - [x] `createVideoAction(sectionId, courseId, formData)`
  - [x] `updateVideoAction(id, sectionId, courseId, formData)`
  - [x] `deleteVideoAction(id, sectionId, courseId)`
  - [x] `reorderVideosAction(sectionId, courseId, orderedIds)`

### コンポーネント

- [x] `components/Admin/VideoList.tsx` ドラッグ&ドロップで並び替え可能なリストを作成（Client Component）
  - [x] 無料フラグの表示
  - [x] YouTube URL のプレビューリンク
  - [x] 削除ボタン（確認ダイアログ付き）

### ページ

- [x] `app/admin/courses/[id]/sections/[sectionId]/videos/page.tsx` 動画管理ページを実装
  - [x] 動画一覧（ドラッグ並び替え）
  - [x] インラインの新規追加フォーム（タイトル・URL・再生時間・無料フラグ）

### バリデーション

- [x] YouTube URL の形式チェック（`extractYouTubeId` で検証）
- [x] `lib/youtube.ts` に共通ユーティリティとして分離（Client/Server 両対応）
