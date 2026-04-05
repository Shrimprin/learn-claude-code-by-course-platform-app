# 07 ダッシュボード

## 概要

`/dashboard` ページ。ログインユーザーが受講中の講座一覧と個人の学習進捗を確認できる。認証必須ページ。

## Todo

### データ取得

- [x] `lib/dashboard.ts` に `getUserEnrolledCourses(userId)` 関数を作成
  - [x] `user_progress` から受講したことがあるコースを集計して取得
- [x] 各コースの進捗率を `calcProgress()` で算出

### コンポーネント

- [x] `components/Dashboard/EnrolledCourseCard.tsx` 受講中講座カードを作成
  - [x] 講座サムネイル・タイトルを表示
  - [x] 進捗率バーを表示
  - [x] 「続きを見る」リンク（最後に視聴した動画へ）

### ページ

- [x] `app/(user)/dashboard/page.tsx` を実装（Server Component）
  - [x] 未認証の場合はログインページにリダイレクト
  - [x] 統計カード（受講中講座数・完了動画数・平均進捗率）
  - [x] 受講講座が0件の場合の空状態表示（講座一覧へのリンク）
- [x] `app/(user)/dashboard/loading.tsx` を作成
