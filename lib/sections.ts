import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/database";

export type Section = Tables<"sections">;
export type Video = Tables<"videos">;
export type SectionWithVideos = Section & { videos: Video[] };

export async function getSectionsByCourseId(
  courseId: string
): Promise<SectionWithVideos[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sections")
    .select("*, videos(*)")
    .eq("course_id", courseId)
    .order("order_index", { ascending: true })
    .order("order_index", { ascending: true, referencedTable: "videos" });

  if (error) throw new Error(error.message);
  return (data as SectionWithVideos[]) ?? [];
}
