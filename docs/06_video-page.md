# 06 動画視聴ページ

## 概要

`/course/[id]/video/[videoId]` ページ。YouTube 動画を埋め込み表示し、手動で完了マークを付けられる。1本目は未認証でも視聴可能、2本目以降は認証必須。

## Todo

### データ取得

- [x] `lib/videos.ts` に `getVideoById(videoId)` 関数を作成
- [x] `getVideosByCourseId(courseId)` で同コース内の全動画を取得し前後ナビを実装

### コンポーネント

- [x] `components/VideoPlayer.tsx` YouTube 埋め込みプレイヤーを作成（Client Component）
  - [x] `<iframe>` に `sandbox` 属性を設定してセキュリティ対策
  - [x] レスポンシブ対応（16:9 アスペクト比）
- [x] `components/VideoCompleteButton.tsx` 「完了にする」ボタンを作成（Client Component）
  - [x] 完了済みの場合はボタンの状態を変更
  - [x] 未認証の場合はログインページにリダイレクト

### ページ

- [x] `app/(user)/course/[id]/video/[videoId]/page.tsx` を実装
  - [x] Server Component として動画情報を取得
  - [x] 認証チェック: `is_free === false` かつ `order_index > 0` の場合は認証必須
  - [x] サイドバーに同コースの動画一覧を表示
- [x] `app/(user)/course/[id]/video/[videoId]/loading.tsx` を作成

### 完了マーク機能

- [x] `app/actions/progress.ts` に `markVideoComplete(videoId, courseId)` Server Action を作成
- [x] `user_progress` テーブルへの upsert 処理
- [x] 完了後に `revalidatePath` で講座詳細・動画ページの進捗を更新
