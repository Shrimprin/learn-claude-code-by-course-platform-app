import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      {/* ヒーローセクション */}
      <section className="relative flex flex-col items-center justify-center flex-1 min-h-[calc(100vh-64px)] overflow-hidden px-6 text-center dot-grid">
        {/* 背景グロー */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div
            className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
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
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: "#818cf8" }}
          />
          AI × プログラミング学習
        </div>

        {/* タイトル */}
        <h1 className="relative mb-6 max-w-3xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl leading-tight">
          <span style={{ color: "var(--foreground)" }}>コードを書く力を、</span>
          <br />
          <span className="gradient-text">AI と共に身につける。</span>
        </h1>

        {/* サブコピー */}
        <p
          className="relative mb-10 max-w-xl text-lg leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          YouTube 動画を活用した実践的な学習プラットフォーム。
          AI ツールを使ったモダンな開発スキルを、
          自分のペースで習得しましょう。
        </p>

        {/* CTA */}
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/login"
            className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              boxShadow: "0 0 40px rgba(99,102,241,0.35)",
            }}
          >
            無料で始める
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-medium transition-all hover:opacity-80"
            style={{
              color: "var(--muted)",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            講座を見る
          </Link>
        </div>

        {/* ステータス */}
        <div
          className="relative mt-16 flex flex-wrap items-center justify-center gap-8 text-sm"
          style={{ color: "var(--muted)" }}
        >
          {[
            { value: "YouTube", label: "動画教材" },
            { value: "無制限", label: "視聴回数" },
            { value: "進捗管理", label: "学習記録" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                {value}
              </span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* フィーチャーセクション */}
      <section id="features" className="py-24 px-6" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center text-3xl font-bold" style={{ color: "var(--foreground)" }}>
            学習を加速する機能
          </h2>
          <p className="mb-14 text-center text-sm" style={{ color: "var(--muted)" }}>
            シンプルな UI で、学ぶことだけに集中できる
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "▶",
                title: "動画で学ぶ",
                desc: "YouTube の高品質な動画を埋め込み。倍速・巻き戻しも自由自在。",
              },
              {
                icon: "✦",
                title: "進捗を管理",
                desc: "講座・セクション単位で進捗を可視化。モチベーションを維持できる。",
              },
              {
                icon: "⚡",
                title: "自由な学習順",
                desc: "順番に縛られず、気になる動画からスタート。自分だけのルートで学習。",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="glass rounded-2xl p-7 flex flex-col gap-4 transition-transform hover:-translate-y-1"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-lg"
                  style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc" }}
                >
                  {icon}
                </div>
                <h3 className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-8 text-center text-xs" style={{ color: "var(--muted)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        © 2026 学習プラットフォーム
      </footer>
    </main>
  );
}
