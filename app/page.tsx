import Link from "next/link";
import { getCourses } from "@/lib/courses";
import { CourseCard } from "@/components/CourseCard";

export default async function Home() {
  const courses = await getCourses();

  return (
    <main className="flex flex-col flex-1">
      {/* ヒーローセクション */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] overflow-hidden px-6 text-center dot-grid">
        {/* 背景グロー */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
            style={{ background: "radial-gradient(circle, #6366f1, #a855f7)" }}
          />
          <div
            className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full opacity-10 blur-[80px]"
            style={{ background: "#06b6d4" }}
          />
        </div>

        {/* バッジ */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
          style={{
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.3)",
            color: "#a5b4fc",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#818cf8" }} />
          AI × プログラミング学習
        </div>

        {/* タイトル */}
        <h1 className="relative mb-6 max-w-3xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl leading-tight">
          <span style={{ color: "var(--foreground)" }}>コードを書く力を、</span>
          <br />
          <span className="gradient-text">AI と共に身につける。</span>
        </h1>

        <p className="relative mb-10 max-w-xl text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
          YouTube 動画を活用した実践的な学習プラットフォーム。
          AI ツールを使ったモダンな開発スキルを、自分のペースで習得しましょう。
        </p>

        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#courses"
            className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              boxShadow: "0 0 40px rgba(99,102,241,0.35)",
            }}
          >
            講座を見る
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* 講座一覧セクション */}
      <section id="courses" className="flex-1 py-20 px-6" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                すべての講座
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                {courses.length} 件の講座
              </p>
            </div>
          </div>

          {courses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            /* 空状態 */
            <div
              className="flex flex-col items-center justify-center rounded-2xl py-24 text-center glass"
            >
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                style={{ background: "rgba(99,102,241,0.15)" }}
              >
                📚
              </div>
              <p className="text-base font-medium" style={{ color: "var(--foreground)" }}>
                まだ講座がありません
              </p>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                管理画面から最初の講座を追加しましょう
              </p>
              <Link
                href="/admin/courses"
                className="mt-6 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
                style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
              >
                管理画面へ
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* フッター */}
      <footer
        className="py-8 text-center text-xs"
        style={{ color: "var(--muted)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        © 2026 学習プラットフォーム
      </footer>
    </main>
  );
}
