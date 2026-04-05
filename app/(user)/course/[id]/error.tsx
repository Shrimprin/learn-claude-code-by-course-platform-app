"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-32 text-center">
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        エラーが発生しました: {error.message}
      </p>
      <button
        onClick={reset}
        className="rounded-lg px-4 py-2 text-sm text-white"
        style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
      >
        再試行
      </button>
    </div>
  );
}
