import Link from "next/link";
import type { SectionWithVideos } from "@/lib/sections";
import { ProgressBar } from "./ProgressBar";
import { calcProgress } from "@/lib/progress";

export function SectionList({
  sections,
  courseId,
  completedVideoIds,
}: {
  sections: SectionWithVideos[];
  courseId: string;
  completedVideoIds: Set<string>;
}) {
  return (
    <div className="flex flex-col gap-4">
      {sections.map((section) => {
        const total = section.videos.length;
        const completed = section.videos.filter((v) =>
          completedVideoIds.has(v.id)
        ).length;
        const percent = calcProgress(total, completed);

        return (
          <div
            key={section.id}
            className="rounded-xl overflow-hidden"
            style={{
              background: "var(--surface-2)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* セクションヘッダー */}
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  {section.title}
                </h3>
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {completed}/{total}
                </span>
              </div>
              <ProgressBar percent={percent} />
            </div>

            {/* 動画リスト */}
            {section.videos.length > 0 && (
              <ul className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {section.videos.map((video, idx) => {
                  const isDone = completedVideoIds.has(video.id);
                  return (
                    <li key={video.id}>
                      <Link
                        href={`/course/${courseId}/video/${video.id}`}
                        className="flex items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-white/5"
                      >
                        {/* 完了アイコン */}
                        <span
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs"
                          style={{
                            background: isDone
                              ? "linear-gradient(135deg, #6366f1, #a855f7)"
                              : "rgba(255,255,255,0.06)",
                            color: isDone ? "#fff" : "var(--muted)",
                          }}
                        >
                          {isDone ? "✓" : idx + 1}
                        </span>

                        {/* タイトル */}
                        <span
                          className="flex-1 truncate"
                          style={{ color: isDone ? "var(--muted)" : "var(--foreground)" }}
                        >
                          {video.title}
                        </span>

                        {/* 無料バッジ */}
                        {video.is_free && (
                          <span
                            className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
                            style={{
                              background: "rgba(34,197,94,0.15)",
                              color: "#4ade80",
                              border: "1px solid rgba(34,197,94,0.2)",
                            }}
                          >
                            無料
                          </span>
                        )}

                        {/* 再生時間 */}
                        {video.duration && (
                          <span className="shrink-0 text-xs" style={{ color: "var(--muted)" }}>
                            {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
