import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold" style={{ color: "var(--foreground)" }}>
        管理ダッシュボード
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/courses"
          className="glass rounded-xl p-6 transition-transform hover:-translate-y-1"
        >
          <div
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-white"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          >
            📚
          </div>
          <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>
            講座管理
          </h2>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            講座の作成・編集・削除
          </p>
        </Link>
      </div>
    </div>
  );
}
