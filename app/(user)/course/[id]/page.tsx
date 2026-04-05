import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourseById } from "@/lib/courses";
import { getSectionsByCourseId } from "@/lib/sections";
import { getUserProgressByCourse, calcProgress } from "@/lib/progress";
import { createClient } from "@/lib/supabase/server";
import { ProgressBar } from "@/components/CourseDetail/ProgressBar";
import { SectionList } from "@/components/CourseDetail/SectionList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseById(id);
  if (!course) return {};
  return {
    title: `${course.title} | 学習プラットフォーム`,
    description: course.description ?? undefined,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [course, sections] = await Promise.all([
    getCourseById(id),
    getSectionsByCourseId(id),
  ]);

  if (!course) notFound();

  // ログインユーザーの進捗を取得
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const allVideoIds = sections.flatMap((s) => s.videos.map((v) => v.id));
  const completedVideoIds = user
    ? await getUserProgressByCourse(user.id, allVideoIds)
    : new Set<string>();

  const totalVideos = allVideoIds.length;
  const completedCount = completedVideoIds.size;
  const overallPercent = calcProgress(totalVideos, completedCount);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      {/* 講座ヘッダー */}
      <div className="mb-10 flex flex-col gap-8 md:flex-row md:items-start">
        {/* サムネイル */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl md:w-72 shrink-0"
          style={{ background: "var(--surface-2)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {course.thumbnail_url ? (
            <Image
              src={course.thumbnail_url}
              alt={course.title}
              fill
              className="object-cover"
              sizes="288px"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center text-5xl"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))" }}
            >
              📚
            </div>
          )}
        </div>

        {/* テキスト情報 */}
        <div className="flex flex-1 flex-col gap-4">
          <h1 className="text-2xl font-bold leading-snug" style={{ color: "var(--foreground)" }}>
            {course.title}
          </h1>
          {course.description && (
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {course.description}
            </p>
          )}

          {/* 全体進捗 */}
          <div
            className="mt-2 rounded-xl p-4"
            style={{ background: "var(--surface-2)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="mb-3 flex items-center justify-between text-sm">
              <span style={{ color: "var(--foreground)" }}>全体の進捗</span>
              <span style={{ color: "var(--muted)" }}>
                {completedCount} / {totalVideos} 動画完了
              </span>
            </div>
            <ProgressBar percent={overallPercent} />
          </div>
        </div>
      </div>

      {/* セクション一覧 */}
      {sections.length > 0 ? (
        <>
          <h2 className="mb-5 text-lg font-semibold" style={{ color: "var(--foreground)" }}>
            カリキュラム
          </h2>
          <SectionList
            sections={sections}
            courseId={id}
            completedVideoIds={completedVideoIds}
          />
        </>
      ) : (
        <div
          className="flex flex-col items-center justify-center rounded-2xl py-20 text-center glass"
        >
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            まだ動画が登録されていません
          </p>
        </div>
      )}
    </div>
  );
}
