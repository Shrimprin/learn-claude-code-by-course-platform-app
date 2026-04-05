import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(7, 7, 15, 0.8)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="h-7 w-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          >
            AI
          </div>
          <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--foreground)" }}>
            学習プラットフォーム
          </span>
        </Link>

        {/* ナビ */}
        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm px-3 py-1.5 rounded-md transition-colors hover:text-white"
                style={{ color: "var(--muted)" }}
              >
                ダッシュボード
              </Link>

              {/* アバター */}
              {user.user_metadata?.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.user_metadata.avatar_url}
                  alt="avatar"
                  className="h-8 w-8 rounded-full ring-2 ring-indigo-500/40"
                />
              ) : (
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
                >
                  {user.email?.[0].toUpperCase()}
                </div>
              )}

              <form action={signOut}>
                <button
                  type="submit"
                  className="text-sm px-4 py-1.5 rounded-lg transition-all"
                  style={{
                    color: "var(--muted)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  ログアウト
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm px-4 py-2 rounded-lg font-medium text-white transition-opacity hover:opacity-80"
              style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
            >
              ログイン
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
