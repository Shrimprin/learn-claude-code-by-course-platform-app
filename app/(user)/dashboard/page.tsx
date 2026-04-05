import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserEnrolledCourses } from "@/lib/dashboard";
import { EnrolledCourseCard } from "@/components/Dashboard/EnrolledCourseCard";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const courses = await getUserEnrolledCourses(user.id);

  const displayName =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "ユーザー";

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      {/* ヘッダー */}
      <div className="mb-10">
        <p className="text-sm" style={{ color: "var(--muted)" }}>おかえりなさい</p>
        <h1 className="mt-1 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
          {displayName}
        </h1>
      </div>

      {/* 統計 */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[
          { label: "受講中の講座", value: courses.length },
          {
            label: "完了した動画",
            value: courses.reduce((s, c) => s + c.completedCount, 0),
          },
          {
            label: "平均進捗率",
            value: courses.length
              ? `${Math.round(courses.reduce((s, c) => s + c.progressPercent, 0) / courses.length)}%`
              : "—",
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl p-5 glass"
          >
            <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              {value}
            </p>
            <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* 受講中講座 */}
      <h2 className="mb-5 text-lg font-semibold" style={{ color: "var(--foreground)" }}>
        受講中の講座
      </h2>

      {courses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <EnrolledCourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl py-24 text-center glass">
          <div
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
            style={{ background: "rgba(99,102,241,0.15)" }}
          >
            📚
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            受講中の講座がありません
          </p>
          <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
            講座一覧から最初の動画を視聴しましょう
          </p>
          <Link
            href="/"
            className="mt-6 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          >
            講座を探す
          </Link>
        </div>
      )}
    </div>
  );
}
