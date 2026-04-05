import Link from "next/link";
import Image from "next/image";
import type { EnrolledCourse } from "@/lib/dashboard";
import { ProgressBar } from "@/components/CourseDetail/ProgressBar";

export function EnrolledCourseCard({ course }: { course: EnrolledCourse }) {
  const href = course.lastVideoId
    ? `/course/${course.id}/video/${course.lastVideoId}`
    : `/course/${course.id}`;

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl"
      style={{
        background: "var(--surface-2)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* サムネイル */}
      <div className="relative aspect-video w-full overflow-hidden" style={{ background: "var(--surface)" }}>
        {course.thumbnail_url ? (
          <Image
            src={course.thumbnail_url}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-3xl"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))" }}
          >
            📚
          </div>
        )}
      </div>

      {/* コンテンツ */}
      <div className="flex flex-col gap-4 p-5">
        <div>
          <h2 className="text-sm font-semibold line-clamp-2" style={{ color: "var(--foreground)" }}>
            {course.title}
          </h2>
          <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
            {course.completedCount} / {course.totalVideos} 動画完了
          </p>
        </div>
        <ProgressBar percent={course.progressPercent} />
        <Link
          href={href}
          className="mt-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-80"
          style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
        >
          続きを見る
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
