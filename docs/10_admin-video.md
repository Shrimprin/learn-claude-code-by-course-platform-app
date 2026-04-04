# 10 管理画面: 動画管理

## 概要

セクション内の動画の追加・編集・削除・並び替えを行う。YouTube URL を手動入力し、無料フラグを設定できる。

## Todo

### データ操作

- [ ] `src/lib/admin/videos.ts` に以下の関数を作成
  - [ ] `getVideosBySection(sectionId)` 動画一覧取得
  - [ ] `createVideo(sectionId, data)` 動画作成
  - [ ] `updateVideo(id, data)` 動画更新
  - [ ] `deleteVideo(id)` 動画削除
  - [ ] `reorderVideos(sectionId, orderedIds)` 並び替え

### Server Actions

- [ ] `src/app/actions/admin/videos.ts` に Server Actions を作成
  - [ ] `createVideoAction(sectionId, formData)`
  - [ ] `updateVideoAction(id, formData)`
  - [ ] `deleteVideoAction(id)`
  - [ ] `reorderVideosAction(sectionId, orderedIds)`

### コンポーネント

- [ ] `src/components/Admin/VideoForm.tsx` 動画作成・編集フォームを作成（Client Component）
  - [ ] タイトル入力
  - [ ] YouTube URL 入力
  - [ ] 再生時間（秒）入力
  - [ ] 無料動画フラグ（チェックボックス）
- [ ] `src/components/Admin/VideoList.tsx` ドラッグ&ドロップで並び替え可能なリストを作成（Client Component）
  - [ ] 無料フラグの表示
  - [ ] YouTube URL のプレビューリンク

### ページ

- [ ] `src/app/admin/courses/[id]/sections/[sectionId]/videos/page.tsx` 動画管理ページを実装

### バリデーション

- [ ] YouTube URL の形式チェック（`youtube.com/watch?v=` または `youtu.be/` 形式）
