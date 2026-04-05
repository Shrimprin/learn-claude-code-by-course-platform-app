import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getVideoById, getVideosByCourseId } from "@/lib/videos";
import { extractYouTubeId } from "@/lib/youtube";
import { getCourseById } from "@/lib/courses";
import { getUserProgressByCourse } from "@/lib/progress";
import { createClient } from "@/lib/supabase/server";
import { VideoPlayer } from "@/components/VideoPlayer";
import { VideoCompleteButton } from "@/components/VideoCompleteButton";

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string; videoId: string }>;
}) {
  const { id: courseId, videoId } = await params;

  const [video, course, allVideos] = await Promise.all([
    getVideoById(videoId),
    getCourseById(courseId),
    getVideosByCourseId(courseId),
  ]);

  if (!video || !course) notFound();

  // 認証チェック: 2本目以降かつ無料でない動画は認証必須
  const videoIndex = allVideos.findIndex((v) => v.id === videoId);
  const requiresAuth = videoIndex > 0 && !video.is_free;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (requiresAuth && !user) redirect("/login");

  // 完了済みチェック
  const completedVideoIds = user
    ? await getUserProgressByCourse(user.id, allVideos.map((v) => v.id))
    : new Set<string>();

  const isCompleted = completedVideoIds.has(videoId);
  const youtubeId = extractYouTubeId(video.youtube_url);

  // 前後の動画
  const prevVideo = videoIndex > 0 ? allVideos[videoIndex - 1] : null;
  const nextVideo = videoIndex < allVideos.length - 1 ? allVideos[videoIndex + 1] : null;

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      {/* メインエリア */}
      <div className="flex-1 px-6 py-8 lg:px-10">
        {/* パンくず */}
        <div className="mb-5 flex items-center gap-2 text-xs" style={{ color: "var(--muted)" }}>
          <Link href={`/course/${courseId}`} className="hover:text-white transition-colors">
            {course.title}
          </Link>
          <span>/</span>
          <span style={{ color: "var(--foreground)" }}>{video.title}</span>
        </div>

        {/* 動画プレイヤー */}
        {youtubeId ? (
          <VideoPlayer youtubeId={youtubeId} />
        ) : (
          <div
            className="flex aspect-video items-center justify-center rounded-2xl text-sm"
            style={{ background: "var(--surface-2)", color: "var(--muted)" }}
          >
            動画を読み込めません
          </div>
        )}

        {/* タイトルとアクション */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
              {video.title}
            </h1>
            {video.duration && (
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                {Math.floor(video.duration / 60)} 分 {video.duration % 60} 秒
              </p>
            )}
          </div>
          <VideoCompleteButton
            videoId={videoId}
            courseId={courseId}
            isCompleted={isCompleted}
            isLoggedIn={!!user}
          />
        </div>

        {/* 前後ナビ */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {prevVideo ? (
            <Link
              href={`/course/${courseId}/video/${prevVideo.id}`}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-colors hover:text-white"
              style={{
                color: "var(--muted)",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              前の動画
            </Link>
          ) : <div />}
          {nextVideo && (
            <Link
              href={`/course/${courseId}/video/${nextVideo.id}`}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
              style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
            >
              次の動画
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* サイドバー（動画一覧） */}
      <aside
        className="w-full shrink-0 overflow-y-auto border-t py-6 lg:w-72 lg:border-l lg:border-t-0"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "var(--surface)" }}
      >
        <div className="px-4 mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            コンテンツ
          </p>
        </div>
        <ul>
          {allVideos.map((v, idx) => {
            const isCurrent = v.id === videoId;
            const done = completedVideoIds.has(v.id);
            return (
              <li key={v.id}>
                <Link
                  href={`/course/${courseId}/video/${v.id}`}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs transition-colors"
                  style={{
                    background: isCurrent ? "rgba(99,102,241,0.12)" : "transparent",
                    borderLeft: isCurrent ? "2px solid #6366f1" : "2px solid transparent",
                    color: isCurrent ? "var(--foreground)" : "var(--muted)",
                  }}
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs"
                    style={{
                      background: done ? "linear-gradient(135deg, #6366f1, #a855f7)" : "rgba(255,255,255,0.06)",
                      color: done ? "#fff" : "var(--muted)",
                    }}
                  >
                    {done ? "✓" : idx + 1}
                  </span>
                  <span className="truncate">{v.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
