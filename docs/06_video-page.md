# 06 動画視聴ページ

## 概要

`/course/[id]/video/[videoId]` ページ。YouTube 動画を埋め込み表示し、手動で完了マークを付けられる。1本目は未認証でも視聴可能、2本目以降は認証必須。

## Todo

### データ取得

- [ ] `src/lib/videos.ts` に `getVideoById(videoId)` 関数を作成
- [ ] 同じコース内の前後動画を取得するロジックを実装

### コンポーネント

- [ ] `src/components/VideoPlayer.tsx` YouTube 埋め込みプレイヤーを作成（Client Component）
  - [ ] `<iframe>` に `sandbox` 属性を設定してセキュリティ対策
  - [ ] レスポンシブ対応（16:9 アスペクト比）
- [ ] `src/components/VideoCompleteButton.tsx` 「完了にする」ボタンを作成（Client Component）
  - [ ] 完了済みの場合はボタンの状態を変更
  - [ ] 未認証の場合はログインページにリダイレクト

### ページ

- [ ] `src/app/(user)/course/[id]/video/[videoId]/page.tsx` を実装
  - [ ] Server Component として動画情報を取得
  - [ ] 認証チェック: `is_free === false` かつ `order_index > 1` の場合は認証必須
  - [ ] サイドバーに同コースの動画一覧を表示
- [ ] `src/app/(user)/course/[id]/video/[videoId]/loading.tsx` を作成

### 完了マーク機能

- [ ] `src/app/actions/progress.ts` に `markVideoComplete(videoId)` Server Action を作成
- [ ] `user_progress` テーブルへの upsert 処理
- [ ] 完了後に講座詳細ページの進捗が反映されること確認
