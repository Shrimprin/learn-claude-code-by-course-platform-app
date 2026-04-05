"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { Section } from "@/lib/sections";
import { deleteSectionAction, reorderSectionsAction } from "@/app/actions/admin/sections";

export function SectionList({
  sections: initialSections,
  courseId,
}: {
  sections: Section[];
  courseId: string;
}) {
  const [sections, setSections] = useState(initialSections);
  const [isPending, startTransition] = useTransition();
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (id: string) => setDraggingId(id);

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggingId === targetId) return;
    const from = sections.findIndex((s) => s.id === draggingId);
    const to = sections.findIndex((s) => s.id === targetId);
    if (from === -1 || to === -1) return;
    const next = [...sections];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setSections(next);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    const orderedIds = sections.map((s, i) => ({ id: s.id, order_index: i }));
    startTransition(() => reorderSectionsAction(courseId, orderedIds));
  };

  const handleDelete = (id: string) => {
    if (!confirm("このセクションを削除しますか？動画もすべて削除されます。")) return;
    startTransition(() => deleteSectionAction(id, courseId));
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <ul className="flex flex-col gap-2">
      {sections.map((section) => (
        <li
          key={section.id}
          draggable
          onDragStart={() => handleDragStart(section.id)}
          onDragOver={(e) => handleDragOver(e, section.id)}
          onDragEnd={handleDragEnd}
          className="flex items-center gap-3 rounded-xl px-4 py-3 cursor-grab active:cursor-grabbing"
          style={{
            background: draggingId === section.id ? "rgba(99,102,241,0.1)" : "var(--surface-2)",
            border: `1px solid ${draggingId === section.id ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.06)"}`,
            opacity: isPending ? 0.7 : 1,
          }}
        >
          {/* ドラッグハンドル */}
          <span className="text-xs select-none" style={{ color: "var(--muted)" }}>⠿</span>

          <span className="flex-1 text-sm font-medium" style={{ color: "var(--foreground)" }}>
            {section.title}
          </span>

          <div className="flex items-center gap-2">
            <Link
              href={`/admin/courses/${courseId}/sections/${section.id}/videos`}
              className="rounded-md px-3 py-1 text-xs transition-opacity hover:opacity-80"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--muted)",
              }}
            >
              動画管理
            </Link>
            <Link
              href={`/admin/courses/${courseId}/sections/${section.id}/edit`}
              className="rounded-md px-3 py-1 text-xs transition-opacity hover:opacity-80"
              style={{
                background: "rgba(99,102,241,0.12)",
                border: "1px solid rgba(99,102,241,0.2)",
                color: "#a5b4fc",
              }}
            >
              編集
            </Link>
            <button
              onClick={() => handleDelete(section.id)}
              className="rounded-md px-3 py-1 text-xs transition-opacity hover:opacity-80"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#fca5a5",
              }}
            >
              削除
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
