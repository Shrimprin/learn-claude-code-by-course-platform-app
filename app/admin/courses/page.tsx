import Link from "next/link";
import Image from "next/image";
import { getAdminCourses } from "@/lib/admin/courses";
import { DeleteCourseButton } from "@/components/Admin/DeleteCourseButton";

export default async function AdminCoursesPage() {
  const courses = await getAdminCourses();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            講座管理
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            {courses.length} 件の講座
          </p>
        </div>
        <Link
          href="/admin/courses/new"
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
          style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
        >
          + 新規作成
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl py-20 text-center glass">
          <p className="text-sm" style={{ color: "var(--muted)" }}>まだ講座がありません</p>
          <Link
            href="/admin/courses/new"
            className="mt-4 rounded-lg px-4 py-2 text-sm font-medium text-white"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          >
            最初の講座を作成
          </Link>
        </div>
      ) : (
        <div
          className="overflow-hidden rounded-xl"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "var(--surface-2)" }}>
                {["講座", "説明", "操作"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.id}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-lg"
                        style={{ background: "var(--surface-2)" }}>
                        {course.thumbnail_url ? (
                          <Image src={course.thumbnail_url} alt={course.title} fill className="object-cover" sizes="64px" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-lg">📚</div>
                        )}
                      </div>
                      <span className="font-medium line-clamp-1" style={{ color: "var(--foreground)" }}>
                        {course.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 max-w-xs">
                    <span className="line-clamp-2 text-xs" style={{ color: "var(--muted)" }}>
                      {course.description ?? "—"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/courses/${course.id}`}
                        className="rounded-md px-3 py-1.5 text-xs transition-opacity hover:opacity-80"
                        style={{
                          background: "rgba(99,102,241,0.12)",
                          border: "1px solid rgba(99,102,241,0.2)",
                          color: "#a5b4fc",
                        }}
                      >
                        編集
                      </Link>
                      <Link
                        href={`/admin/courses/${course.id}/sections`}
                        className="rounded-md px-3 py-1.5 text-xs transition-opacity hover:opacity-80"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "var(--muted)",
                        }}
                      >
                        セクション
                      </Link>
                      <DeleteCourseButton id={course.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
