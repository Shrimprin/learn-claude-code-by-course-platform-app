import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/courses";
import { getAdminVideos } from "@/lib/admin/videos";
import { createClient } from "@/lib/supabase/server";
import { VideoList } from "@/components/Admin/VideoList";
import { createVideoAction } from "@/app/actions/admin/videos";

export default async function AdminVideosPage({
  params,
}: {
  params: Promise<{ id: string; sectionId: string }>;
}) {
  const { id: courseId, sectionId } = await params;

  const supabase = await createClient();
  const [course, sectionRes, videos] = await Promise.all([
    getCourseById(courseId),
    supabase.from("sections").select("*").eq("id", sectionId).single(),
    getAdminVideos(sectionId),
  ]);

  if (!course || sectionRes.error) notFound();
  const section = sectionRes.data;

  const action = async (formData: FormData) => {
    "use server";
    await createVideoAction(sectionId, courseId, formData);
  };

  return (
    <div>
      {/* パンくず */}
      <div className="mb-2 flex items-center gap-2 text-xs" style={{ color: "var(--muted)" }}>
        <Link href="/admin/courses" className="hover:text-white transition-colors">講座管理</Link>
        <span>/</span>
        <Link href={`/admin/courses/${courseId}/sections`} className="hover:text-white transition-colors">
          {course.title}
        </Link>
        <span>/</span>
        <span style={{ color: "var(--foreground)" }}>{section.title}</span>
      </div>

      <h1 className="mb-8 text-2xl font-bold" style={{ color: "var(--foreground)" }}>
        動画管理
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* 動画一覧 */}
        <div>
          <h2 className="mb-4 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            動画一覧
            <span className="ml-2 text-xs font-normal" style={{ color: "var(--muted)" }}>
              ドラッグで並び替え可能
            </span>
          </h2>
          {videos.length > 0 ? (
            <VideoList videos={videos} sectionId={sectionId} courseId={courseId} />
          ) : (
            <div className="rounded-xl py-10 text-center glass">
              <p className="text-sm" style={{ color: "var(--muted)" }}>まだ動画がありません</p>
            </div>
          )}
        </div>

        {/* 新規追加フォーム */}
        <div>
          <h2 className="mb-4 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            動画を追加
          </h2>
          <form action={action} className="flex flex-col gap-4 rounded-xl p-5 glass">
            {/* タイトル */}
            <div className="flex flex-col gap-2">
              <label className="text-sm" style={{ color: "var(--muted)" }}>
                タイトル <span style={{ color: "#f87171" }}>*</span>
              </label>
              <input
                name="title"
                required
                placeholder="動画タイトルを入力"
                className="rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/50"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--foreground)",
                }}
              />
            </div>

            {/* YouTube URL */}
            <div className="flex flex-col gap-2">
              <label className="text-sm" style={{ color: "var(--muted)" }}>
                YouTube URL <span style={{ color: "#f87171" }}>*</span>
              </label>
              <input
                name="youtube_url"
                required
                placeholder="https://youtube.com/watch?v=..."
                className="rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/50"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--foreground)",
                }}
              />
            </div>

            {/* 再生時間 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm" style={{ color: "var(--muted)" }}>再生時間（秒）</label>
              <input
                name="duration"
                type="number"
                min={0}
                placeholder="例: 600"
                className="rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/50"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--foreground)",
                }}
              />
            </div>

            {/* 無料フラグ */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input name="is_free" type="checkbox" className="h-4 w-4 accent-indigo-500" />
              <span className="text-sm" style={{ color: "var(--muted)" }}>無料動画として公開</span>
            </label>

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
