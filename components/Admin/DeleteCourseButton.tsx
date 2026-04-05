"use client";

import { useTransition } from "react";
import { deleteCourseAction } from "@/app/actions/admin/courses";

export function DeleteCourseButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!confirm("この講座を削除しますか？関連するセクション・動画もすべて削除されます。")) return;
    startTransition(() => deleteCourseAction(id));
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-md px-3 py-1.5 text-xs transition-opacity hover:opacity-80 disabled:opacity-50"
      style={{
        background: "rgba(239,68,68,0.1)",
        border: "1px solid rgba(239,68,68,0.2)",
        color: "#fca5a5",
      }}
    >
      {isPending ? "削除中…" : "削除"}
    </button>
  );
}
