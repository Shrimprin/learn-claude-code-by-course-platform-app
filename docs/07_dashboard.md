# 07 ダッシュボード

## 概要

`/dashboard` ページ。ログインユーザーが受講中の講座一覧と個人の学習進捗を確認できる。認証必須ページ。

## Todo

### データ取得

- [ ] `src/lib/dashboard.ts` に `getUserEnrolledCourses(userId)` 関数を作成
  - [ ] `user_progress` から受講したことがあるコースを集計して取得
- [ ] 各コースの進捗率を計算する関数を実装

### コンポーネント

- [ ] `src/components/Dashboard/EnrolledCourseCard.tsx` 受講中講座カードを作成
  - [ ] 講座サムネイル・タイトルを表示
  - [ ] 進捗率バーを表示
  - [ ] 「続きを見る」リンク（最後に視聴した動画へ）

### ページ

- [ ] `src/app/(user)/dashboard/page.tsx` を実装（Server Component）
  - [ ] 未認証の場合はログインページにリダイレクト
  - [ ] 受講講座が0件の場合の空状態表示（講座一覧へのリンク）
- [ ] `src/app/(user)/dashboard/loading.tsx` を作成
