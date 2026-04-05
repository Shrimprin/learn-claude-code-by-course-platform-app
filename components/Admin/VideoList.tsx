"use client";

import { useState, useTransition } from "react";
import type { Video } from "@/lib/videos";
import { deleteVideoAction, reorderVideosAction } from "@/app/actions/admin/videos";
import { extractYouTubeId } from "@/lib/youtube";

export function VideoList({
  videos: initialVideos,
  sectionId,
  courseId,
}: {
  videos: Video[];
  sectionId: string;
  courseId: string;
}) {
  const [videos, setVideos] = useState(initialVideos);
  const [isPending, startTransition] = useTransition();
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (id: string) => setDraggingId(id);

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggingId === targetId) return;
    const from = videos.findIndex((v) => v.id === draggingId);
    const to = videos.findIndex((v) => v.id === targetId);
    if (from === -1 || to === -1) return;
    const next = [...videos];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setVideos(next);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    const orderedIds = videos.map((v, i) => ({ id: v.id, order_index: i }));
    startTransition(() => reorderVideosAction(sectionId, courseId, orderedIds));
  };

  const handleDelete = (id: string) => {
    if (!confirm("この動画を削除しますか？")) return;
    startTransition(() => deleteVideoAction(id, sectionId, courseId));
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <ul className="flex flex-col gap-2">
      {videos.map((video, idx) => {
        const ytId = extractYouTubeId(video.youtube_url);
        return (
          <li
            key={video.id}
            draggable
            onDragStart={() => handleDragStart(video.id)}
            onDragOver={(e) => handleDragOver(e, video.id)}
            onDragEnd={handleDragEnd}
            className="flex items-center gap-3 rounded-xl px-4 py-3 cursor-grab active:cursor-grabbing"
            style={{
              background: draggingId === video.id ? "rgba(99,102,241,0.1)" : "var(--surface-2)",
              border: `1px solid ${draggingId === video.id ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.06)"}`,
              opacity: isPending ? 0.7 : 1,
            }}
          >
            <span className="text-xs select-none" style={{ color: "var(--muted)" }}>⠿</span>
            <span className="text-xs w-5 text-center shrink-0" style={{ color: "var(--muted)" }}>{idx + 1}</span>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>
                {video.title}
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                {ytId && (
                  <a
                    href={`https://youtu.be/${ytId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs hover:underline"
                    style={{ color: "#a5b4fc" }}
                  >
                    YouTube ↗
                  </a>
                )}
                {video.is_free && (
                  <span
                    className="rounded-full px-1.5 py-0.5 text-xs"
                    style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80" }}
                  >
                    無料
                  </span>
                )}
                {video.duration && (
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => handleDelete(video.id)}
              className="shrink-0 rounded-md px-3 py-1 text-xs transition-opacity hover:opacity-80"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#fca5a5",
              }}
            >
              削除
            </button>
          </li>
        );
      })}
    </ul>
  );
}
