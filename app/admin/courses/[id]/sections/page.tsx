import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/courses";
import { getAdminSections } from "@/lib/admin/sections";
import { SectionList } from "@/components/Admin/SectionList";
import { createSectionAction } from "@/app/actions/admin/sections";

export default async function AdminSectionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = await params;
  const [course, sections] = await Promise.all([
    getCourseById(courseId),
    getAdminSections(courseId),
  ]);

  if (!course) notFound();

  const action = async (formData: FormData) => {
    "use server";
    await createSectionAction(courseId, formData);
  };

  return (
    <div>
      {/* パンくず */}
      <div className="mb-2 flex items-center gap-2 text-xs" style={{ color: "var(--muted)" }}>
        <Link href="/admin/courses" className="hover:text-white transition-colors">講座管理</Link>
        <span>/</span>
        <span style={{ color: "var(--foreground)" }}>{course.title}</span>
      </div>

      <h1 className="mb-8 text-2xl font-bold" style={{ color: "var(--foreground)" }}>
        セクション管理
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* セクション一覧 */}
        <div>
          <h2 className="mb-4 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            セクション一覧
            <span className="ml-2 text-xs font-normal" style={{ color: "var(--muted)" }}>
              ドラッグで並び替え可能
            </span>
          </h2>
          {sections.length > 0 ? (
            <SectionList sections={sections} courseId={courseId} />
          ) : (
            <div
              className="rounded-xl py-10 text-center glass"
            >
              <p className="text-sm" style={{ color: "var(--muted)" }}>まだセクションがありません</p>
            </div>
          )}
        </div>

        {/* 新規追加フォーム */}
        <div>
          <h2 className="mb-4 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            セクションを追加
          </h2>
          <form
            action={action}
            className="flex flex-col gap-4 rounded-xl p-5 glass"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm" style={{ color: "var(--muted)" }}>タイトル</label>
              <input
                name="title"
                required
                placeholder="セクションタイトルを入力"
                className="rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/50"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--foreground)",
                }}
              />
            </div>
            <button
              type="submit"
              className="rounded-lg py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
            >
              追加する
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
