import Link from "next/link";

const navItems = [
  { href: "/admin", label: "ダッシュボード" },
  { href: "/admin/courses", label: "講座管理" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1">
      {/* サイドバー */}
      <aside
        className="w-56 shrink-0 border-r px-4 py-8"
        style={{
          background: "var(--surface)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <p
          className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--muted)" }}
        >
          管理メニュー
        </p>
        <nav className="flex flex-col gap-1">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 text-sm transition-colors hover:text-white"
              style={{ color: "var(--muted)" }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
