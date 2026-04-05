import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/lib/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/course/${course.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-1"
      style={{
        background: "var(--surface-2)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* サムネイル */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
        {course.thumbnail_url ? (
          <Image
            src={course.thumbnail_url}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-4xl"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))" }}
          >
            📚
          </div>
        )}
        {/* ホバー時のオーバーレイ */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
          style={{ background: "rgba(0,0,0,0.4)" }}>
          <span
            className="rounded-full px-4 py-1.5 text-xs font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          >
            講座を見る
          </span>
        </div>
      </div>

      {/* テキスト */}
      <div className="flex flex-col gap-2 p-5">
        <h2
          className="text-sm font-semibold leading-snug line-clamp-2"
          style={{ color: "var(--foreground)" }}
        >
          {course.title}
        </h2>
        {course.description && (
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: "var(--muted)" }}
          >
            {course.description}
          </p>
        )}
      </div>
    </Link>
  );
}
