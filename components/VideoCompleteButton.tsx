"use client";

import { useTransition } from "react";
import { markVideoComplete } from "@/app/actions/progress";

export function VideoCompleteButton({
  videoId,
  courseId,
  isCompleted,
  isLoggedIn,
}: {
  videoId: string;
  courseId: string;
  isCompleted: boolean;
  isLoggedIn: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    startTransition(() => markVideoComplete(videoId, courseId));
  };

  if (isCompleted) {
    return (
      <div
        className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium"
        style={{
          background: "rgba(34,197,94,0.1)",
          border: "1px solid rgba(34,197,94,0.2)",
          color: "#4ade80",
        }}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        完了済み
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
      style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
    >
      {isPending ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          保存中…
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          完了にする
        </>
      )}
    </button>
  );
}
