"use client";

import { useActionState } from "react";
import type { Course } from "@/lib/courses";

type Props = {
  course?: Course;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
};

export function CourseForm({ course, action, submitLabel }: Props) {
  const [error, formAction, isPending] = useActionState(
    async (_: string | null, formData: FormData) => {
      try {
        await action(formData);
        return null;
      } catch (e) {
        return e instanceof Error ? e.message : "エラーが発生しました";
      }
    },
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-5 max-w-lg">
      {error && (
        <div
          className="rounded-lg px-4 py-3 text-sm"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#fca5a5",
          }}
        >
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          タイトル <span style={{ color: "#f87171" }}>*</span>
        </label>
        <input
          name="title"
          defaultValue={course?.title ?? ""}
          required
          placeholder="講座タイトルを入力"
          className="rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/50"
          style={{
            background: "var(--surface-2)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "var(--foreground)",
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          説明
        </label>
        <textarea
          name="description"
          defaultValue={course?.description ?? ""}
          rows={4}
          placeholder="講座の概要を入力"
          className="rounded-lg px-4 py-2.5 text-sm outline-none resize-none focus:ring-2 focus:ring-indigo-500/50"
          style={{
            background: "var(--surface-2)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "var(--foreground)",
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          サムネイル URL
        </label>
        <input
          name="thumbnail_url"
          type="url"
          defaultValue={course?.thumbnail_url ?? ""}
          placeholder="https://example.com/thumbnail.jpg"
          className="rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/50"
          style={{
            background: "var(--surface-2)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "var(--foreground)",
          }}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
        >
          {isPending ? "保存中…" : submitLabel}
        </button>
        <a
          href="/admin/courses"
          className="rounded-lg px-6 py-2.5 text-sm transition-opacity hover:opacity-80"
          style={{
            color: "var(--muted)",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          キャンセル
        </a>
      </div>
    </form>
  );
}
