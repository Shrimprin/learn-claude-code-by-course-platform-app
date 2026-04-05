import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <div
      className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-6 dot-grid"
    >
      {/* グロー */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[100px]"
          style={{ background: "radial-gradient(circle, #6366f1, #a855f7)" }}
        />
      </div>

      {/* カード */}
      <div
        className="relative w-full max-w-sm rounded-2xl p-8 glass"
        style={{ boxShadow: "0 0 60px rgba(99,102,241,0.1)" }}
      >
        {/* ロゴ */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          >
            AI
          </div>
          <div className="text-center">
            <h1
              className="text-xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              おかえりなさい
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              学習を続けるにはログインが必要です
            </p>
          </div>
        </div>

        {/* ログインボタン */}
        <GoogleLoginButton />

        {/* エラーメッセージ */}
        {message && (
          <div
            className="mt-4 rounded-lg px-4 py-3 text-center text-sm"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#fca5a5",
            }}
          >
            {message}
          </div>
        )}

        {/* 区切り */}
        <div className="my-6 flex items-center gap-3">
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            Google アカウントで続行
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        </div>

        {/* 注記 */}
        <p className="text-center text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
          ログインすることで
          <Link href="/" className="underline underline-offset-2 hover:opacity-80" style={{ color: "#a5b4fc" }}>
            利用規約
          </Link>
          {" "}および{" "}
          <Link href="/" className="underline underline-offset-2 hover:opacity-80" style={{ color: "#a5b4fc" }}>
            プライバシーポリシー
          </Link>
          に同意したものとみなします。
        </p>

        {/* ホームへ */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs transition-opacity hover:opacity-80"
            style={{ color: "var(--muted)" }}
          >
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
