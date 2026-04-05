import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/database";

export type UserProgress = Tables<"user_progress">;

export async function getUserProgressByCourse(
  userId: string,
  videoIds: string[]
): Promise<Set<string>> {
  if (videoIds.length === 0) return new Set();

  const supabase = await createClient();
  const { data } = await supabase
    .from("user_progress")
    .select("video_id")
    .eq("user_id", userId)
    .eq("completed", true)
    .in("video_id", videoIds);

  return new Set((data ?? []).map((p) => p.video_id!));
}

export function calcProgress(total: number, completed: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}
